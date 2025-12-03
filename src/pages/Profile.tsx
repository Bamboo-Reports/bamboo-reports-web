import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useToast } from '@/hooks/use-toast';
import { LogOut, Mail, User, Calendar, Camera, Loader2, Trash2, FileText, ShoppingBag, DollarSign, TrendingUp, ArrowRight } from 'lucide-react';
import { format } from 'date-fns';
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

  const [newName, setNewName] = useState('');
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
    if (!newName.trim()) {
      toast({
        title: 'Error',
        description: 'Name cannot be empty',
        variant: 'destructive',
      });
      return;
    }

    setIsUpdatingName(true);
    const { error } = await updateProfile(newName);

    if (error) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    } else {
      toast({
        title: 'Success',
        description: 'Name updated successfully',
      });
      setEditingName(false);
      setNewName('');
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
    if (newPassword.length < 6) {
      toast({
        title: 'Error',
        description: 'Password must be at least 6 characters',
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

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast({
        title: 'Error',
        description: 'Please select an image file',
        variant: 'destructive',
      });
      return;
    }

    // Create object URL for the crop dialog
    const imageUrl = URL.createObjectURL(file);
    setSelectedImageSrc(imageUrl);
    setCropDialogOpen(true);

    // Reset file input
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
    // Clean up the object URL
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

  const fullName = user.user_metadata?.full_name || 'User';
  const avatarUrl = user.user_metadata?.avatar_url;
  const createdAt = user.created_at ? new Date(user.created_at) : new Date();

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-background via-primary/5 to-background px-4 py-10 sm:py-14">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(34,197,94,0.06),_transparent_45%),_radial-gradient(circle_at_bottom_right,_rgba(34,197,94,0.04),_transparent_35%)]" />
      <div className="relative max-w-5xl mx-auto space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 text-primary px-3 py-1 text-xs font-semibold">
              <TrendingUp className="h-4 w-4" />
              <span>Account</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight">Your profile</h1>
            <p className="text-sm text-muted-foreground max-w-2xl">
              A minimal, calmer view that matches the auth pages and keeps the essentials close.
            </p>
          </div>
          <Button variant="ghost" onClick={() => navigate('/')} className="self-start">
            Back home
          </Button>
        </div>

        <Card className="shadow-xl border bg-card/95 backdrop-blur">
          <div className="h-1 w-full bg-gradient-to-r from-primary via-emerald-400 to-primary/70 rounded-t-xl" />
          <CardContent className="p-6 sm:p-8 space-y-8">
            <div className="grid gap-8 lg:grid-cols-[320px,1fr]">
              <div className="space-y-6">
                <div className="rounded-xl border bg-muted/30 p-4 space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="relative">
                      <Avatar className="h-16 w-16 sm:h-20 sm:w-20">
                        {avatarUrl && <AvatarImage src={avatarUrl} alt={fullName} />}
                        <AvatarFallback className="bg-primary text-primary-foreground">
                          {getInitials(fullName)}
                        </AvatarFallback>
                      </Avatar>
                      {isUploadingAvatar && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-full">
                          <Loader2 className="h-6 w-6 animate-spin text-white" />
                        </div>
                      )}
                    </div>
                    <div className="space-y-1">
                      <p className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">Signed in as</p>
                      <p className="text-lg font-semibold leading-tight">{fullName}</p>
                      <p className="text-xs text-muted-foreground break-all">{user.email}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleImageSelect}
                      accept="image/*"
                      className="hidden"
                    />
                    <Button
                      variant="secondary"
                      onClick={() => fileInputRef.current?.click()}
                      disabled={isUploadingAvatar}
                      size="sm"
                      className="justify-center"
                    >
                      <Camera className="mr-2 h-4 w-4" />
                      Upload photo
                    </Button>
                    {avatarUrl && (
                      <Button
                        variant="outline"
                        onClick={handleDeleteAvatar}
                        disabled={isUploadingAvatar}
                        size="sm"
                        className="justify-center"
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Remove photo
                      </Button>
                    )}
                  </div>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <div className="inline-flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      <span>Member since {format(createdAt, 'MMMM dd, yyyy')}</span>
                    </div>
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 text-emerald-600 px-2 py-1 font-medium">
                      <span className="h-2 w-2 rounded-full bg-emerald-500" />
                      Active
                    </span>
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <p className="text-sm font-semibold tracking-tight">Quick actions</p>
                    <p className="text-xs text-muted-foreground">Jump into the areas you use most</p>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => navigate('/my-content')}
                      className="group flex items-center justify-between rounded-lg border bg-card/70 px-4 py-3 transition-colors hover:border-primary/40 hover:bg-primary/5"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary">
                          <FileText className="h-4 w-4" />
                        </div>
                        <div className="text-left">
                          <p className="text-sm font-semibold">My Content</p>
                          <p className="text-xs text-muted-foreground">Purchased reports</p>
                        </div>
                      </div>
                      <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary" />
                    </button>
                    <button
                      type="button"
                      onClick={() => navigate('/purchases')}
                      className="group flex items-center justify-between rounded-lg border bg-card/70 px-4 py-3 transition-colors hover:border-primary/40 hover:bg-primary/5"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600">
                          <ShoppingBag className="h-4 w-4" />
                        </div>
                        <div className="text-left">
                          <p className="text-sm font-semibold">My Purchases</p>
                          <p className="text-xs text-muted-foreground">History & invoices</p>
                        </div>
                      </div>
                      <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary" />
                    </button>
                    <button
                      type="button"
                      onClick={() => navigate('/pricing')}
                      className="group flex items-center justify-between rounded-lg border bg-card/70 px-4 py-3 transition-colors hover:border-primary/40 hover:bg-primary/5"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-purple-500/10 text-purple-600">
                          <DollarSign className="h-4 w-4" />
                        </div>
                        <div className="text-left">
                          <p className="text-sm font-semibold">Plans</p>
                          <p className="text-xs text-muted-foreground">Compare options</p>
                        </div>
                      </div>
                      <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary" />
                    </button>
                    <button
                      type="button"
                      onClick={() => navigate('/reports')}
                      className="group flex items-center justify-between rounded-lg border bg-card/70 px-4 py-3 transition-colors hover:border-primary/40 hover:bg-primary/5"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-orange-500/10 text-orange-600">
                          <TrendingUp className="h-4 w-4" />
                        </div>
                        <div className="text-left">
                          <p className="text-sm font-semibold">Explore Reports</p>
                          <p className="text-xs text-muted-foreground">Browse catalog</p>
                        </div>
                      </div>
                      <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary" />
                    </button>
                  </div>
                </div>
              </div>

              <div className="space-y-5">
                <div className="rounded-xl border bg-muted/20 p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-primary" />
                      <span className="text-sm font-semibold">Full name</span>
                    </div>
                    {!editingName && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setEditingName(true);
                          setNewName(fullName);
                        }}
                      >
                        Edit
                      </Button>
                    )}
                  </div>
                  {editingName ? (
                    <form onSubmit={handleUpdateName} className="space-y-3">
                      <div className="space-y-1">
                        <Label htmlFor="full-name" className="text-xs text-muted-foreground">
                          Name
                        </Label>
                        <Input
                          id="full-name"
                          value={newName}
                          onChange={(e) => setNewName(e.target.value)}
                          placeholder={fullName}
                          disabled={isUpdatingName}
                          className="h-10"
                        />
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
                            setNewName('');
                          }}
                          disabled={isUpdatingName}
                          size="sm"
                        >
                          Cancel
                        </Button>
                      </div>
                    </form>
                  ) : (
                    <p className="text-sm text-muted-foreground">{fullName}</p>
                  )}
                </div>

                <div className="rounded-xl border bg-muted/20 p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-primary" />
                      <span className="text-sm font-semibold">Email</span>
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
                      <div className="space-y-1">
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
                          className="h-10"
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
                    <p className="text-sm text-muted-foreground">{user.email}</p>
                  )}
                </div>

                <div className="rounded-xl border bg-muted/20 p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="h-4 w-4 text-primary" />
                      <span className="text-sm font-semibold">Password</span>
                    </div>
                    {!editingPassword && (
                      <Button variant="ghost" size="sm" onClick={() => setEditingPassword(true)}>
                        Change
                      </Button>
                    )}
                  </div>
                  {editingPassword ? (
                    <form onSubmit={handleUpdatePassword} className="space-y-3">
                      <div className="space-y-1">
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
                          className="h-10"
                        />
                      </div>
                      <div className="space-y-1">
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
                          className="h-10"
                        />
                      </div>
                      <p className="text-xs text-muted-foreground">Use at least 6 characters.</p>
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
                    <p className="text-sm text-muted-foreground">********</p>
                  )}
                </div>

                <div className="flex flex-wrap gap-3">
                  <Button variant="destructive" onClick={handleSignOut} size="sm">
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign out
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <ImageCropDialog
          open={cropDialogOpen}
          imageSrc={selectedImageSrc}
          onCropComplete={handleCroppedImage}
          onClose={handleCloseCropDialog}
        />
      </div>
    </div>
  );
};

export default Profile;
