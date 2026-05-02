import { useState, useMemo } from 'react';
import { useNavigate, Link, useSearchParams } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Eye, EyeOff, Check, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { getPasswordChecks, getSafeRedirectPath, signupSchema } from '@/lib/auth';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const SignUp = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { signUp } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchParams] = useSearchParams();
  const redirectTo = getSafeRedirectPath(searchParams.get('redirect'));

  const passwordStrength = useMemo(() => {
    if (!password) return { score: 0, label: '', color: '' };

    let score = 0;
    const checks = getPasswordChecks(password);

    if (checks.length) score += 20;
    if (checks.lowercase) score += 20;
    if (checks.uppercase) score += 20;
    if (checks.number) score += 20;
    if (checks.special) score += 20;

    let label = '';
    let color = '';

    if (score <= 40) {
      label = 'Weak';
      color = 'bg-red-500';
    } else if (score <= 60) {
      label = 'Fair';
      color = 'bg-orange-500';
    } else if (score <= 80) {
      label = 'Good';
      color = 'bg-yellow-500';
    } else {
      label = 'Strong';
      color = 'bg-green-500';
    }

    return { score, label, color, checks };
  }, [password]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const parsedSignup = signupSchema.safeParse({
      firstName,
      lastName,
      companyName,
      phoneNumber,
      email,
      password,
      confirmPassword,
    });

    if (!parsedSignup.success) {
      const issue = parsedSignup.error.issues[0];
      toast({
        title: 'Check your details',
        description: issue.message,
        variant: 'destructive',
      });
      return;
    }

    const signupValues = parsedSignup.data;

    const checkDisposable = async () => {
      try {
        const response = await fetch(`/.netlify/functions/check-tempmail?email=${encodeURIComponent(signupValues.email)}`);
        if (!response.ok) return false;
        const data = await response.json();
        return data?.temp === true || data?.disposable === true;
      } catch (error) {
        console.warn('Tempmail checker unavailable', error);
        return false;
      }
    };

    const isDisposable = await checkDisposable();
    if (isDisposable) {
      toast({
        title: 'Work email required',
        description: 'Disposable or temporary emails are not allowed. Please use your company email.',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);

    const { error } = await signUp(
      signupValues.email,
      signupValues.password,
      signupValues.firstName,
      signupValues.lastName,
      signupValues.phoneNumber,
      signupValues.companyName,
    );

    if (error) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
      setIsLoading(false);
    } else {
      toast({
        title: 'Success!',
        description: 'Account created successfully. Please check your email to verify your account.',
      });
      setTimeout(() => {
        navigate(`/signin?redirect=${encodeURIComponent(redirectTo)}`);
      }, 2000);
    }
  };

  const passwordsMatch = password && confirmPassword && password === confirmPassword;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="flex-1 py-12 md:py-16 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">Create your account</h1>
            <p className="text-muted-foreground">
              Use your work email to get started.
            </p>
          </div>

          <div className="rounded-lg border bg-card p-6 sm:p-8">
            <form onSubmit={handleSubmit} className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label htmlFor="firstName">First name</Label>
                <Input
                  id="firstName"
                  placeholder="Aarav"
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                  disabled={isLoading}
                  autoComplete="given-name"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="lastName">Last name</Label>
                <Input
                  id="lastName"
                  placeholder="Sharma"
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                  disabled={isLoading}
                  autoComplete="family-name"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="companyName">Company name</Label>
                <Input
                  id="companyName"
                  placeholder="Infosys"
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  required
                  disabled={isLoading}
                  autoComplete="organization"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="phoneNumber">Phone number</Label>
                <Input
                  id="phoneNumber"
                  placeholder="+91 98765 43210"
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  required
                  disabled={isLoading}
                  autoComplete="tel"
                />
              </div>
              <div className="space-y-1.5 sm:col-span-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  placeholder="name@company.com"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={isLoading}
                  autoComplete="email"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    placeholder="••••••••"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    disabled={isLoading}
                    className="pr-10"
                    autoComplete="new-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    tabIndex={-1}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>

                {password && (
                  <div className="space-y-2 mt-3">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                        <div
                          className={cn('h-full transition-all duration-300', passwordStrength.color)}
                          style={{ width: `${passwordStrength.score}%` }}
                        />
                      </div>
                      <span className="text-xs font-medium min-w-[45px]">{passwordStrength.label}</span>
                    </div>

                    <div className="space-y-1 text-xs">
                      <div className={cn('flex items-center gap-1.5', passwordStrength.checks?.length ? 'text-green-600' : 'text-muted-foreground')}>
                        {passwordStrength.checks?.length ? <Check className="h-3 w-3" /> : <X className="h-3 w-3" />}
                        <span>At least 8 characters</span>
                      </div>
                      <div className={cn('flex items-center gap-1.5', passwordStrength.checks?.uppercase && passwordStrength.checks?.lowercase ? 'text-green-600' : 'text-muted-foreground')}>
                        {passwordStrength.checks?.uppercase && passwordStrength.checks?.lowercase ? <Check className="h-3 w-3" /> : <X className="h-3 w-3" />}
                        <span>Uppercase and lowercase letters</span>
                      </div>
                      <div className={cn('flex items-center gap-1.5', passwordStrength.checks?.number ? 'text-green-600' : 'text-muted-foreground')}>
                        {passwordStrength.checks?.number ? <Check className="h-3 w-3" /> : <X className="h-3 w-3" />}
                        <span>At least one number</span>
                      </div>
                      <div className={cn('flex items-center gap-1.5', passwordStrength.checks?.special ? 'text-green-600' : 'text-muted-foreground')}>
                        {passwordStrength.checks?.special ? <Check className="h-3 w-3" /> : <X className="h-3 w-3" />}
                        <span>Special character (!@#$%...)</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="confirmPassword">Confirm password</Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    placeholder="••••••••"
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    disabled={isLoading}
                    className={cn(
                      'pr-10',
                      confirmPassword && !passwordsMatch && 'border-destructive focus-visible:ring-destructive/20'
                    )}
                    autoComplete="new-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    tabIndex={-1}
                  >
                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {confirmPassword && !passwordsMatch && (
                  <p className="text-xs text-destructive flex items-center gap-1">
                    <X className="h-3 w-3" />
                    Passwords do not match
                  </p>
                )}
                {passwordsMatch && (
                  <p className="text-xs text-green-600 flex items-center gap-1">
                    <Check className="h-3 w-3" />
                    Passwords match
                  </p>
                )}
              </div>
              <Button
                type="submit"
                className="w-full rounded-full sm:col-span-2"
                disabled={isLoading}
                size="lg"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating account...
                  </>
                ) : (
                  'Create account'
                )}
              </Button>
              <p className="text-xs text-muted-foreground text-center sm:col-span-2">
                By creating an account you agree to our{' '}
                <Link to="/terms-conditions" className="text-primary font-semibold hover:underline">
                  Terms
                </Link>{' '}
                and{' '}
                <Link to="/privacy-policy" className="text-primary font-semibold hover:underline">
                  Privacy Policy
                </Link>
                .
              </p>
            </form>
          </div>

          <p className="text-sm text-center text-muted-foreground mt-6">
            Already have an account?{' '}
            <Link
              to={redirectTo !== '/profile' ? `/signin?redirect=${encodeURIComponent(redirectTo)}` : '/signin'}
              className="text-primary font-semibold hover:underline"
            >
              Sign in
            </Link>
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default SignUp;
