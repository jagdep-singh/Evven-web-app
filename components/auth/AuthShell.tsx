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

  return (
    <div className="min-h-[100svh] overflow-x-hidden bg-background">
      <div className="relative min-h-[100svh] md:hidden">
        <div className="pointer-events-none absolute -left-24 top-10 h-56 w-56 rounded-full bg-primary/10 blur-3xl" />
        <div className="pointer-events-none absolute -right-20 top-64 h-64 w-64 rounded-full bg-amber-400/[0.06] blur-3xl" />

        <div className="relative flex min-h-[100svh] flex-col">
          <div className="flex items-center justify-between px-5 pt-6">
            <Link href="/" className="inline-flex items-center">
              <Image
                src="/EvenUp-white.svg"
                alt="EvenUp"
                width={40}
                height={40}
                className="invert"
                priority
              />
            </Link>
          </div>

          <div className="flex flex-1 items-center justify-center px-4 py-8">
            <div className="w-full max-w-md">{children}</div>
          </div>
        </div>
      </div>

      {/* ---------------------------------------------------------------- */}
      {/* Desktop: two-pane layout with the character animation as the     */}
      {/* signature element. Unchanged in structure, lightly tightened.    */}
      {/* ---------------------------------------------------------------- */}
      <div className="relative hidden min-h-[100svh] md:flex md:overflow-y-auto">
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
        <div className="relative flex w-1/2 items-center justify-center overflow-y-auto overflow-x-hidden px-6 py-10">
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
        <div className="relative flex w-1/2 items-center justify-center overflow-y-auto overflow-x-hidden px-6 py-10">
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