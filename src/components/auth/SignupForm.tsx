"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Building, UserPlus, AlertCircle } from "lucide-react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { registerUser } from "@/actions/auth";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  RegisterFormValues,
  registerSchema,
} from "@/lib/validations/auth";

export interface SignupFormProps {
  onSubmit?: (data: RegisterFormValues) => void | Promise<void>;
  redirectTo?: string;
}

export function SignupForm({ onSubmit, redirectTo = "/services" }: SignupFormProps) {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    mode: "onTouched",
    defaultValues: {
      name: "",
      email: "",
      organization_name: "",
      password: "",
      confirmPassword: "",
      terms: false,
    },
  });

  async function handleSubmit(data: RegisterFormValues) {
    setServerError(null);

    if (onSubmit) {
      await onSubmit(data);
      return;
    }

    try {
      const result = await registerUser(data);
      if (!result.success) {
        setServerError(result.error || "Failed to create account.");
        return;
      }

      router.push(result.redirectUrl || redirectTo);
      router.refresh();
    } catch {
      setServerError("An unexpected error occurred. Please try again.");
    }
  }

  return (
    <div className="relative w-full max-w-md overflow-hidden rounded-[32px] bg-md-surface-container p-6 shadow-lg sm:p-8">
      {/* Atmospheric Material You decoration */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-24 h-56 w-56 rounded-full bg-md-primary/15 blur-3xl"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-28 -left-24 h-64 w-64 rounded-full bg-md-tertiary/10 blur-3xl"
      />

      <div className="relative">
        {/* Header */}
        <div className="mb-6 flex items-center gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-md-secondary-container text-md-on-secondary-container">
            <UserPlus className="h-5 w-5" aria-hidden="true" />
          </div>
          <div>
            <h1 className="md-headline-medium text-2xl font-bold text-md-on-surface">
              Create your account
            </h1>
            <p className="mt-1 text-sm text-md-on-surface-variant">
              Join KnowledgePulse to unify your intelligence.
            </p>
          </div>
        </div>

        {serverError && (
          <div
            role="alert"
            className="mb-5 flex items-center gap-2.5 rounded-2xl border border-rose-200 bg-rose-50/90 p-3.5 text-sm text-rose-800 dark:border-rose-900/50 dark:bg-rose-950/40 dark:text-rose-200"
          >
            <AlertCircle className="h-4 w-4 shrink-0 text-rose-600" />
            <span>{serverError}</span>
          </div>
        )}

        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          noValidate
          className="space-y-4"
        >
          <FieldGroup className="gap-3">
            {/* Full Name */}
            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Full name</FieldLabel>
                  <Input
                    {...field}
                    id={field.name}
                    type="text"
                    placeholder="Alex Morgan"
                    autoComplete="name"
                    aria-invalid={fieldState.invalid}
                    className="h-11 rounded-t-xl rounded-b-none border-0 border-b-2 bg-md-surface-container-low px-4 text-md-on-surface shadow-none transition-all duration-200 focus-visible:ring-2 focus-visible:ring-md-primary focus-visible:ring-offset-2"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            {/* Email */}
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Email address</FieldLabel>
                  <Input
                    {...field}
                    id={field.name}
                    type="email"
                    placeholder="alex@acme.corp"
                    autoComplete="email"
                    aria-invalid={fieldState.invalid}
                    className="h-11 rounded-t-xl rounded-b-none border-0 border-b-2 bg-md-surface-container-low px-4 text-md-on-surface shadow-none transition-all duration-200 focus-visible:ring-2 focus-visible:ring-md-primary focus-visible:ring-offset-2"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            {/* Organization Name */}
            <Controller
              name="organization_name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Organization name</FieldLabel>
                  <div className="relative">
                    <Input
                      {...field}
                      id={field.name}
                      type="text"
                      placeholder="Acme Technologies"
                      autoComplete="organization"
                      aria-invalid={fieldState.invalid}
                      className="h-11 rounded-t-xl rounded-b-none border-0 border-b-2 bg-md-surface-container-low px-4 pr-10 text-md-on-surface shadow-none transition-all duration-200 focus-visible:ring-2 focus-visible:ring-md-primary focus-visible:ring-offset-2"
                    />
                    <Building
                      className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-md-on-surface-variant/50"
                      aria-hidden="true"
                    />
                  </div>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            {/* Password */}
            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                  <div className="relative">
                    <Input
                      {...field}
                      id={field.name}
                      type={showPassword ? "text" : "password"}
                      placeholder="Create a password"
                      autoComplete="new-password"
                      aria-invalid={fieldState.invalid}
                      className="h-11 rounded-t-xl rounded-b-none border-0 border-b-2 bg-md-surface-container-low px-4 pr-12 text-md-on-surface shadow-none transition-all duration-200 focus-visible:ring-2 focus-visible:ring-md-primary focus-visible:ring-offset-2"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((value) => !value)}
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                      className="absolute right-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full text-md-on-surface-variant transition-all duration-200 hover:bg-md-primary/10 hover:text-md-primary active:scale-95 focus-visible:ring-2 focus-visible:ring-md-primary focus-visible:ring-offset-2"
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" aria-hidden="true" />
                      ) : (
                        <Eye className="h-4 w-4" aria-hidden="true" />
                      )}
                    </button>
                  </div>
                  <FieldDescription>
                    Use at least 8 characters.
                  </FieldDescription>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            {/* Confirm Password */}
            <Controller
              name="confirmPassword"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>
                    Confirm password
                  </FieldLabel>
                  <div className="relative">
                    <Input
                      {...field}
                      id={field.name}
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Repeat your password"
                      autoComplete="new-password"
                      aria-invalid={fieldState.invalid}
                      className="h-11 rounded-t-xl rounded-b-none border-0 border-b-2 bg-md-surface-container-low px-4 pr-12 text-md-on-surface shadow-none transition-all duration-200 focus-visible:ring-2 focus-visible:ring-md-primary focus-visible:ring-offset-2"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword((value) => !value)
                      }
                      aria-label={
                        showConfirmPassword
                          ? "Hide password"
                          : "Show password"
                      }
                      className="absolute right-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full text-md-on-surface-variant transition-all duration-200 hover:bg-md-primary/10 hover:text-md-primary active:scale-95 focus-visible:ring-2 focus-visible:ring-md-primary focus-visible:ring-offset-2"
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-4 w-4" aria-hidden="true" />
                      ) : (
                        <Eye className="h-4 w-4" aria-hidden="true" />
                      )}
                    </button>
                  </div>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            {/* Terms */}
            <Controller
              name="terms"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field
                  orientation="horizontal"
                  data-invalid={fieldState.invalid}
                  className="items-start gap-3 pt-1"
                >
                  <Checkbox
                    id={field.name}
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    aria-invalid={fieldState.invalid}
                    className="mt-0.5"
                  />
                  <div className="space-y-1">
                    <FieldLabel
                      htmlFor={field.name}
                      className="font-normal text-sm leading-5 text-md-on-surface-variant cursor-pointer"
                    >
                      I agree to the terms of service and privacy policy
                    </FieldLabel>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </div>
                </Field>
              )}
            />
          </FieldGroup>

          {/* Submit */}
          <Button
            type="submit"
            disabled={form.formState.isSubmitting}
            className="mt-2 h-12 w-full rounded-full bg-md-primary px-6 text-md-on-primary shadow-sm transition-all duration-300 ease-[cubic-bezier(0.2,0,0,1)] hover:bg-md-primary/90 hover:shadow-md active:scale-95 focus-visible:ring-2 focus-visible:ring-md-primary focus-visible:ring-offset-2"
          >
            {form.formState.isSubmitting
              ? "Creating account..."
              : "Create account"}
          </Button>

          <p className="pt-2 text-center text-sm text-md-on-surface-variant">
            Already have an account?{" "}
            <Link
              href="/login"
              className="rounded-full px-1 font-semibold text-md-primary underline-offset-4 transition-colors duration-200 hover:bg-md-primary/10 hover:underline focus-visible:ring-2 focus-visible:ring-md-primary focus-visible:ring-offset-2"
            >
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
