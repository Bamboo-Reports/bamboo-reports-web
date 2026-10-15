"use client";

import { RiCheckLine, RiErrorWarningLine } from "@remixicon/react";
import Link from "next/link";
import { useEffect, useId, useState, type FormEvent } from "react";
import { CalSchedulingButton } from "@/components/CalSchedulingButton";
import { Button, TrailingArrow } from "@/components/ui/button";
import { submitToJotform } from "@/lib/jotformSubmit";
import { cn } from "@/lib/utils";

/** The "[ BR ] - Inquiry" Jotform this form posts to. */
const FORM_ID = "260714112843450";

const POLICY_URL = "https://www.researchnxt.com/policy/";

// Jotform field names, read from the hosted form. The consent value is the
// checkbox option's exact text, as Jotform stores it.
const FIELD = {
  firstName: "q3_firstName",
  lastName: "q4_lastName",
  company: "q40_companyName",
  email: "q39_email39",
  phone: "q37_phoneNo",
  consent: "q27_researchNxts[]",
} as const;
const CONSENT_VALUE = `I Agree to Research NXT's <a target="_blank" href="${POLICY_URL}" rel="nofollow"> Policy T&C</a>`;

type Values = { firstName: string; lastName: string; company: string; email: string; phone: string };
type Errors = Partial<Record<keyof Values | "consent", string>>;

// From the confirmation email: review, get in touch, understand requirements.
const NEXT_STEPS = ["We review your request", "We get in touch", "We discuss what you need"];

const EMPTY: Values = { firstName: "", lastName: "", company: "", email: "", phone: "" };

// Campaign links can prefill the visitor's details, as the embedded form did.
const PREFILL: Record<string, keyof Values> = {
  firstName: "firstName",
  lastName: "lastName",
  companyName: "company",
  email: "email",
};

const validate = (values: Values, consent: boolean): Errors => {
  const errors: Errors = {};
  if (!values.firstName.trim()) errors.firstName = "Enter your first name.";
  if (!values.lastName.trim()) errors.lastName = "Enter your last name.";
  if (!values.company.trim()) errors.company = "Enter your company name.";
  if (!values.email.trim()) errors.email = "Enter your email address.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) errors.email = "Enter a valid email address.";
  if (!values.phone.trim()) errors.phone = "Enter your phone number.";
  else if (values.phone.replace(/\D/g, "").length < 7) errors.phone = "Enter a valid phone number.";
  if (!consent) errors.consent = "Please agree to the policy to continue.";
  return errors;
};

const inputClass = (invalid: boolean) =>
  cn(
    "h-11 w-full rounded-md border bg-background px-3.5 text-base text-ink placeholder:text-ink-muted",
    "transition-[border-color,box-shadow] duration-150 ease-out-quart",
    "focus:outline-none focus:ring-2 focus:ring-offset-0",
    invalid ? "border-destructive focus:ring-destructive/30" : "border-line-strong focus:border-primary focus:ring-primary/25",
  );

const Field = ({
  id,
  label,
  error,
  children,
  className,
}: {
  id: string;
  label: string;
  error?: string;
  children: React.ReactNode;
  className?: string;
}) => (
  <div className={cn("flex flex-col gap-1.5", className)}>
    <label htmlFor={id} className="text-sm font-semibold text-ink">
      {label}
    </label>
    {children}
    {error ? (
      <p id={`${id}-error`} className="text-sm text-destructive">
        {error}
      </p>
    ) : null}
  </div>
);

/**
 * The pricing enquiry, as a native form in the site's own design. Entries
 * post to the existing Jotform, so submissions, the autoresponder email and
 * any integrations carry on unchanged.
 */
