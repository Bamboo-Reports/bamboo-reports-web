import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User, Session, AuthError } from '@supabase/supabase-js';
import { setRememberSession, supabase } from '@/lib/supabase';
import { logEvent } from '@/lib/eventLogger';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  role: string | null;
  roleLoading: boolean;
  signUp: (
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    phoneNumber?: string,
    companyName?: string,
  ) => Promise<{ error: AuthError | null }>;
  signIn: (email: string, password: string, rememberMe?: boolean) => Promise<{ error: AuthError | null }>;
  signOut: () => Promise<void>;
  updateProfile: (
    firstName: string,
    lastName: string,
    phoneNumber: string,
    companyName: string,
  ) => Promise<{ error: Error | null }>;
  updateEmail: (newEmail: string) => Promise<{ error: AuthError | null }>;
  updatePassword: (newPassword: string) => Promise<{ error: AuthError | null }>;
  uploadAvatar: (file: File) => Promise<{ error: Error | null; url: string | null }>;
  deleteAvatar: () => Promise<{ error: Error | null }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState<string | null>(null);
  const [roleLoading, setRoleLoading] = useState(false);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (!user) {
      setRole(null);
      return;
    }
    let cancelled = false;
    setRoleLoading(true);
    supabase
      .from('user_profiles')
      .select('role')
      .eq('id', user.id)
      .maybeSingle()
      .then(({ data }) => {
        if (!cancelled) setRole((data?.role as string | undefined) ?? 'user');
      })
      .then(() => {
        if (!cancelled) setRoleLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [user]);

  const signUp = async (
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    phoneNumber?: string,
    companyName?: string,
  ) => {
    const fullName = `${firstName} ${lastName}`.trim();
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          first_name: firstName,
          last_name: lastName,
          full_name: fullName,
          phone_number: phoneNumber || null,
          company_name: companyName || null,
        },
      },
    });
    if (!error) {
      void logEvent({
        type: 'signup',
        email,
        metadata: {
          first_name: firstName,
          last_name: lastName,
          phone_number: phoneNumber ?? null,
          company_name: companyName ?? null,
        },
      });
    }
    return { error };
  };

  const signIn = async (email: string, password: string, rememberMe = true) => {
    setRememberSession(rememberMe);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (!error) {
      void logEvent({ type: 'signin', email });
    }
    return { error };
  };

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  const updateProfile = async (
    firstName: string,
    lastName: string,
    phoneNumber: string,
    companyName: string,
  ) => {
    const fullName = `${firstName} ${lastName}`.trim();
    const { error } = await supabase.auth.updateUser({
      data: {
        first_name: firstName,
        last_name: lastName,
        full_name: fullName,
        phone_number: phoneNumber,
        company_name: companyName,
      },
    });

    if (error) {
      return { error };
    }

    if (!user) {
      return { error: new Error('No user logged in') };
    }

    const { error: profileError } = await supabase
      .from('user_profiles')
      .upsert({
        id: user.id,
        first_name: firstName,
        last_name: lastName,
        full_name: fullName,
        phone: phoneNumber,
        company_name: companyName,
      }, { onConflict: 'id' });

    return { error: profileError };
  };

  const updateEmail = async (newEmail: string) => {
    const { error } = await supabase.auth.updateUser({
      email: newEmail,
    });
    return { error };
  };

  const updatePassword = async (newPassword: string) => {
    const { error } = await supabase.auth.updateUser({
      password: newPassword,
    });
    return { error };
  };

  const uploadAvatar = async (file: File) => {
    try {
      if (!user) {
        return { error: new Error('No user logged in'), url: null };
      }

      // Validate file size (500KB = 512000 bytes)
      if (file.size > 512000) {
        return { error: new Error('File size must be less than 500KB'), url: null };
      }

      // Validate file type
      if (!file.type.startsWith('image/')) {
        return { error: new Error('File must be an image'), url: null };
      }

      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}-${Math.random()}.${fileExt}`;
      const filePath = `avatars/${fileName}`;

      // Upload to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from('profile-images')
        .upload(filePath, file, { upsert: true });

      if (uploadError) {
        return { error: uploadError, url: null };
      }

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('profile-images')
        .getPublicUrl(filePath);

      // Update user metadata with avatar URL
      const { error: updateError } = await supabase.auth.updateUser({
        data: { avatar_url: publicUrl },
      });

      if (updateError) {
        return { error: updateError, url: null };
      }

      return { error: null, url: publicUrl };
    } catch (error) {
      return { error: error as Error, url: null };
    }
  };

  const deleteAvatar = async () => {
    try {
      if (!user?.user_metadata?.avatar_url) {
        return { error: null };
      }

      // Extract file path from URL
      const url = user.user_metadata.avatar_url as string;
      const filePath = url.split('/profile-images/')[1];

      if (filePath) {
        // Delete from storage
        const { error: deleteError } = await supabase.storage
          .from('profile-images')
          .remove([`avatars/${filePath.split('/').pop()}`]);

        if (deleteError) {
          return { error: deleteError };
        }
      }

      // Remove avatar URL from user metadata
      const { error: updateError } = await supabase.auth.updateUser({
        data: { avatar_url: null },
      });

      if (updateError) {
        return { error: updateError };
      }

      return { error: null };
    } catch (error) {
      return { error: error as Error };
    }
  };

  const value = {
    user,
    session,
    loading,
    role,
    roleLoading,
    signUp,
    signIn,
    signOut,
    updateProfile,
    updateEmail,
    updatePassword,
    uploadAvatar,
    deleteAvatar,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
