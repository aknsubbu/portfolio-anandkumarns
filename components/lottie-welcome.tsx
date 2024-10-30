"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Lottie from "lottie-react";
import desktopAnimationData from "@/public/desktop-animation.json";
import mobileAnimationData from "@/public/mobile-animation.json";

const MOBILE_BREAKPOINT = 480;

export default function Welcome() {
  const router = useRouter();
  const [animationComplete, setAnimationComplete] = useState(false);
  const [screenSize, setScreenSize] = useState("desktop");

  useEffect(() => {
    const checkScreenSize = () => {
      if (window.innerWidth < MOBILE_BREAKPOINT) {
        setScreenSize("mobile");
      } else {
        setScreenSize("desktop");
      }
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  useEffect(() => {
    if (animationComplete) {
      document.cookie = "welcome_shown=true; path=/";
      router.push("/");
    }
  }, [animationComplete, router]);

  const getAnimationData = () => {
    switch (screenSize) {
      case "mobile":
        return mobileAnimationData;
      default:
        return desktopAnimationData;
    }
  };

  return (
    <div style={{ width: "100vw", height: "100vh", overflow: "hidden" }}>
      <Lottie
        animationData={getAnimationData()}
        loop={false}
        onComplete={() => setAnimationComplete(true)}
        style={{ width: "100%", height: "100%", objectFit: "contain" }}
      />
    </div>
  );
}
