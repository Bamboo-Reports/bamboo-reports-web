import { z } from 'zod';

const blockedRedirectPaths = new Set(['/signin', '/signup']);
const namePattern = /^[A-Za-z][A-Za-z'. -]*$/;
const companyPattern = /^[A-Za-z0-9][A-Za-z0-9&.,'()/-\s]*$/;
const freeEmailDomains = new Set([
  'gmail.com', 'googlemail.com', 'yahoo.com', 'yahoo.co.in', 'ymail.com',
  'hotmail.com', 'hotmail.co.uk', 'outlook.com', 'live.com', 'msn.com',
  'proton.me', 'protonmail.com', 'icloud.com', 'me.com', 'aol.com',
  'mail.com', 'zoho.com', 'gmx.com',
]);

export const normalizeSpaces = (value: string) => value.trim().replace(/\s+/g, ' ');
export const getDigits = (value: string) => value.replace(/\D/g, '');

export const isValidName = (value: string) => {
  return value.length >= 2 && value.length <= 50 && namePattern.test(value);
};

export const isValidCompanyName = (value: string) => {
  return value.length >= 2 && value.length <= 120 && companyPattern.test(value);
};

export const isValidPhoneNumber = (value: string) => {
  const digits = getDigits(value);
  return digits.length >= 7 && digits.length <= 15 && /^\+?[0-9\s().-]+$/.test(value);
};

export const getSafeRedirectPath = (redirect: string | null, fallback = '/profile') => {
  if (!redirect || !redirect.startsWith('/') || redirect.startsWith('//')) {
    return fallback;
  }

  try {
    const parsed = new URL(redirect, window.location.origin);
    if (parsed.origin !== window.location.origin) {
      return fallback;
    }

    if (blockedRedirectPaths.has(parsed.pathname)) {
      return fallback;
    }

    return `${parsed.pathname}${parsed.search}${parsed.hash}`;
  } catch {
    return fallback;
  }
};

export const passwordRequirements = {
  length: (password: string) => password.length >= 8,
  lowercase: (password: string) => /[a-z]/.test(password),
  uppercase: (password: string) => /[A-Z]/.test(password),
  number: (password: string) => /[0-9]/.test(password),
  special: (password: string) => /[^A-Za-z0-9]/.test(password),
};

export const getPasswordChecks = (password: string) => ({
  length: passwordRequirements.length(password),
  lowercase: passwordRequirements.lowercase(password),
  uppercase: passwordRequirements.uppercase(password),
  number: passwordRequirements.number(password),
  special: passwordRequirements.special(password),
});

export const isStrongPassword = (password: string) => {
  const checks = getPasswordChecks(password);
  return Object.values(checks).every(Boolean);
};

export const profileDetailsSchema = z.object({
  firstName: z.string()
    .transform(normalizeSpaces)
    .refine((value) => value.length > 0, 'First name is required.')
    .refine(isValidName, 'Please enter a real first name with at least 2 letters.'),
  lastName: z.string()
    .transform(normalizeSpaces)
    .refine((value) => value.length > 0, 'Last name is required.')
    .refine(isValidName, 'Please enter a real last name with at least 2 letters.'),
  companyName: z.string()
    .transform(normalizeSpaces)
    .refine((value) => value.length > 0, 'Company name is required.')
    .refine(isValidCompanyName, 'Please enter a valid company name with at least 2 characters.'),
  phoneNumber: z.string()
    .transform((value) => value.trim())
    .refine((value) => value.length > 0, 'Phone number is required.')
    .refine(isValidPhoneNumber, 'Please enter a valid phone number with 7 to 15 digits.'),
});

const signupQualificationSchema = z.object({
  jobTitle: z.string()
    .transform(normalizeSpaces)
    .refine((value) => value.length > 0, 'Job title is required.')
    .refine((value) => value.length >= 2 && value.length <= 120, 'Please enter a valid job title.'),
  companyOffering: z.string()
    .transform(normalizeSpaces)
    .refine((value) => value.length > 0, 'Please describe what your company offers.')
    .refine((value) => value.length >= 10 && value.length <= 500, 'Please use 10 to 500 characters to describe your offering and audience.'),
});

export const signupSchema = profileDetailsSchema.merge(signupQualificationSchema).extend({
  primaryGoal: z.enum([
    'gcc_data',
    'market_intelligence',
    'lead_generation',
    'benchmarking',
    'other',
  ], {
    required_error: 'Please select what you would like to achieve.',
    invalid_type_error: 'Please select what you would like to achieve.',
  }),
  primaryGoalOther: z.string()
    .transform(normalizeSpaces)
    .refine((value) => value.length <= 300, 'Please keep your response under 300 characters.'),
  email: z.string()
    .trim()
    .toLowerCase()
    .email('Please enter a valid email address.')
    .refine((value) => {
      const domain = value.split('@')[1];
      return Boolean(domain) && !freeEmailDomains.has(domain);
    }, 'Please use your company email. Free email providers are not allowed.'),
  password: z.string()
    .refine((value) => value.length > 0, 'Password is required.')
    .refine(isStrongPassword, 'Password must be at least 8 characters and include uppercase, lowercase, number, and special character.'),
  confirmPassword: z.string()
    .refine((value) => value.length > 0, 'Please confirm your password.'),
}).superRefine((values, ctx) => {
  if (values.primaryGoal === 'other' && values.primaryGoalOther.length < 3) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'Please tell us what you would like to achieve.',
      path: ['primaryGoalOther'],
    });
  }
  if (values.password !== values.confirmPassword) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'Passwords do not match.',
      path: ['confirmPassword'],
    });
  }
});

export const getDisplayName = (metadata: Record<string, unknown> | null | undefined) => {
  const firstName = typeof metadata?.first_name === 'string' ? metadata.first_name.trim() : '';
  const lastName = typeof metadata?.last_name === 'string' ? metadata.last_name.trim() : '';
  const fullName = `${firstName} ${lastName}`.trim();

  if (fullName) {
    return fullName;
  }

  return typeof metadata?.full_name === 'string' && metadata.full_name.trim()
    ? metadata.full_name.trim()
    : 'User';
};
