"use client";

import Grainient from "@/components/ui/Grainient";

export function Hero() {
  return (
    <section className="relative w-screen h-[120vh] overflow-hidden bg-background">
      {/* Background Grid Distortion */}
      <div className="absolute inset-0 flex h-[120vh] w-full items-center justify-center">
        <Grainient
            color1="#325149"
            color2="#faf8f5"
            color3="#8b8480"
            timeSpeed={1.2}
            colorBalance={-0.07}
            warpStrength={0.3}
            warpFrequency={3.7}
            warpSpeed={1.4}
            warpAmplitude={50}
            blendAngle={29}
            blendSoftness={0.64}
            rotationAmount={580}
            noiseScale={1.65}
            grainAmount={0.06}
            grainScale={5}
            grainAnimated={false}
            contrast={1.35}
            gamma={0.95}
            saturation={1.3}
            centerX={0}
            centerY={0}
            zoom={0.9}
          />
      </div>


      <div className="relative z-10 flex flex-col h-[100vh] w-full items-center justify-center px-6 pointer-events-none -translate-y-8">
      {/* Add your hero content here */}
        <h1 className="text-3xl text-slate-800">this is the content for now <br /> there will be some actual content here . 😭</h1>
      </div>

      {/* Bottom blur gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-[20vh] bg-gradient-to-b from-transparent to-[#faf8f5] z-20" />
    </section>
  );
}
