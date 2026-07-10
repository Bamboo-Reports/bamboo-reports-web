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
import AuthPageShell from '@/components/AuthPageShell';

const SignUp = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [companyOffering, setCompanyOffering] = useState('');
  const [primaryGoal, setPrimaryGoal] = useState('');
  const [primaryGoalOther, setPrimaryGoalOther] = useState('');
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
      jobTitle,
      companyOffering,
      primaryGoal,
      primaryGoalOther,
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
      signupValues.jobTitle,
      signupValues.companyOffering,
      signupValues.primaryGoal,
      signupValues.primaryGoalOther,
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
    <AuthPageShell
      wide
      title="Create your account"
      description={
        <p>
          Already have an account?{' '}
          <Link
            to={redirectTo !== '/profile' ? `/signin?redirect=${encodeURIComponent(redirectTo)}` : '/signin'}
            className="font-semibold text-primary hover:underline"
          >
            Sign in
          </Link>
        </p>
      }
    >
            <form onSubmit={handleSubmit} className="grid gap-5 sm:grid-cols-2 [&_input]:h-11 [&_select]:h-11">
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
                <Label htmlFor="jobTitle">Job title</Label>
                <Input
                  id="jobTitle"
                  placeholder="Head of Growth"
                  type="text"
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                  required
                  disabled={isLoading}
                  autoComplete="organization-title"
                />
              </div>
              <div className="space-y-1.5 sm:col-span-2">
                <Label htmlFor="companyOffering">What does your company offer, and who do you serve?</Label>
                <textarea
                  id="companyOffering"
                  placeholder="We provide cloud security services to enterprise technology teams."
                  value={companyOffering}
                  onChange={(e) => setCompanyOffering(e.target.value)}
                  required
                  disabled={isLoading}
                  maxLength={500}
                  rows={3}
                  className="flex min-h-24 w-full resize-y rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                />
              </div>
              <div className="space-y-1.5 sm:col-span-2">
                <Label htmlFor="primaryGoal">What would you like to achieve with Bamboo Reports?</Label>
                <select
                  id="primaryGoal"
                  value={primaryGoal}
                  onChange={(e) => {
                    setPrimaryGoal(e.target.value);
                    if (e.target.value !== 'other') setPrimaryGoalOther('');
                  }}
                  required
                  disabled={isLoading}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                >
                  <option value="" disabled>Select your primary goal</option>
                  <option value="gcc_data">GCC data and decision-maker intelligence</option>
                  <option value="market_intelligence">Market intelligence and opportunity mapping</option>
                  <option value="lead_generation">Lead generation and account targeting</option>
                  <option value="benchmarking">Benchmarking and competitive analysis</option>
                  <option value="other">Something else</option>
                </select>
              </div>
              {primaryGoal === 'other' && (
                <div className="space-y-1.5 sm:col-span-2">
                  <Label htmlFor="primaryGoalOther">Tell us what you’re looking to achieve</Label>
                  <textarea
                    id="primaryGoalOther"
                    placeholder="Describe the outcome you need help with."
                    value={primaryGoalOther}
                    onChange={(e) => setPrimaryGoalOther(e.target.value)}
                    required
                    disabled={isLoading}
                    maxLength={300}
                    rows={3}
                    className="flex min-h-24 w-full resize-y rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                  />
                </div>
              )}
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
                    className="absolute right-0 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-md text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    aria-label={showPassword ? "Hide password" : "Show password"}
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
                    className="absolute right-0 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-md text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    aria-label={showConfirmPassword ? "Hide password" : "Show password"}
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
                className="w-full sm:col-span-2"
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
    </AuthPageShell>
  );
};

export default SignUp;