const InquiryForm = ({ onSent }: { onSent?: () => void }) => {
  const uid = useId();
  const id = (name: string) => `${uid}-${name}`;
  const [values, setValues] = useState<Values>(EMPTY);
  // Ticked by default on request; unticking still blocks the submission.
  const [consent, setConsent] = useState(true);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "failed">("idle");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const prefill: Partial<Values> = {};
    for (const [param, key] of Object.entries(PREFILL)) {
      const value = params.get(param);
      if (value) prefill[key] = value;
    }
    if (Object.keys(prefill).length) setValues((current) => ({ ...current, ...prefill }));
  }, []);

  const update = (key: keyof Values) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setValues((current) => ({ ...current, [key]: value }));
    if (errors[key]) setErrors((current) => ({ ...current, [key]: undefined }));
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const found = validate(values, consent);
    setErrors(found);
    const firstInvalid = Object.keys(found)[0];
    if (firstInvalid) {
      document.getElementById(id(firstInvalid))?.focus();
      return;
    }

    setStatus("sending");
    try {
      await submitToJotform(FORM_ID, {
        [FIELD.firstName]: values.firstName.trim(),
        [FIELD.lastName]: values.lastName.trim(),
        [FIELD.company]: values.company.trim(),
        [FIELD.email]: values.email.trim(),
        [FIELD.phone]: values.phone.trim(),
        [FIELD.consent]: CONSENT_VALUE,
      });
      setStatus("sent");
      onSent?.();
    } catch {
      setStatus("failed");
    }
  };

  if (status === "sent") {
    return (
      <div className="flex flex-col gap-7" role="status">
        <div className="flex items-start gap-4">
          <span className="grid size-11 shrink-0 place-items-center rounded-full bg-primary-soft text-primary">
            <RiCheckLine className="size-6" aria-hidden />
          </span>
          <div className="flex flex-col gap-1">
            <p className="text-title font-display-soft text-ink">Thanks, {values.firstName.trim()}.</p>
            <p className="leading-relaxed text-ink-soft">We have your details and will be in touch shortly.</p>
          </div>
        </div>

        {/* The order of events from the confirmation email, so the numbers
            carry real sequence. */}
        <div className="flex flex-col gap-4 border-t border-line pt-6">
          <p className="text-sm font-semibold text-ink-muted">What happens next</p>
          <ol className="relative flex flex-col gap-4">
            <span aria-hidden="true" className="absolute bottom-3 left-[0.9375rem] top-3 w-px bg-line" />
            {NEXT_STEPS.map((step, index) => (
              <li key={step} className="relative flex items-center gap-4">
                <span className="relative z-10 grid size-8 shrink-0 place-items-center rounded-full border border-primary bg-background font-figure text-xs font-semibold text-primary">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="font-semibold text-ink">{step}</span>
              </li>
            ))}
          </ol>
        </div>

        <div className="flex flex-col gap-4 border-t border-line pt-6">
          <p className="leading-relaxed text-ink-soft">Prefer to pick a time now?</p>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button asChild className="group">
              <CalSchedulingButton>
                Book a call
                <TrailingArrow />
              </CalSchedulingButton>
            </Button>
            <Link
              href="/platform"
              className="group inline-flex min-h-11 items-center justify-center gap-2 px-2 text-sm font-semibold text-primary transition-colors duration-200 hover:text-primary-hover"
            >
              Explore the platform
              <TrailingArrow />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const describedBy = (name: keyof Errors) => (errors[name] ? `${id(name)}-error` : undefined);

  return (
    <form noValidate onSubmit={onSubmit} className="flex flex-col gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id={id("firstName")} label="First name" error={errors.firstName}>
          <input
            id={id("firstName")}
            name="firstName"
            autoComplete="given-name"
            value={values.firstName}
            onChange={update("firstName")}
            aria-invalid={Boolean(errors.firstName)}
            aria-describedby={describedBy("firstName")}
            className={inputClass(Boolean(errors.firstName))}
          />
        </Field>
        <Field id={id("lastName")} label="Last name" error={errors.lastName}>
          <input
            id={id("lastName")}
            name="lastName"
            autoComplete="family-name"
            value={values.lastName}
            onChange={update("lastName")}
            aria-invalid={Boolean(errors.lastName)}
            aria-describedby={describedBy("lastName")}
            className={inputClass(Boolean(errors.lastName))}
          />
        </Field>
      </div>

      <Field id={id("email")} label="Work email" error={errors.email}>
        <input
          id={id("email")}
          name="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          value={values.email}
          onChange={update("email")}
          aria-invalid={Boolean(errors.email)}
          aria-describedby={describedBy("email")}
          className={inputClass(Boolean(errors.email))}
        />
      </Field>

      <Field id={id("company")} label="Company" error={errors.company}>
        <input
          id={id("company")}
          name="company"
          autoComplete="organization"
          value={values.company}
          onChange={update("company")}
          aria-invalid={Boolean(errors.company)}
          aria-describedby={describedBy("company")}
          className={inputClass(Boolean(errors.company))}
        />
      </Field>

      <Field id={id("phone")} label="Phone" error={errors.phone}>
        <input
          id={id("phone")}
          name="phone"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          value={values.phone}
          onChange={update("phone")}
          aria-invalid={Boolean(errors.phone)}
          aria-describedby={describedBy("phone")}
          className={inputClass(Boolean(errors.phone))}
        />
      </Field>

      <div className="flex flex-col gap-1.5">
        <label htmlFor={id("consent")} className="flex cursor-pointer items-start gap-3 text-sm leading-relaxed text-ink-soft">
          <input
            id={id("consent")}
            type="checkbox"
            checked={consent}
            onChange={(event) => {
              setConsent(event.target.checked);
              if (errors.consent) setErrors((current) => ({ ...current, consent: undefined }));
            }}
            aria-invalid={Boolean(errors.consent)}
            aria-describedby={describedBy("consent")}
            className="mt-0.5 size-4 shrink-0 cursor-pointer rounded border-line-strong accent-[hsl(var(--primary))]"
          />
          <span>
            I agree to Research NXT&apos;s{" "}
            <a
              href={POLICY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-primary underline-offset-4 hover:underline"
            >
              Policy T&amp;C
            </a>
          </span>
        </label>
        {errors.consent ? (
          <p id={`${id("consent")}-error`} className="text-sm text-destructive">
            {errors.consent}
          </p>
        ) : null}
      </div>

      {status === "failed" ? (
        <p className="flex items-start gap-2 rounded-md bg-destructive/10 px-3.5 py-3 text-sm text-destructive" role="alert">
          <RiErrorWarningLine className="mt-0.5 size-4 shrink-0" aria-hidden />
          We couldn&apos;t send your details. Please try again in a moment.
        </p>
      ) : null}

      <Button type="submit" size="lg" className="group mt-1 w-full" disabled={status === "sending"}>
        {status === "sending" ? "Sending…" : "Send"}
        {status === "sending" ? null : <TrailingArrow />}
      </Button>
    </form>
  );
};

export default InquiryForm;
