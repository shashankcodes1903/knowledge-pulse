"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, LogIn, AlertCircle } from "lucide-react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { loginUser } from "@/actions/auth";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { LoginFormValues, loginSchema } from "@/lib/validations/auth";

export interface LoginFormProps {
  onSubmit?: (data: LoginFormValues) => void | Promise<void>;
  redirectTo?: string;
}

export function LoginForm({ onSubmit, redirectTo }: LoginFormProps) {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    mode: "onTouched",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function handleSubmit(data: LoginFormValues) {
    setServerError(null);

    if (onSubmit) {
      await onSubmit(data);
      return;
    }

    try {
      const result = await loginUser(data);
      if (!result.success) {
        setServerError(result.error || "Invalid email or password.");
        return;
      }

      router.push(redirectTo || result.redirectUrl || "/services");
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
            <LogIn className="h-5 w-5" aria-hidden="true" />
          </div>
          <div>
            <h1 className="md-headline-medium text-2xl font-bold text-md-on-surface">
              Welcome back
            </h1>
            <p className="mt-1 text-sm text-md-on-surface-variant">
              Sign in to manage your knowledge intelligence.
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
          className="space-y-5"
        >
          <FieldGroup className="gap-4">
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
                      placeholder="Your password"
                      autoComplete="current-password"
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
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
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
            {form.formState.isSubmitting ? "Signing in..." : "Sign in"}
          </Button>

          <p className="pt-2 text-center text-sm text-md-on-surface-variant">
            Don&apos;t have an account?{" "}
            <Link
              href="/register"
              className="rounded-full px-1 font-semibold text-md-primary underline-offset-4 transition-colors duration-200 hover:bg-md-primary/10 hover:underline focus-visible:ring-2 focus-visible:ring-md-primary focus-visible:ring-offset-2"
            >
              Create account
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
