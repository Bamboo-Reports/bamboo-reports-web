import { useState, useMemo } from 'react';
import { useNavigate, Link, useSearchParams } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Eye, EyeOff, Check, X, Sparkles, ShieldCheck, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const SignUp = () => {
  const [fullName, setFullName] = useState('');
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
  const redirectTo = searchParams.get('redirect');

  const passwordStrength = useMemo(() => {
    if (!password) return { score: 0, label: '', color: '' };

    let score = 0;
    const checks = {
      length: password.length >= 8,
      lowercase: /[a-z]/.test(password),
      uppercase: /[A-Z]/.test(password),
      number: /[0-9]/.test(password),
      special: /[^A-Za-z0-9]/.test(password),
    };

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

    if (password !== confirmPassword) {
      toast({
        title: 'Error',
        description: 'Passwords do not match',
        variant: 'destructive',
      });
      return;
    }

    if (password.length < 6) {
      toast({
        title: 'Error',
        description: 'Password must be at least 6 characters',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);

    const { error } = await signUp(email, password, fullName);

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
        const signinUrl = redirectTo ? `/signin?redirect=${encodeURIComponent(redirectTo)}` : '/signin';
        navigate(signinUrl);
      }, 2000);
    }
  };

  const passwordsMatch = password && confirmPassword && password === confirmPassword;

  const valuePoints = [
    { title: 'Frictionless onboarding', description: 'Create an account in minutes and pick up where you left off on any device.' },
    { title: 'Built for teams', description: 'Invite collaborators, manage seats, and keep GCC context shared across roles.' },
    { title: 'Enterprise-grade security', description: 'SSO ready with secure authentication and verified account setup.' }
  ];

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-background via-primary/5 to-background px-4 py-16">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(34,197,94,0.06),_transparent_45%),_radial-gradient(circle_at_bottom_right,_rgba(34,197,94,0.04),_transparent_35%)]" />

      <div className="relative max-w-6xl mx-auto space-y-10">
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 text-primary px-3 py-1 text-xs font-semibold">
            <Sparkles className="h-4 w-4" />
            <span>Built for GCC go-to-market teams</span>
          </div>
          <div className="space-y-2">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Create your Bamboo Reports account</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Set up access to verified GCC intelligence, invite teammates, and keep your research in one place.
            </p>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.05fr_1fr] items-start">
          <div className="rounded-3xl border bg-card/80 backdrop-blur shadow-xl p-6 md:p-8 space-y-6">
            <div className="flex items-center gap-3">
              <div className="h-11 w-11 rounded-2xl bg-primary/10 text-primary grid place-items-center">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-semibold text-primary">Confident onboarding</p>
                <p className="text-muted-foreground">Your workspace is secured and ready for collaborative GCC work.</p>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              {valuePoints.map((item) => (
                <div key={item.title} className="rounded-2xl border bg-muted/30 p-4 space-y-2">
                  <div className="flex items-center gap-2 text-sm font-semibold">
                    <Check className="h-4 w-4 text-primary" />
                    {item.title}
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>

            <div className="rounded-2xl border border-primary/30 bg-primary/5 px-5 py-4 flex items-start gap-3">
              <div className="mt-0.5 h-8 w-8 rounded-full bg-primary text-primary-foreground grid place-items-center">
                <Sparkles className="h-4 w-4" />
              </div>
              <div className="space-y-1">
                <p className="font-semibold">Need a tailored rollout?</p>
                <p className="text-sm text-muted-foreground">We can align your setup to specific pursuits, reporting cadences, or security needs.</p>
                <Link to="/contact" className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary/80 transition-colors">
                  Talk to the team <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>

          <Card className="w-full shadow-2xl border bg-card/90 backdrop-blur animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="h-1 w-full bg-gradient-to-r from-primary via-emerald-400 to-primary/70 rounded-t-2xl" />
            <CardHeader className="space-y-2 pb-4">
              <CardTitle className="text-2xl font-bold">Create an account</CardTitle>
              <CardDescription>Use your work email for faster verification.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full name</Label>
                  <Input
                    id="fullName"
                    placeholder="Jordan Patel"
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                    disabled={isLoading}
                    className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                    autoComplete="name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Work email</Label>
                  <Input
                    id="email"
                    placeholder="name@company.com"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={isLoading}
                    className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                    autoComplete="email"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      placeholder="••••••••"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      disabled={isLoading}
                      className="pr-10 transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                      autoComplete="new-password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                      tabIndex={-1}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>

                  {password && (
                    <div className="space-y-2 mt-3">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                          <div
                            className={cn("h-full transition-all duration-300", passwordStrength.color)}
                            style={{ width: `${passwordStrength.score}%` }}
                          />
                        </div>
                        <span className="text-xs font-medium min-w-[45px]">{passwordStrength.label}</span>
                      </div>

                      <div className="space-y-1 text-xs">
                        <div className={cn("flex items-center gap-1.5", passwordStrength.checks?.length ? "text-green-600" : "text-muted-foreground")}>
                          {passwordStrength.checks?.length ? <Check className="h-3 w-3" /> : <X className="h-3 w-3" />}
                          <span>At least 8 characters</span>
                        </div>
                        <div className={cn("flex items-center gap-1.5", passwordStrength.checks?.uppercase && passwordStrength.checks?.lowercase ? "text-green-600" : "text-muted-foreground")}>
                          {passwordStrength.checks?.uppercase && passwordStrength.checks?.lowercase ? <Check className="h-3 w-3" /> : <X className="h-3 w-3" />}
                          <span>Uppercase and lowercase letters</span>
                        </div>
                        <div className={cn("flex items-center gap-1.5", passwordStrength.checks?.number ? "text-green-600" : "text-muted-foreground")}>
                          {passwordStrength.checks?.number ? <Check className="h-3 w-3" /> : <X className="h-3 w-3" />}
                          <span>At least one number</span>
                        </div>
                        <div className={cn("flex items-center gap-1.5", passwordStrength.checks?.special ? "text-green-600" : "text-muted-foreground")}>
                          {passwordStrength.checks?.special ? <Check className="h-3 w-3" /> : <X className="h-3 w-3" />}
                          <span>Special character (!@#$%...)</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm password</Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      placeholder="••••••••"
                      type={showConfirmPassword ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                      disabled={isLoading}
                      className={cn(
                        "pr-10 transition-all duration-200 focus:ring-2 focus:ring-primary/20",
                        confirmPassword && !passwordsMatch && "border-red-500 focus:ring-red-500/20"
                      )}
                      autoComplete="new-password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                      tabIndex={-1}
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                  {confirmPassword && !passwordsMatch && (
                    <p className="text-xs text-red-500 flex items-center gap-1">
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
                  className="w-full transition-all duration-200 hover:scale-[1.01]"
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
                <p className="text-xs text-muted-foreground text-center">
                  By creating an account you agree to our <Link to="/terms" className="text-primary hover:underline font-semibold">Terms</Link> and <Link to="/privacy" className="text-primary hover:underline font-semibold">Privacy Policy</Link>.
                </p>
              </form>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <div className="text-sm text-center text-gray-600 dark:text-gray-400">
                Already have an account?{' '}
                <Link
                  to={redirectTo && redirectTo !== '/profile' ? `/signin?redirect=${encodeURIComponent(redirectTo)}` : '/signin'}
                  className="text-primary hover:underline font-semibold transition-all duration-200"
                >
                  Sign in
                </Link>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
