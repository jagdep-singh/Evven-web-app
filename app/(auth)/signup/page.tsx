"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

import { useAuthStore } from "@/store/auth-store";
import { GoogleSignInButton } from "@/components/auth/GoogleSignInButton";

export default function Register() {
  const router = useRouter();
  const signup = useAuthStore((state) => state.signup);

  const [name, setName]               = useState("");
  const [email, setEmail]             = useState("");
  const [password, setPassword]       = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError]             = useState("");
  const [isLoading, setIsLoading]     = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    try {
      await signup(name, email, password);
      router.push("/dashboard");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
      <div className="relative flex w-full items-center justify-center bg-background p-4 lg:p-8">
        <div className="relative isolate w-full max-w-[420px] px-4 sm:px-0 lg:max-w-[400px] animate-in fade-in slide-in-from-bottom-4 duration-500">

          <div className="absolute -inset-4 -z-10 rounded-4xl bg-gradient-to-br from-primary/10 via-primary/5 to-transparent blur-2xl opacity-60 lg:-inset-6" />

          <div className="card rounded-[2rem] bg-card/70 p-6 shadow-xl ring-1 ring-white/10 backdrop-blur-xl sm:p-8">

            <div className="mb-8 text-center">
              <h1 className="mb-2 text-2xl font-bold tracking-tight sm:text-3xl">Create an account</h1>
              <p className="text-sm text-muted-foreground">Join us and get started today</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-medium">Full Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Your name"
                  value={name}
                  autoComplete="off"
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="h-12 bg-background/50 border-border/60 focus:border-primary focus:bg-background transition-all duration-200"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  autoComplete="off"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="h-12 bg-background/50 border-border/60 focus:border-primary focus:bg-background transition-all duration-200"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="h-12 pr-10 bg-background/50 border-border/60 focus:border-primary focus:bg-background transition-all duration-200"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPassword ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
                  </button>
                </div>
              </div>

              {error && (
                <div className="p-3 text-sm text-red-400 bg-red-950/20 border border-red-900/30 rounded-lg animate-in fade-in duration-200">
                  {error}
                </div>
              )}

              <Button
                type="submit"
                className="w-full h-12 text-base font-medium"
                size="lg"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <span className="inline-block size-4 rounded-full border-2 border-primary-foreground border-r-transparent animate-spin" />
                    Creating account…
                  </span>
                ) : "Sign up"}
              </Button>
            </form>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border/40" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span
                  className="card bg-card/60 px-4 text-muted-foreground border-none shadow-none"
                  style={{ border: "none", boxShadow: "none" }}
                >
                  Or continue with
                </span>
              </div>
            </div>

            <GoogleSignInButton />

            <div className="text-center text-sm text-muted-foreground mt-8">
              Already have an account?{" "}
              <Link href="/login" className="text-primary font-semibold hover:text-primary/80 transition-colors">
                Log in
              </Link>
            </div>
          </div>
        </div>
      </div>
  );
}
