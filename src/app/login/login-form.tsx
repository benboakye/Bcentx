"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/Button";

type Mode = "signin" | "signup";

export function LoginForm({ nextPath }: { nextPath: string }) {
  const router = useRouter();
  const [mode, setMode] = useState<Mode>("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);

    try {
      const supabase = createClient();

      if (mode === "signin") {
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (signInError) {
          setError(signInError.message);
          return;
        }
        router.replace(nextPath);
        router.refresh();
        return;
      }

      const { error: signUpError } = await supabase.auth.signUp({
        email,
        password,
      });
      if (signUpError) {
        setError(signUpError.message);
        return;
      }

      setMessage(
        "Account created. If email confirmation is enabled, check your inbox. Then ask an owner to grant staff access before using Admin.",
      );
      setMode("signin");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <label htmlFor="email" className="mb-1 block text-sm font-medium text-bcentx-blue">
          Email
        </label>
        <input
          id="email"
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-md border border-bcentx-blue/20 bg-white px-3 py-2 text-sm text-foreground outline-none ring-bcentx-green focus:ring-2"
        />
      </div>
      <div>
        <label htmlFor="password" className="mb-1 block text-sm font-medium text-bcentx-blue">
          Password
        </label>
        <div className="relative">
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            autoComplete={mode === "signin" ? "current-password" : "new-password"}
            required
            minLength={8}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-md border border-bcentx-blue/20 bg-white px-3 py-2 pr-10 text-sm text-foreground outline-none ring-bcentx-green focus:ring-2"
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute inset-y-0 right-0 flex items-center px-3 text-bcentx-gray hover:text-bcentx-blue"
            aria-label={showPassword ? "Hide password" : "Show password"}
            aria-pressed={showPassword}
          >
            {showPassword ? <EyeOffIcon /> : <EyeIcon />}
          </button>
        </div>
      </div>

      {error ? (
        <p className="rounded-md bg-risk-red-soft px-3 py-2 text-sm text-risk-red" role="alert">
          {error}
        </p>
      ) : null}
      {message ? (
        <p className="rounded-md bg-bcentx-green-soft px-3 py-2 text-sm text-bcentx-green-dark">
          {message}
        </p>
      ) : null}

      <Button type="submit" variant="primary" className="w-full" disabled={loading}>
        {loading ? "Please wait…" : mode === "signin" ? "Sign in" : "Create account"}
      </Button>

      <p className="text-center text-sm text-bcentx-gray">
        {mode === "signin" ? (
          <>
            Need an account?{" "}
            <button
              type="button"
              className="font-semibold text-bcentx-green hover:text-bcentx-green-dark"
              onClick={() => {
                setMode("signup");
                setError(null);
                setMessage(null);
              }}
            >
              Sign up
            </button>
          </>
        ) : (
          <>
            Already registered?{" "}
            <button
              type="button"
              className="font-semibold text-bcentx-green hover:text-bcentx-green-dark"
              onClick={() => {
                setMode("signin");
                setError(null);
                setMessage(null);
              }}
            >
              Sign in
            </button>
          </>
        )}
      </p>
    </form>
  );
}

function EyeIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4"
      aria-hidden="true"
    >
      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function EyeOffIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4"
      aria-hidden="true"
    >
      <path d="M10.7 5.1A10.5 10.5 0 0 1 12 5c6.5 0 10 7 10 7a18.4 18.4 0 0 1-2.2 3.1" />
      <path d="M6.6 6.6C3.9 8.4 2 12 2 12s3.5 7 10 7a9.7 9.7 0 0 0 4.4-1" />
      <path d="M14 14.1A3 3 0 0 1 9.9 10" />
      <path d="M2 2l20 20" />
    </svg>
  );
}
