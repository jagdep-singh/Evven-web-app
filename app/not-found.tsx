"use client";

import dynamic from "next/dynamic";
import Link from "next/link";

const Spline = dynamic(() => import("@splinetool/react-spline"), {
  ssr: false,
});

export default function NotFound() {
  return (
    <main className="relative h-screen w-full overflow-hidden bg-black">
      <div className="absolute inset-0 z-20">
        <Spline scene="https://draft.spline.design/YMje93xuF-2o-b0C/scene.splinecode" />
      </div>
    </main>
  );
}