"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { CharacterAnimation } from "@/components/characters/CharacterAnimation";

export function AuthShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const isLogin = pathname === "/login";
  const mobileTitle = isLogin ? "Welcome back" : "Create your account";

  return (
    <div className="min-h-[100svh] overflow-x-hidden bg-background">
      <div className="md:hidden">
        <div className="flex items-center justify-between px-5 pb-4 pt-4">
          <Link href="/" className="inline-flex items-center">
            <Image
              src="/EvenUp-white.svg"
              alt="EvenUp"
              width={66}
              height={66}
              className="invert"
              priority
            />
          </Link>
        </div>

        <div className="flex min-h-[calc(100svh-88px)] items-start px-4 pb-6">
          <div className="w-full">
            <div className="mx-auto w-full max-w-md">
              <div className="card mb-4 rounded-[2rem] bg-card/40 px-5 py-4 shadow-lg backdrop-blur-xl">
                <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-muted-foreground">
                  {mobileTitle}
                </p>
                <p className="mt-2 text-sm leading-6 text-foreground/80">
                  {isLogin
                    ? "Sign in to keep your balances in sync."
                    : "Set up your account in a couple of steps."}
                </p>
              </div>

              <div className="mx-auto w-full">{children}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative hidden min-h-[100svh] md:flex">
        <div className="fixed left-8 top-6 z-50">
          <Link href="/">
            <Image
              src="/EvenUp-white.svg"
              alt="EvenUp"
              width={70}
              height={70}
              className="invert"
              priority
            />
          </Link>
        </div>

        {/* LEFT SLOT */}
        <div className="relative flex w-1/2 items-center justify-center overflow-hidden">
          <AnimatePresence mode="wait">
            {!isLogin && (
              <motion.div
                key="signup"
                initial={{ x: -200, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -200, opacity: 0 }}
                transition={{
                  duration: 0.7,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="flex w-full justify-center"
              >
                {children}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* RIGHT SLOT */}
        <div className="relative flex w-1/2 items-center justify-center overflow-hidden">
          <AnimatePresence mode="wait">
            {isLogin && (
              <motion.div
                key="login"
                initial={{ x: 200, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 200, opacity: 0 }}
                transition={{
                  duration: 0.7,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="flex w-full justify-center"
              >
                {children}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ANIMATION PANEL */}
        <motion.div
          animate={{
            left: isLogin ? "0%" : "50%",
          }}
          transition={{
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="
            absolute
            top-0
            z-20
            flex
            h-full
            w-1/2
            flex-col
            justify-between
            overflow-hidden
            bg-background
            p-12
          "
        >
          <div className="flex-1 flex items-center justify-center">
            <CharacterAnimation
              isEmailFocused={false}
              isPasswordFocused={false}
              password=""
              showPassword={false}
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
