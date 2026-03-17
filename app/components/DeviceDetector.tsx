"use client";

import { useState, useEffect } from "react";

interface DeviceDetectorProps {
  children: React.ReactNode;
}

export function DeviceDetector({ children }: DeviceDetectorProps) {
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [isPortrait, setIsPortrait] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const isTablet = () => {
      const userAgent = navigator.userAgent.toLowerCase();
      return /ipad|tablet|(android(?!.*mobile))|kindle|silk/i.test(userAgent);
    };

    const checkDevice = () => {
      const userAgent = navigator.userAgent.toLowerCase();
      const isMobileDevice = /android|webos|iphone|ipod|blackberry|iemobile|opera mini/i.test(userAgent);
      const isTabletDevice = /ipad|tablet|(android(?!.*mobile))|kindle|silk/i.test(userAgent);
      const isSmallScreen = window.innerWidth < 768;
      const isPortraitMode = window.innerHeight > window.innerWidth;
      
      setIsMobile(isMobileDevice || (isSmallScreen && !isTabletDevice));
      setIsTablet(isTabletDevice);
      setIsPortrait(isPortraitMode && isTabletDevice);
      setIsLoaded(true);
    };

    checkDevice();
    window.addEventListener("resize", checkDevice);
    return () => window.removeEventListener("resize", checkDevice);
  }, []);

  if (!isLoaded) {
    return (
      <div className="flex min-h-screen w-full bg-[#050507] items-center justify-center">
        <style>{`
          @keyframes spin-slow { to { transform: rotate(360deg); } }
          .loader-ring {
            width: 48px; height: 48px;
            border-radius: 50%;
            border: 1.5px solid transparent;
            border-top-color: #a78bfa;
            border-right-color: #a78bfa33;
            animation: spin-slow 1s linear infinite;
          }
        `}</style>
        <div className="loader-ring" />
      </div>
    );
  }

  // Show iPad rotation message if on tablet in portrait mode
  if (isTablet && isPortrait) {
    return (
      <>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&family=DM+Sans:wght@300;400;500&display=swap');

          .rotate-root {
            position: relative;
            min-height: 100svh;
            width: 100%;
            background: #050507;
            overflow: hidden;
            font-family: 'DM Sans', sans-serif;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          /* Atmospheric orbs */
          .rotate-orb {
            position: absolute;
            border-radius: 50%;
            filter: blur(80px);
            pointer-events: none;
          }
          .rotate-orb-1 {
            width: 400px; height: 400px;
            top: -150px; left: 50%;
            transform: translateX(-50%);
            background: radial-gradient(circle, rgba(109,40,217,0.25) 0%, transparent 70%);
          }
          .rotate-orb-2 {
            width: 250px; height: 250px;
            bottom: -60px; right: -50px;
            background: radial-gradient(circle, rgba(139,92,246,0.15) 0%, transparent 70%);
          }

          /* Noise grain overlay */
          .rotate-grain {
            position: absolute;
            inset: 0;
            opacity: 0.035;
            background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
            background-size: 200px;
            pointer-events: none;
          }

          /* Grid lines */
          .rotate-grid {
            position: absolute;
            inset: 0;
            background-image:
              linear-gradient(rgba(139,92,246,0.04) 1px, transparent 1px),
              linear-gradient(90deg, rgba(139,92,246,0.04) 1px, transparent 1px);
            background-size: 48px 48px;
            pointer-events: none;
          }

          .rotate-content {
            position: relative;
            z-index: 10;
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 48px 28px;
            max-width: 400px;
            width: 100%;
            text-align: center;
          }

          /* Rotate icon container */
          .rotate-icon-wrap {
            position: relative;
            width: 80px;
            height: 80px;
            margin-bottom: 32px;
            animation: rotate-device 3s ease-in-out infinite;
          }
          @keyframes rotate-device {
            0%, 100% { transform: rotate(0deg); }
            25% { transform: rotate(-15deg); }
            75% { transform: rotate(15deg); }
          }
          .rotate-icon-bg {
            width: 100%; height: 100%;
            border-radius: 16px;
            background: rgba(139,92,246,0.1);
            border: 1px solid rgba(139,92,246,0.2);
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 32px;
          }

          /* Eyebrow tag */
          .rotate-eyebrow {
            display: inline-flex;
            align-items: center;
            gap: 6px;
            font-size: 10px;
            font-weight: 500;
            letter-spacing: 0.15em;
            text-transform: uppercase;
            color: #7c3aed;
            background: rgba(109,40,217,0.12);
            border: 1px solid rgba(109,40,217,0.25);
            border-radius: 100px;
            padding: 5px 14px;
            margin-bottom: 24px;
          }

          /* Headline */
          .rotate-headline {
            font-family: 'Syne', sans-serif;
            font-size: clamp(24px, 6vw, 32px);
            font-weight: 800;
            color: #f5f3ff;
            line-height: 1.1;
            letter-spacing: -0.02em;
            margin-bottom: 16px;
          }
          .rotate-headline span {
            background: linear-gradient(135deg, #a78bfa, #7c3aed);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
          }

          /* Body copy */
          .rotate-body {
            font-size: 14px;
            font-weight: 300;
            color: rgba(196,181,253,0.6);
            line-height: 1.75;
            margin-bottom: 32px;
            max-width: 280px;
          }

          /* Rotate instruction */
          .rotate-instruction {
            display: flex;
            align-items: center;
            gap: 12px;
            padding: 16px 20px;
            border-radius: 12px;
            background: rgba(139,92,246,0.06);
            border: 1px solid rgba(139,92,246,0.12);
            margin-bottom: 24px;
          }
          .rotate-arrow {
            font-size: 24px;
            color: #a78bfa;
            animation: rotate-arrow 2s ease-in-out infinite;
          }
          @keyframes rotate-arrow {
            0%, 100% { transform: rotate(0deg); }
            50% { transform: rotate(90deg); }
          }
          .rotate-text {
            font-size: 13px;
            font-weight: 500;
            color: #ddd6fe;
          }

          /* Fade-in entrance */
          @keyframes fade-up {
            from { opacity: 0; transform: translateY(16px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .rotate-content > * {
            animation: fade-up 0.5s ease both;
          }
          .rotate-content > *:nth-child(1) { animation-delay: 0.05s; }
          .rotate-content > *:nth-child(2) { animation-delay: 0.12s; }
          .rotate-content > *:nth-child(3) { animation-delay: 0.19s; }
          .rotate-content > *:nth-child(4) { animation-delay: 0.26s; }
        `}</style>

        <div className="rotate-root">
          <div className="rotate-orb rotate-orb-1" />
          <div className="rotate-orb rotate-orb-2" />
          <div className="rotate-grain" />
          <div className="rotate-grid" />

          <div className="rotate-content">
            {/* Animated rotate icon */}
            <div className="rotate-icon-wrap">
              <div className="rotate-icon-bg">📱</div>
            </div>

            {/* Eyebrow */}
            <div className="rotate-eyebrow">Rotate your device</div>

            {/* Headline */}
            <h1 className="rotate-headline">
              For the best<br /><span>experience</span>
            </h1>

            {/* Body */}
            <p className="rotate-body">
              This site is optimized for landscape viewing. Please rotate your iPad to continue.
            </p>

            {/* Rotate instruction */}
            <div className="rotate-instruction">
              <div className="rotate-arrow">🔄</div>
              <div className="rotate-text">Rotate to landscape</div>
            </div>
          </div>
        </div>

        {/* Blurred background */}
        <div style={{ position: "fixed", inset: 0, filter: "blur(40px)", opacity: 0.15, transform: "scale(1.05)", zIndex: 0, pointerEvents: "none" }}>
          {children}
        </div>
      </>
    );
  }

  if (isMobile) {
    return (
      <>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&family=DM+Sans:wght@300;400;500&display=swap');

          .dd-root {
            position: relative;
            min-height: 100svh;
            width: 100%;
            background: #050507;
            overflow: hidden;
            font-family: 'DM Sans', sans-serif;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          /* Atmospheric orbs */
          .dd-orb {
            position: absolute;
            border-radius: 50%;
            filter: blur(80px);
            pointer-events: none;
          }
          .dd-orb-1 {
            width: 500px; height: 500px;
            top: -180px; left: 50%;
            transform: translateX(-50%);
            background: radial-gradient(circle, rgba(109,40,217,0.25) 0%, transparent 70%);
          }
          .dd-orb-2 {
            width: 300px; height: 300px;
            bottom: -80px; left: -60px;
            background: radial-gradient(circle, rgba(139,92,246,0.15) 0%, transparent 70%);
          }
          .dd-orb-3 {
            width: 200px; height: 200px;
            bottom: 60px; right: -40px;
            background: radial-gradient(circle, rgba(167,139,250,0.1) 0%, transparent 70%);
          }

          /* Noise grain overlay */
          .dd-grain {
            position: absolute;
            inset: 0;
            opacity: 0.035;
            background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
            background-size: 200px;
            pointer-events: none;
          }

          /* Grid lines */
          .dd-grid {
            position: absolute;
            inset: 0;
            background-image:
              linear-gradient(rgba(139,92,246,0.04) 1px, transparent 1px),
              linear-gradient(90deg, rgba(139,92,246,0.04) 1px, transparent 1px);
            background-size: 48px 48px;
            pointer-events: none;
          }

          .dd-content {
            position: relative;
            z-index: 10;
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 48px 28px;
            max-width: 400px;
            width: 100%;
            text-align: center;
          }

          /* Monitor icon container */
          .dd-icon-wrap {
            position: relative;
            width: 88px;
            height: 88px;
            margin-bottom: 36px;
          }
          .dd-icon-ring {
            position: absolute;
            inset: 0;
            border-radius: 50%;
            border: 1px solid rgba(139,92,246,0.3);
            animation: pulse-ring 3s ease-in-out infinite;
          }
          .dd-icon-ring-2 {
            position: absolute;
            inset: -12px;
            border-radius: 50%;
            border: 1px solid rgba(139,92,246,0.12);
            animation: pulse-ring 3s ease-in-out infinite 0.6s;
          }
          @keyframes pulse-ring {
            0%, 100% { opacity: 1; transform: scale(1); }
            50% { opacity: 0.4; transform: scale(1.05); }
          }
          .dd-icon-bg {
            position: absolute;
            inset: 0;
            border-radius: 50%;
            background: radial-gradient(circle at 40% 35%, rgba(139,92,246,0.2), rgba(109,40,217,0.08));
            border: 1px solid rgba(139,92,246,0.25);
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .dd-icon-bg svg {
            width: 38px;
            height: 38px;
            color: #a78bfa;
            stroke-width: 1.25;
          }

          /* Eyebrow tag */
          .dd-eyebrow {
            display: inline-flex;
            align-items: center;
            gap: 6px;
            font-size: 10px;
            font-weight: 500;
            letter-spacing: 0.15em;
            text-transform: uppercase;
            color: #7c3aed;
            background: rgba(109,40,217,0.12);
            border: 1px solid rgba(109,40,217,0.25);
            border-radius: 100px;
            padding: 5px 14px;
            margin-bottom: 24px;
          }
          .dd-eyebrow::before {
            content: '';
            width: 5px; height: 5px;
            border-radius: 50%;
            background: #7c3aed;
            box-shadow: 0 0 6px #7c3aed;
          }

          /* Headline */
          .dd-headline {
            font-family: 'Syne', sans-serif;
            font-size: clamp(28px, 8vw, 36px);
            font-weight: 800;
            color: #f5f3ff;
            line-height: 1.1;
            letter-spacing: -0.02em;
            margin-bottom: 16px;
          }
          .dd-headline span {
            background: linear-gradient(135deg, #a78bfa, #7c3aed);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
          }

          /* Body copy */
          .dd-body {
            font-size: 14px;
            font-weight: 300;
            color: rgba(196,181,253,0.6);
            line-height: 1.75;
            margin-bottom: 40px;
            max-width: 300px;
          }

          /* Divider */
          .dd-divider {
            width: 100%;
            height: 1px;
            background: linear-gradient(90deg, transparent, rgba(139,92,246,0.3), transparent);
            margin-bottom: 32px;
          }

          /* Feature list */
          .dd-features {
            width: 100%;
            display: flex;
            flex-direction: column;
            gap: 2px;
            margin-bottom: 36px;
          }
          .dd-feature {
            display: flex;
            align-items: center;
            gap: 14px;
            padding: 14px 16px;
            border-radius: 10px;
            background: rgba(139,92,246,0.04);
            border: 1px solid rgba(139,92,246,0.08);
            transition: border-color 0.2s;
          }
          .dd-feature:hover { border-color: rgba(139,92,246,0.2); }
          .dd-feature-icon {
            width: 32px; height: 32px;
            border-radius: 8px;
            background: rgba(109,40,217,0.15);
            border: 1px solid rgba(139,92,246,0.2);
            display: flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
            font-size: 14px;
          }
          .dd-feature-text {
            text-align: left;
          }
          .dd-feature-title {
            font-size: 13px;
            font-weight: 500;
            color: #ddd6fe;
            margin-bottom: 2px;
          }
          .dd-feature-desc {
            font-size: 11.5px;
            color: rgba(167,139,250,0.45);
            font-weight: 300;
          }

          /* CTA button */
          .dd-btn {
            width: 100%;
            padding: 15px 24px;
            border-radius: 12px;
            border: none;
            cursor: pointer;
            font-family: 'DM Sans', sans-serif;
            font-size: 13.5px;
            font-weight: 500;
            letter-spacing: 0.01em;
            position: relative;
            overflow: hidden;
            background: linear-gradient(135deg, #7c3aed, #6d28d9);
            color: #ede9fe;
            box-shadow: 0 0 0 1px rgba(139,92,246,0.4), 0 8px 24px rgba(109,40,217,0.3);
            transition: transform 0.15s, box-shadow 0.15s;
          }
          .dd-btn:active {
            transform: scale(0.98);
            box-shadow: 0 0 0 1px rgba(139,92,246,0.4), 0 4px 12px rgba(109,40,217,0.2);
          }
          .dd-btn::after {
            content: '';
            position: absolute;
            top: 0; left: -100%;
            width: 60%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent);
            animation: shimmer 3s ease-in-out infinite 1s;
          }
          @keyframes shimmer {
            0% { left: -100%; }
            100% { left: 200%; }
          }

          /* Fade-in entrance */
          @keyframes fade-up {
            from { opacity: 0; transform: translateY(16px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .dd-content > * {
            animation: fade-up 0.5s ease both;
          }
          .dd-content > *:nth-child(1) { animation-delay: 0.05s; }
          .dd-content > *:nth-child(2) { animation-delay: 0.12s; }
          .dd-content > *:nth-child(3) { animation-delay: 0.19s; }
          .dd-content > *:nth-child(4) { animation-delay: 0.26s; }
          .dd-content > *:nth-child(5) { animation-delay: 0.33s; }
          .dd-content > *:nth-child(6) { animation-delay: 0.40s; }
          .dd-content > *:nth-child(7) { animation-delay: 0.47s; }
        `}</style>

        <div className="dd-root">
          <div className="dd-orb dd-orb-1" />
          <div className="dd-orb dd-orb-2" />
          <div className="dd-orb dd-orb-3" />
          <div className="dd-grain" />
          <div className="dd-grid" />

          <div className="dd-content">
            {/* Animated monitor icon */}
            <div className="dd-icon-wrap">
              <div className="dd-icon-ring" />
              <div className="dd-icon-ring-2" />
              <div className="dd-icon-bg">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round"
                    d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
            </div>

            {/* Eyebrow */}
            <div className="dd-eyebrow">Desktop only</div>

            {/* Headline */}
            <h1 className="dd-headline">
              Built for<br /><span>bigger screens</span>
            </h1>

            {/* Body */}
            <p className="dd-body">
              This experience is crafted for desktop and tablet. Grab your laptop for full access.
            </p>

            <div className="dd-divider" />

            {/* Features */}
            <div className="dd-features">
              {[
                { icon: "⚡", title: "Full feature access", desc: "Every tool, every workflow" },
                { icon: "🎮", title: "Precision controls", desc: "Optimized for mouse & keyboard" },
                { icon: "🖥️", title: "Expansive canvas", desc: "Designed for wide viewports" },
              ].map(({ icon, title, desc }) => (
                <div className="dd-feature" key={title}>
                  <div className="dd-feature-icon">{icon}</div>
                  <div className="dd-feature-text">
                    <div className="dd-feature-title">{title}</div>
                    <div className="dd-feature-desc">{desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Blurred background */}
        <div style={{ position: "fixed", inset: 0, filter: "blur(40px)", opacity: 0.15, transform: "scale(1.05)", zIndex: 0, pointerEvents: "none" }}>
          {children}
        </div>
      </>
    );
  }

  return <>{children}</>;
}