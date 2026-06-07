"use client";

import Image from "next/image";
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
    <div className="h-screen overflow-hidden bg-background">
      <div className="relative flex h-full">

        <div className="fixed top-6 left-8 z-50">
          <Image
            src="/EvenUp-white.svg"
            alt="EvenUp"
            width={70}
            height={70}
            className="invert"
            priority
          />
        </div>

        {/* LEFT SLOT */}
        <div className="relative w-1/2 flex items-center justify-center overflow-hidden">
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
                className="w-full flex justify-center"
              >
                {children}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* RIGHT SLOT */}
        <div className="relative w-1/2 flex items-center justify-center overflow-hidden">
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
                className="w-full flex justify-center"
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
            h-full
            w-1/2
            bg-background
            overflow-hidden
            flex
            flex-col
            justify-between
            p-12
            z-20
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