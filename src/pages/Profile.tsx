import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useToast } from '@/hooks/use-toast';
import { LogOut, Mail, User, Calendar, Camera, Loader2, Trash2, Lock } from 'lucide-react';
import { format } from 'date-fns';
import { getDisplayName, isStrongPassword, profileDetailsSchema } from '@/lib/auth';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ImageCropDialog from '@/components/ImageCropDialog';

const Profile = () => {
  const { user, signOut, updateProfile, updateEmail, updatePassword, uploadAvatar, deleteAvatar } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [isUpdatingName, setIsUpdatingName] = useState(false);
  const [isUpdatingEmail, setIsUpdatingEmail] = useState(false);
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);

  const [newFirstName, setNewFirstName] = useState('');
  const [newLastName, setNewLastName] = useState('');
  const [newCompanyName, setNewCompanyName] = useState('');
  const [newPhoneNumber, setNewPhoneNumber] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [editingName, setEditingName] = useState(false);
  const [editingEmail, setEditingEmail] = useState(false);
  const [editingPassword, setEditingPassword] = useState(false);

  const [cropDialogOpen, setCropDialogOpen] = useState(false);
  const [selectedImageSrc, setSelectedImageSrc] = useState<string>('');

  const handleSignOut = async () => {
    await signOut();
    toast({
      title: 'Signed out',
      description: 'You have been signed out successfully',
    });
    navigate('/');
  };

  const handleUpdateName = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsedProfile = profileDetailsSchema.safeParse({
      firstName: newFirstName,
      lastName: newLastName,
      companyName: newCompanyName,
      phoneNumber: newPhoneNumber,
    });

    if (!parsedProfile.success) {
      const issue = parsedProfile.error.issues[0];
      toast({
        title: 'Check your details',
        description: issue.message,
        variant: 'destructive',
      });
      return;
    }

    const profileValues = parsedProfile.data;
    setIsUpdatingName(true);
    const { error } = await updateProfile(
      profileValues.firstName,
      profileValues.lastName,
      profileValues.phoneNumber,
      profileValues.companyName,
    );

    if (error) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    } else {
      toast({
        title: 'Success',
        description: 'Profile updated successfully',
      });
      setEditingName(false);
      setNewFirstName('');
      setNewLastName('');
      setNewCompanyName('');
      setNewPhoneNumber('');
    }
    setIsUpdatingName(false);
  };

  const handleUpdateEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEmail.trim()) {
      toast({
        title: 'Error',
        description: 'Email cannot be empty',
        variant: 'destructive',
      });
      return;
    }

    setIsUpdatingEmail(true);
    const { error } = await updateEmail(newEmail);

    if (error) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    } else {
      toast({
        title: 'Success',
        description: 'Email updated successfully. Please check your inbox to confirm.',
      });
      setEditingEmail(false);
      setNewEmail('');
    }
    setIsUpdatingEmail(false);
  };

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isStrongPassword(newPassword)) {
      toast({
        title: 'Error',
        description: 'Password must be at least 8 characters and include uppercase, lowercase, number, and special character.',
        variant: 'destructive',
      });
      return;
    }

    if (newPassword !== confirmPassword) {
      toast({
        title: 'Error',
        description: 'Passwords do not match',
        variant: 'destructive',
      });
      return;
    }

    setIsUpdatingPassword(true);
    const { error } = await updatePassword(newPassword);

    if (error) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    } else {
      toast({
        title: 'Success',
        description: 'Password updated successfully',
      });
      setEditingPassword(false);
      setNewPassword('');
      setConfirmPassword('');
    }
    setIsUpdatingPassword(false);
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast({
        title: 'Error',
        description: 'Please select an image file',
        variant: 'destructive',
      });
      return;
    }

    const imageUrl = URL.createObjectURL(file);
    setSelectedImageSrc(imageUrl);
    setCropDialogOpen(true);

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleCroppedImage = async (croppedFile: File) => {
    setIsUploadingAvatar(true);
    const { error } = await uploadAvatar(croppedFile);

    if (error) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    } else {
      toast({
        title: 'Success',
        description: 'Profile picture updated successfully',
      });
    }
    setIsUploadingAvatar(false);
  };

  const handleCloseCropDialog = () => {
    setCropDialogOpen(false);
    if (selectedImageSrc) {
      URL.revokeObjectURL(selectedImageSrc);
      setSelectedImageSrc('');
    }
  };

  const handleDeleteAvatar = async () => {
    setIsUploadingAvatar(true);
    const { error } = await deleteAvatar();

    if (error) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    } else {
      toast({
        title: 'Success',
        description: 'Profile picture removed successfully',
      });
    }
    setIsUploadingAvatar(false);
  };

  if (!user) {
    return null;
  }

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const firstName = typeof user.user_metadata?.first_name === 'string' ? user.user_metadata.first_name : '';
  const lastName = typeof user.user_metadata?.last_name === 'string' ? user.user_metadata.last_name : '';
  const companyName = typeof user.user_metadata?.company_name === 'string' ? user.user_metadata.company_name : '';
  const phoneNumber = typeof user.user_metadata?.phone_number === 'string' ? user.user_metadata.phone_number : '';
  const fullName = getDisplayName(user.user_metadata);
  const avatarUrl = user.user_metadata?.avatar_url;
  const createdAt = user.created_at ? new Date(user.created_at) : new Date();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="flex-1 py-12 md:py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="mb-8 md:mb-10">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">Account</h1>
            <p className="text-muted-foreground">Manage your profile and account settings.</p>
          </div>

          <div className="grid gap-6 lg:grid-cols-[320px,1fr]">
            {/* Left column: avatar + member info */}
            <aside className="rounded-lg border bg-card p-6 h-fit">
              <div className="flex flex-col items-center text-center">
                <div className="relative mb-4">
                  <Avatar className="h-24 w-24">
                    {avatarUrl && <AvatarImage src={avatarUrl} alt={fullName} />}
                    <AvatarFallback className="bg-primary text-primary-foreground text-2xl">
                      {getInitials(fullName)}
                    </AvatarFallback>
                  </Avatar>
                  {isUploadingAvatar && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-full">
                      <Loader2 className="h-6 w-6 animate-spin text-white" />
                    </div>
                  )}
                </div>

                <h2 className="text-lg font-semibold leading-tight">{fullName}</h2>
                <p className="text-sm text-muted-foreground break-all mt-1">{user.email}</p>

                <div className="flex items-center gap-2 text-xs text-muted-foreground mt-3">
                  <Calendar className="h-3.5 w-3.5" />
                  <span>Member since {format(createdAt, 'MMM dd, yyyy')}</span>
                </div>
              </div>

              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageSelect}
                accept="image/*"
                className="hidden"
              />

              <div className="flex flex-col gap-2 mt-6">
                <Button
                  variant="outline"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isUploadingAvatar}
                  size="sm"
                  className="w-full rounded-full"
                >
                  <Camera className="mr-2 h-4 w-4" />
                  Upload photo
                </Button>
                {avatarUrl && (
                  <Button
                    variant="ghost"
                    onClick={handleDeleteAvatar}
                    disabled={isUploadingAvatar}
                    size="sm"
                    className="w-full rounded-full text-muted-foreground hover:text-destructive"
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Remove photo
                  </Button>
                )}
              </div>
            </aside>

            {/* Right column: editable fields */}
            <section className="space-y-4">
              {/* Profile details */}
              <div className="rounded-lg border bg-card p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-primary" />
                    <h3 className="text-sm font-semibold">Profile details</h3>
                  </div>
                  {!editingName && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setEditingName(true);
                        setNewFirstName(firstName || fullName.split(' ')[0] || '');
                        setNewLastName(lastName || fullName.split(' ').slice(1).join(' ') || '');
                        setNewCompanyName(companyName);
                        setNewPhoneNumber(phoneNumber);
                      }}
                    >
                      Edit
                    </Button>
                  )}
                </div>
                {editingName ? (
                  <form onSubmit={handleUpdateName} className="space-y-3">
                    <div className="grid gap-3 sm:grid-cols-2">
                      <div className="space-y-1.5">
                        <Label htmlFor="first-name" className="text-xs text-muted-foreground">
                          First name
                        </Label>
                        <Input
                          id="first-name"
                          value={newFirstName}
                          onChange={(e) => setNewFirstName(e.target.value)}
                          placeholder="First name"
                          disabled={isUpdatingName}
                          autoComplete="given-name"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="last-name" className="text-xs text-muted-foreground">
                          Last name
                        </Label>
                        <Input
                          id="last-name"
                          value={newLastName}
                          onChange={(e) => setNewLastName(e.target.value)}
                          placeholder="Last name"
                          disabled={isUpdatingName}
                          autoComplete="family-name"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="company-name" className="text-xs text-muted-foreground">
                          Company name
                        </Label>
                        <Input
                          id="company-name"
                          value={newCompanyName}
                          onChange={(e) => setNewCompanyName(e.target.value)}
                          placeholder="Company name"
                          disabled={isUpdatingName}
                          autoComplete="organization"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="phone-number" className="text-xs text-muted-foreground">
                          Phone number
                        </Label>
                        <Input
                          id="phone-number"
                          type="tel"
                          value={newPhoneNumber}
                          onChange={(e) => setNewPhoneNumber(e.target.value)}
                          placeholder="Phone number"
                          disabled={isUpdatingName}
                          autoComplete="tel"
                        />
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button type="submit" disabled={isUpdatingName} size="sm">
                        {isUpdatingName ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Saving
                          </>
                        ) : (
                          'Save'
                        )}
                      </Button>
                      <Button
                        type="button"
                        variant="ghost"
                        onClick={() => {
                          setEditingName(false);
                          setNewFirstName('');
                          setNewLastName('');
                          setNewCompanyName('');
                          setNewPhoneNumber('');
                        }}
                        disabled={isUpdatingName}
                        size="sm"
                      >
                        Cancel
                      </Button>
                    </div>
                  </form>
                ) : (
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div>
                      <p className="text-xs text-muted-foreground">First name</p>
                      <p className="text-sm">{firstName || fullName.split(' ')[0] || 'Not provided'}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Last name</p>
                      <p className="text-sm">{lastName || fullName.split(' ').slice(1).join(' ') || 'Not provided'}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Company</p>
                      <p className="text-sm">{companyName || 'Not provided'}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Phone</p>
                      <p className="text-sm">{phoneNumber || 'Not provided'}</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Email */}
              <div className="rounded-lg border bg-card p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-primary" />
                    <h3 className="text-sm font-semibold">Email</h3>
                  </div>
                  {!editingEmail && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setEditingEmail(true);
                        setNewEmail(user.email || '');
                      }}
                    >
                      Update
                    </Button>
                  )}
                </div>
                {editingEmail ? (
                  <form onSubmit={handleUpdateEmail} className="space-y-3">
                    <div className="space-y-1.5">
                      <Label htmlFor="email" className="text-xs text-muted-foreground">
                        New email
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={newEmail}
                        onChange={(e) => setNewEmail(e.target.value)}
                        placeholder={user.email || ''}
                        disabled={isUpdatingEmail}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">We'll send a confirmation to this address.</p>
                    <div className="flex gap-2">
                      <Button type="submit" disabled={isUpdatingEmail} size="sm">
                        {isUpdatingEmail ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Updating
                          </>
                        ) : (
                          'Update email'
                        )}
                      </Button>
                      <Button
                        type="button"
                        variant="ghost"
                        onClick={() => {
                          setEditingEmail(false);
                          setNewEmail('');
                        }}
                        disabled={isUpdatingEmail}
                        size="sm"
                      >
                        Cancel
                      </Button>
                    </div>
                  </form>
                ) : (
                  <p className="text-sm text-muted-foreground break-all">{user.email}</p>
                )}
              </div>

              {/* Password */}
              <div className="rounded-lg border bg-card p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Lock className="h-4 w-4 text-primary" />
                    <h3 className="text-sm font-semibold">Password</h3>
                  </div>
                  {!editingPassword && (
                    <Button variant="ghost" size="sm" onClick={() => setEditingPassword(true)}>
                      Change
                    </Button>
                  )}
                </div>
                {editingPassword ? (
                  <form onSubmit={handleUpdatePassword} className="space-y-3">
                    <div className="space-y-1.5">
                      <Label htmlFor="new-password" className="text-xs text-muted-foreground">
                        New password
                      </Label>
                      <Input
                        id="new-password"
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="New password"
                        disabled={isUpdatingPassword}
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="confirm-password" className="text-xs text-muted-foreground">
                        Confirm new password
                      </Label>
                      <Input
                        id="confirm-password"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Confirm new password"
                        disabled={isUpdatingPassword}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Use at least 8 characters with uppercase, lowercase, number, and special character.
                    </p>
                    <div className="flex gap-2">
                      <Button type="submit" disabled={isUpdatingPassword} size="sm">
                        {isUpdatingPassword ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Updating
                          </>
                        ) : (
                          'Update password'
                        )}
                      </Button>
                      <Button
                        type="button"
                        variant="ghost"
                        onClick={() => {
                          setEditingPassword(false);
                          setNewPassword('');
                          setConfirmPassword('');
                        }}
                        disabled={isUpdatingPassword}
                        size="sm"
                      >
                        Cancel
                      </Button>
                    </div>
                  </form>
                ) : (
                  <p className="text-sm text-muted-foreground">••••••••</p>
                )}
              </div>

              {/* Sign out */}
              <div className="pt-2">
                <Button variant="outline" onClick={handleSignOut} className="rounded-full">
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign out
                </Button>
              </div>
            </section>
          </div>
        </div>
      </main>

      <Footer />

      <ImageCropDialog
        open={cropDialogOpen}
        imageSrc={selectedImageSrc}
        onCropComplete={handleCroppedImage}
        onClose={handleCloseCropDialog}
      />
    </div>
  );
};

export default Profile;
