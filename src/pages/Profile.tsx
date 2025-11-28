import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 px-4 py-12">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold">Profile</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Manage your account settings and preferences
            </p>
          </div>
          <Button variant="outline" onClick={() => navigate('/')}>
            Back to Home
          </Button>
        </div>

        {/* 50/50 Split Layout */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Left: Quick Actions */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Navigate to different sections of your account</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-4">
                {/* My Content */}
                <button
                  onClick={() => navigate('/my-content')}
                  className="group relative p-6 rounded-lg border-2 border-gray-200 dark:border-gray-700 hover:border-primary hover:shadow-lg transition-all duration-200 text-left bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 hover:scale-[1.02] active:scale-[0.98]"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="p-3 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                      <FileText className="h-6 w-6" />
                    </div>
                    <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                  </div>
                  <h3 className="font-semibold text-lg mb-1">My Content</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    View your purchased reports and documents
                  </p>
                </button>

                {/* My Purchases */}
                <button
                  onClick={() => navigate('/purchases')}
                  className="group relative p-6 rounded-lg border-2 border-gray-200 dark:border-gray-700 hover:border-primary hover:shadow-lg transition-all duration-200 text-left bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 hover:scale-[1.02] active:scale-[0.98]"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="p-3 rounded-lg bg-green-500/10 text-green-600 dark:text-green-400 group-hover:bg-green-500 group-hover:text-white transition-colors">
                      <ShoppingBag className="h-6 w-6" />
                    </div>
                    <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                  </div>
                  <h3 className="font-semibold text-lg mb-1">My Purchases</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    View your purchase history and details
                  </p>
                </button>

                {/* Browse Plans */}
                <button
                  onClick={() => navigate('/pricing')}
                  className="group relative p-6 rounded-lg border-2 border-gray-200 dark:border-gray-700 hover:border-primary hover:shadow-lg transition-all duration-200 text-left bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 hover:scale-[1.02] active:scale-[0.98]"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="p-3 rounded-lg bg-purple-500/10 text-purple-600 dark:text-purple-400 group-hover:bg-purple-500 group-hover:text-white transition-colors">
                      <DollarSign className="h-6 w-6" />
                    </div>
                    <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                  </div>
                  <h3 className="font-semibold text-lg mb-1">Browse Plans</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Explore pricing and unlock more features
                  </p>
                </button>

                {/* Explore Reports */}
                <button
                  onClick={() => navigate('/reports')}
                  className="group relative p-6 rounded-lg border-2 border-gray-200 dark:border-gray-700 hover:border-primary hover:shadow-lg transition-all duration-200 text-left bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 hover:scale-[1.02] active:scale-[0.98]"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="p-3 rounded-lg bg-orange-500/10 text-orange-600 dark:text-orange-400 group-hover:bg-orange-500 group-hover:text-white transition-colors">
                      <TrendingUp className="h-6 w-6" />
                    </div>
                    <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                  </div>
                  <h3 className="font-semibold text-lg mb-1">Explore Reports</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Discover available reports and insights
                  </p>
                </button>
              </div>
            </CardContent>
          </Card>

          {/* Right: Account Information + Profile Picture */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Account Information</CardTitle>
              <CardDescription>Update your personal details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Profile Picture Section */}
              <div className="flex flex-col items-center space-y-4 pb-6 border-b">
                <div className="relative">
                  <Avatar className="h-32 w-32 text-2xl">
                    {avatarUrl && <AvatarImage src={avatarUrl} alt={fullName} />}
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {getInitials(fullName)}
                    </AvatarFallback>
                  </Avatar>
                  {isUploadingAvatar && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full">
                      <Loader2 className="h-8 w-8 animate-spin text-white" />
                    </div>
                  )}
                </div>
                <div className="text-center">
                  <h3 className="text-xl font-semibold">{fullName}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{user.email}</p>
                </div>
                <div className="flex flex-col gap-2 w-full">
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImageSelect}
                    accept="image/*"
                    className="hidden"
                  />
                  <Button
                    variant="outline"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isUploadingAvatar}
                    className="w-full"
                  >
                    <Camera className="mr-2 h-4 w-4" />
                    Upload Photo
                  </Button>
                  {avatarUrl && (
                    <Button
                      variant="outline"
                      onClick={handleDeleteAvatar}
                      disabled={isUploadingAvatar}
                      className="w-full text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Remove Photo
                    </Button>
                  )}
                </div>
              </div>
              {/* Full Name */}
              <div className="space-y-2">
                <Label>Full Name</Label>
                {editingName ? (
                  <form onSubmit={handleUpdateName} className="space-y-2">
                    <Input
                      value={newName}
                      onChange={(e) => setNewName(e.target.value)}
                      placeholder={fullName}
                      disabled={isUpdatingName}
                    />
                    <div className="flex gap-2">
                      <Button type="submit" disabled={isUpdatingName} size="sm">
                        {isUpdatingName ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Saving...
                          </>
                        ) : (
                          'Save'
                        )}
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
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
                  <div className="flex items-center justify-between p-4 rounded-lg bg-gray-50 dark:bg-gray-800">
                    <div className="flex items-center space-x-4">
                      <User className="h-5 w-5 text-primary" />
                      <span className="font-semibold">{fullName}</span>
                    </div>
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
                  </div>
                )}
              </div>

              <Separator />

              {/* Email */}
              <div className="space-y-2">
                <Label>Email Address</Label>
                {editingEmail ? (
                  <form onSubmit={handleUpdateEmail} className="space-y-2">
                    <Input
                      type="email"
                      value={newEmail}
                      onChange={(e) => setNewEmail(e.target.value)}
                      placeholder={user.email || ''}
                      disabled={isUpdatingEmail}
                    />
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      You'll need to confirm your new email address
                    </p>
                    <div className="flex gap-2">
                      <Button type="submit" disabled={isUpdatingEmail} size="sm">
                        {isUpdatingEmail ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Updating...
                          </>
                        ) : (
                          'Update Email'
                        )}
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
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
                  <div className="flex items-center justify-between p-4 rounded-lg bg-gray-50 dark:bg-gray-800">
                    <div className="flex items-center space-x-4">
                      <Mail className="h-5 w-5 text-primary" />
                      <span className="font-semibold">{user.email}</span>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setEditingEmail(true);
                        setNewEmail(user.email || '');
                      }}
                    >
                      Edit
                    </Button>
                  </div>
                )}
              </div>

              <Separator />

              {/* Password */}
              <div className="space-y-2">
                <Label>Password</Label>
                {editingPassword ? (
                  <form onSubmit={handleUpdatePassword} className="space-y-2">
                    <Input
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="New password"
                      disabled={isUpdatingPassword}
                    />
                    <Input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Confirm new password"
                      disabled={isUpdatingPassword}
                    />
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Password must be at least 6 characters
                    </p>
                    <div className="flex gap-2">
                      <Button type="submit" disabled={isUpdatingPassword} size="sm">
                        {isUpdatingPassword ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Updating...
                          </>
                        ) : (
                          'Update Password'
                        )}
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
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
                  <div className="flex items-center justify-between p-4 rounded-lg bg-gray-50 dark:bg-gray-800">
                    <span className="font-semibold">••••••••</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setEditingPassword(true)}
                    >
                      Change Password
                    </Button>
                  </div>
                )}
              </div>

              <Separator />

              {/* Account Info */}
              <div className="flex items-start space-x-4 p-4 rounded-lg bg-gray-50 dark:bg-gray-800">
                <Calendar className="h-5 w-5 text-primary mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Member Since
                  </p>
                  <p className="text-base font-semibold">
                    {format(createdAt, 'MMMM dd, yyyy')}
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4 p-4 rounded-lg bg-gray-50 dark:bg-gray-800">
                <div className="h-5 w-5 flex items-center justify-center mt-0.5">
                  <div className="h-3 w-3 rounded-full bg-green-500"></div>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Account Status
                  </p>
                  <p className="text-base font-semibold text-green-600 dark:text-green-400">
                    Active
                  </p>
                </div>
              </div>

              <Separator />

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  variant="destructive"
                  onClick={handleSignOut}
                  className="w-full sm:w-auto"
                  size="lg"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign Out
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

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
