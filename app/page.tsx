// Client-side component for the home/landing page
"use client";

// Import icon components from lucide-react library
import {
  Play,
  BookOpen,
  Code,
  Gamepad2,
  CheckCircle,
  ArrowRight,
  Sparkles,
  Target,
  Rocket,
  Shield,
  Clock,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

// Main home page component
export default function Home() {
  // State for tracking which lesson is currently selected in the demo
  const [activeLesson, setActiveLesson] = useState(0);
  // State for controlling mobile navigation menu visibility
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  // Router for navigation between pages
  const router = useRouter();

  // Array of sample lessons for the interactive demo
  const lessons = [
    {
      title: "Player Movement",
      subtitle: "Learn 2D controls",
      level: "Beginner",
      levelColor: "bg-emerald-500/20 text-emerald-400",
    },
    {
      title: "Enemy AI",
      subtitle: "Smart opponents",
      level: "Intermediate",
      levelColor: "bg-amber-500/20 text-amber-400",
    },
    {
      title: "Multiplayer Mode",
      subtitle: "Real networking",
      level: "Advanced",
      levelColor: "bg-rose-500/20 text-rose-400",
    },
  ];

  // Array of 12-week course roadmap phases with learning outcomes
  const roadmapPhases = [
    {
      weeks: "Weeks 1-3",
      title: "Foundation",
      subtitle: "Master the fundamentals",
      gradient: "from-blue-500 to-cyan-400",
      items: [
        "C# Basics & Syntax",
        "Unity Interface Mastery",
        "2D Game Mechanics",
        "Ship Your First Playable Game",
      ],
    },
    {
      weeks: "Weeks 4-6",
      title: "Building",
      subtitle: "Start real projects",
      gradient: "from-purple-500 to-pink-500",
      items: [
        "3D Environments & Lighting",
        "Character Controllers",
        "Physics & Collision Systems",
        "Complete Mobile Game",
      ],
    },
    {
      weeks: "Weeks 7-9",
      title: "Advanced",
      subtitle: "Professional techniques",
      gradient: "from-orange-500 to-red-500",
      items: [
        "Multiplayer Networking",
        "AI & Pathfinding",
        "Performance Optimization",
        "Advanced RPG Systems",
      ],
    },
    {
      weeks: "Weeks 10-12",
      title: "Launch",
      subtitle: "Ship your commercial game",
      gradient: "from-emerald-500 to-green-600",
      items: [
        "Monetization Strategies",
        "Marketing & ASO",
        "Store Submission Process",
        "Professional Portfolio",
      ],
    },
  ];

  // Array of key statistics to showcase course value
  const stats = [
    { value: "150+", label: "Video Lessons", sub: "HD Content" },
    { value: "50+", label: "Code Exercises", sub: "Hands-on Practice" },
    { value: "5", label: "Complete Games", sub: "Portfolio Ready" },
    { value: "15K+", label: "Active Learners", sub: "Growing Community" },
  ];

  // Array of course guarantees to build trust with potential students
  const guarantees = [
    {
      title: "30-Day Money Back Guarantee",
      desc: "Not satisfied? Get a full refund, no questions asked.",
    },
    {
      title: "Job Placement Support",
      desc: "No offer in 6 months? Get a refund + 6 more months free mentorship.",
    },
    {
      title: "Lifetime Access",
      desc: "All lessons, updates, and future content included forever.",
    },
  ];

  // Main page layout with gradient background
  return (
    <div className="flex min-h-screen w-full flex-col items-center bg-background bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,40,180,0.3),transparent)] bg-fixed">
      {/* Navigation Bar - Sticky header with branding and menu */}
      <nav className="sticky top-0 z-50 flex w-full items-center justify-between border-b border-border/50 bg-background/80 px-6 py-4 backdrop-blur-xl lg:px-12">
        <div className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-br from-purple-500 to-pink-500">
            <Gamepad2 className="h-5 w-5 text-foreground" />
          </div>
          <span className="text-xl font-bold text-foreground">
            GameDev Academy
          </span>
        </div>

        {/* Desktop Navigation Links - Hidden on mobile */}
        <div className="hidden items-center gap-8 md:flex">
          <a
            href="#demo"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            Demo
          </a>
          <a
            href="#roadmap"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            Roadmap
          </a>
          <a
            href="#pricing"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            Pricing
          </a>
          <Button
            className="bg-linear-to-r from-purple-500 to-pink-500 text-foreground hover:opacity-90"
            onClick={() => router.push("/home")}
          >
            Start Learning
          </Button>
        </div>

        {/* Mobile Menu Toggle Button - Hamburger/Close icon */}
        <button
          className="text-foreground md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </nav>

      {/* Mobile Navigation Menu - Conditional dropdown shown on mobile */}
      {mobileMenuOpen && (
        <div className="fixed inset-x-0 top-[73px] z-40 border-b border-border bg-background p-6 md:hidden">
          <div className="flex flex-col gap-4">
            <a
              href="#demo"
              className="text-foreground"
              onClick={() => setMobileMenuOpen(false)}
            >
              Demo
            </a>
            <a
              href="#roadmap"
              className="text-foreground"
              onClick={() => setMobileMenuOpen(false)}
            >
              Roadmap
            </a>
            <a
              href="#pricing"
              className="text-foreground"
              onClick={() => setMobileMenuOpen(false)}
            >
              Pricing
            </a>
            <Button className="w-full bg-linear-to-r from-purple-500 to-pink-500 text-foreground">
              Start Learning
            </Button>
          </div>
        </div>
      )}

      {/* Live Status Badge - Shows active learners count */}
      <div className="mt-6 flex items-center gap-2 rounded-full bg-linear-to-r from-purple-500 to-pink-500 px-3 py-1.5 sm:mt-8 sm:px-4 sm:py-2">
        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400 sm:h-2 sm:w-2" />
        <span className="text-xs font-medium text-foreground sm:text-sm">
          2,847 students learning right now
        </span>
      </div>

      {/* Hero Section - Main headline and value proposition */}
      <section className="flex w-full max-w-5xl flex-col items-center px-4 py-10 text-center sm:px-6 sm:py-16 lg:py-20">
        <h1 className="text-3xl font-extrabold leading-tight text-foreground sm:text-4xl md:text-5xl lg:text-6xl">
          Your 3-Month Journey
        </h1>
        <p className="mt-2 bg-linear-to-r from-purple-400 to-pink-400 bg-clip-text text-2xl font-extrabold text-transparent sm:text-3xl md:text-4xl lg:text-5xl">
          From Zero to Game Developer
        </p>
        <p className="mt-4 max-w-2xl px-2 text-base text-muted-foreground sm:mt-6 sm:text-lg">
          Try our proven curriculum with an interactive demo. No registration
          required.
        </p>
      </section>

      {/* Interactive Demo Section - Sample lesson preview with code editor */}
      <section
        id="demo"
        className="mx-4 flex w-[calc(100%-2rem)] max-w-4xl flex-col overflow-hidden rounded-2xl border border-purple-500/30 bg-black/60 backdrop-blur-sm sm:mx-6 sm:w-[calc(100%-3rem)] sm:rounded-3xl"
      >
        {/* Demo Header with title and live indicator */}
        <div className="flex flex-col gap-2 bg-secondary/80 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-6 sm:py-4">
          <div className="flex items-center gap-2 sm:gap-3">
            <Gamepad2 className="h-4 w-4 text-purple-400 sm:h-5 sm:w-5" />
            <span className="text-sm font-bold text-foreground sm:text-base">
              Try a Lesson - Interactive Demo
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
            <span className="text-xs font-medium text-emerald-400 sm:text-sm">
              live
            </span>
          </div>
        </div>

        {/* Demo Content Container */}
        <div className="flex flex-col gap-4 p-4 sm:gap-6 sm:p-6">
          {/* Lesson Selection Instructions */}
          <div className="flex items-center gap-2">
            <BookOpen className="h-4 w-4 text-purple-400 sm:h-5 sm:w-5" />
            <span className="text-xs font-bold text-foreground sm:text-sm">
              Choose Your Lesson
            </span>
          </div>

          {/* Lesson Selection Buttons */}
          <div className="grid gap-2 sm:grid-cols-3 sm:gap-3">
            {/* Map through lessons and create selectable buttons */}
            {lessons.map((lesson, index) => (
              <button
                key={lesson.title}
                onClick={() => setActiveLesson(index)}
                className={`flex flex-col items-start rounded-lg p-3 text-left transition-all sm:rounded-xl sm:p-4 ${
                  activeLesson === index
                    ? "bg-linear-to-r from-purple-500/40 to-pink-500/60"
                    : "bg-secondary/60 hover:bg-secondary"
                }`}
              >
                <span className="text-sm font-bold text-foreground sm:text-base">
                  {lesson.title}
                </span>
                <span className="text-xs text-foreground/60 sm:text-sm">
                  {lesson.subtitle}
                </span>
                {/* Difficulty level badge with dynamic color */}
                <span
                  className={`mt-1.5 rounded-full px-2 py-0.5 text-[10px] font-medium sm:mt-2 sm:px-3 sm:text-xs ${lesson.levelColor}`}
                >
                  {lesson.level}
                </span>
              </button>
            ))}
          </div>

          {/* Video Player Mockup - Play button and lesson info */}
          <div className="relative flex aspect-video w-full items-center justify-center overflow-hidden rounded-lg border border-purple-500/30 bg-black sm:rounded-xl">
            <div className="absolute inset-0 bg-linear-to-br from-purple-900/20 to-pink-900/20" />
            {/* Play button with hover scale animation */}
            <button className="z-10 flex h-12 w-12 items-center justify-center rounded-full bg-linear-to-r from-purple-500 to-pink-500 transition-transform hover:scale-110 sm:h-16 sm:w-16">
              <Play
                className="h-4 w-4 text-foreground sm:h-6 sm:w-6"
                fill="currentColor"
              />
            </button>
            {/* Video player bottom bar with lesson title and duration */}
            <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-linear-to-t from-black to-transparent p-2 sm:p-4">
              <span className="text-xs text-foreground sm:text-sm">
                Lesson 1: {lessons[activeLesson].title}
              </span>
              <span className="text-xs text-foreground/60 sm:text-sm">
                12:34
              </span>
            </div>
          </div>

          {/* Code Editor Section - Interactive coding environment */}
          <div className="flex flex-col gap-3 rounded-lg bg-secondary/60 p-3 sm:gap-4 sm:rounded-xl sm:p-4">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              {/* Editor title */}
              <div className="flex items-center gap-2">
                <Code className="h-4 w-4 text-purple-400 sm:h-5 sm:w-5" />
                <span className="text-sm font-bold text-foreground sm:text-base">
                  Try It Yourself
                </span>
              </div>
              {/* Run code button */}
              <Button
                size="sm"
                className="w-full bg-emerald-500 text-foreground hover:bg-emerald-400 sm:w-auto"
              >
                <Play className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                Run Code
              </Button>
            </div>
            {/* Code textarea with C# code example */}
            <textarea
              placeholder={`// Write your code here...\nvoid Update() {\n    transform.Translate(Vector3.forward * Time.deltaTime);\n}`}
              className="h-32 w-full resize-none rounded-lg border border-border bg-black p-3 font-mono text-xs text-emerald-400 placeholder:text-muted-foreground focus:border-purple-500 focus:outline-none sm:h-40 sm:p-4 sm:text-sm"
            />
          </div>

          {/* Demo Call-to-action - Incentive to join course */}
          <div className="flex flex-col gap-1.5 rounded-lg border border-purple-500/50 bg-purple-500/10 p-4 sm:gap-2 sm:rounded-xl sm:p-6">
            <span className="text-base font-extrabold text-purple-400 sm:text-xl">
              This is just 1 of 150+ lessons
            </span>
            <span className="text-xs text-muted-foreground sm:text-sm">
              Unlock the complete 12-week journey to master game development
              from scratch to store launch.
            </span>
          </div>
        </div>
      </section>

      {/* Roadmap Section - 12-week course progression visualization */}
      <section
        id="roadmap"
        className="flex w-full max-w-5xl flex-col items-center px-4 py-12 sm:px-6 sm:py-16 lg:py-24"
      >
        <h2 className="text-center text-2xl font-extrabold text-foreground sm:text-3xl lg:text-4xl">
          Your Clear Path to Success
        </h2>

        {/* Phases container */}
        <div className="mt-8 flex w-full flex-col gap-6 sm:mt-12 sm:gap-8 lg:mt-16 lg:gap-12">
          {/* Map through each roadmap phase */}
          {roadmapPhases.map((phase, index) => (
            <div
              key={phase.title}
              className="flex items-start gap-3 sm:gap-4 lg:gap-6"
            >
              {/* Timeline number circle with gradient */}
              <div
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-linear-to-br sm:h-12 sm:w-12 lg:h-16 lg:w-16 ${phase.gradient}`}
              >
                <span className="text-lg font-bold text-foreground sm:text-xl lg:text-2xl">
                  {index + 1}
                </span>
              </div>

              {/* Phase details card */}
              <div className="flex-1 overflow-hidden rounded-xl border border-border bg-linear-to-r from-secondary/80 to-black sm:rounded-2xl">
                <div className="p-4 sm:p-6 lg:p-8">
                  {/* Weeks label with gradient text */}
                  <span
                    className={`bg-linear-to-r ${phase.gradient} bg-clip-text text-xs font-bold text-transparent sm:text-sm`}
                  >
                    {phase.weeks}
                  </span>
                  {/* Phase title */}
                  <h3 className="mt-1 text-lg font-bold text-foreground sm:text-xl lg:text-3xl">
                    {phase.title}
                  </h3>
                  {/* Phase subtitle */}
                  <p className="text-xs text-muted-foreground sm:text-sm">
                    {phase.subtitle}
                  </p>

                  {/* Learning objectives grid */}
                  <div className="mt-4 grid gap-2 sm:mt-6 sm:grid-cols-2 sm:gap-3">
                    {phase.items.map((item) => (
                      <div
                        key={item}
                        className="flex items-center gap-2 rounded-lg border border-border bg-black/50 p-2 sm:gap-3 sm:rounded-xl sm:p-3"
                      >
                        {/* Checkmark and item text */}
                        <CheckCircle className="h-4 w-4 shrink-0 text-purple-400 sm:h-5 sm:w-5" />
                        <span className="text-xs text-foreground sm:text-sm">
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Transformation Section - Before/after visualization of learning journey */}
      <div className="mx-4 rounded-2xl w-[calc(100%-2rem)] max-w-3xl bg-linear-to-r from-purple-600 to-pink-600 p-px sm:mx-6 sm:rounded-3xl">
        {/* Inner card with transformation journey */}
        <section className="flex w-full max-w-3xl flex-col items-center gap-4 rounded-2xl bg-black/60 p-6 text-center sm:gap-6 sm:rounded-3xl sm:p-8 lg:p-12">
          {/* Sparkle icon to start transformation */}
          <Sparkles className="h-8 w-8 text-amber-300 sm:h-10 sm:w-10 lg:h-12 lg:w-12" />
          {/* Starting point - Week 1 beginner status */}
          <div>
            <span className="text-sm font-bold text-foreground/80 sm:text-base">
              Week 1
            </span>
            <p className="text-lg font-bold text-foreground sm:text-xl">
              Complete Beginner
            </p>
            <p className="text-xs text-foreground/60 sm:text-sm">
              No coding experience
            </p>
          </div>
          {/* Arrow between start and end points */}
          <ArrowRight className="h-6 w-6 rotate-90 text-amber-300 sm:h-8 sm:w-8 md:rotate-0" />
          {/* Journey highlight with course stats */}
          <div className="rounded-full bg-amber-400/20 px-3 py-1.5 sm:px-4 sm:py-2">
            <span className="text-sm font-bold text-amber-300 sm:text-base">
              12 Week Transformation
            </span>
            <p className="text-[10px] text-foreground/80 sm:text-xs">
              150+ Lessons | 5 Complete Games
            </p>
          </div>
          {/* Arrow to end point */}
          <ArrowRight className="h-6 w-6 rotate-90 text-amber-300 sm:h-8 sm:w-8 md:rotate-0" />
          {/* End point - Week 12 professional status */}
          <div>
            <Rocket className="mx-auto h-8 w-8 text-foreground sm:h-10 sm:w-10 lg:h-12 lg:w-12" />
            <span className="text-sm font-bold text-foreground/80 sm:text-base">
              Week 12
            </span>
            <p className="text-lg font-bold text-foreground sm:text-xl">
              Published Game Developer
            </p>
            <p className="text-xs text-foreground/60 sm:text-sm">
              Commercial game shipped
            </p>
          </div>
        </section>
      </div>

      {/* Stats Section - Course statistics and achievements */}
      <section className="grid w-full max-w-4xl grid-cols-2 gap-2 px-4 py-12 sm:gap-4 sm:px-6 sm:py-16 lg:grid-cols-4 lg:py-24">
        {/* Display each statistic in a card */}
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="flex flex-col items-center justify-center rounded-xl border border-border bg-linear-to-b from-secondary/50 to-black p-4 text-center sm:rounded-2xl sm:p-6"
          >
            <span className="text-2xl font-extrabold text-purple-400 sm:text-3xl">
              {stat.value}
            </span>
            <span className="mt-1 text-sm font-bold text-foreground sm:text-base">
              {stat.label}
            </span>
            <span className="text-[10px] text-muted-foreground sm:text-xs">
              {stat.sub}
            </span>
          </div>
        ))}
      </section>

      {/* Guarantee Section - Risk-free promise with benefits */}
      <section className="mx-4 flex w-[calc(100%-2rem)] max-w-xl flex-col items-center rounded-2xl border-2 border-emerald-500 bg-linear-to-b from-secondary to-black p-6 sm:mx-6 sm:w-[calc(100%-3rem)] sm:rounded-3xl sm:p-8">
        <Shield className="h-10 w-10 text-emerald-400 sm:h-12 sm:w-12" />
        {/* Guarantee section title */}
        <h3 className="mt-3 text-xl font-bold text-foreground sm:mt-4 sm:text-2xl">
          Our Guarantee To You
        </h3>

        {/* Guarantee items list */}
        <div className="mt-6 flex w-full flex-col gap-4 sm:mt-8 sm:gap-6">
          {/* Display each guarantee with checkmark and description */}
          {guarantees.map((g) => (
            <div key={g.title} className="flex items-start gap-3 sm:gap-4">
              <CheckCircle className="h-4 w-4 shrink-0 text-emerald-400 sm:h-5 sm:w-5" />
              <div>
                <span className="text-sm font-bold text-foreground sm:text-base">
                  {g.title}
                </span>
                <p className="text-xs text-muted-foreground sm:text-sm">
                  {g.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-4 text-sm font-bold text-emerald-400 sm:mt-6 sm:text-base">
          Zero Risk, All Reward
        </p>
      </section>

      {/* Call-to-Action Section - Final enrollment offer */}
      <div className="m-8 w-[calc(100%-2rem)] max-w-4xl rounded-2xl bg-linear-to-r from-purple-600 to-pink-600 p-px sm:mx-6 sm:rounded-3xl">
        <section
          id="pricing"
          className="flex w-full flex-col items-center gap-5 rounded-2xl bg-black/60 p-6 text-center sm:gap-6 sm:rounded-3xl sm:p-8 lg:gap-8 lg:p-12"
        >
          {/* CTA headline */}
          <h2 className="text-2xl font-bold text-foreground sm:text-3xl lg:text-5xl">
            Ready to Start Your Journey?
          </h2>

          {/* CTA subheading */}
          <p className="max-w-xl text-sm text-foreground/80 sm:text-base lg:text-lg">
            Join 15,000+ developers who transformed their careers. Start
            building real games today.
          </p>

          {/* Action buttons - Enroll and curriculum view */}
          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:gap-4">
            <Button
              size="lg"
              className="w-full bg-foreground text-purple-900 hover:bg-foreground/90 sm:w-auto"
              onClick={() => router.push("/curriculum")}
            >
              Enroll Now - $299
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="w-full border-foreground/50 bg-transparent text-foreground hover:bg-foreground/10 sm:w-auto"
              onClick={() => router.push("/curriculum")}
            >
              View Full Curriculum
            </Button>
          </div>

          {/* Trust badges and key features */}
          <div className="flex flex-wrap items-center justify-center gap-3 text-xs text-foreground/80 sm:gap-4 sm:text-sm">
            <span className="flex items-center gap-1">
              <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4" /> 30-Day Money
              Back
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3 sm:h-4 sm:w-4" /> Lifetime Access
            </span>
            <span className="flex items-center gap-1">
              <Target className="h-3 w-3 sm:h-4 sm:w-4" /> Job Guarantee
            </span>
          </div>

          {/* Urgency text - Cohort start date and limited spots */}
          <p className="text-xs font-bold text-amber-300 sm:text-sm">
            Next cohort starts February 1st – Only 8 spots remaining
          </p>
        </section>
      </div>

      {/* Footer Section */}
      <footer className="w-full border-t border-border bg-black/50 px-4 py-6 sm:px-6 sm:py-8">
        {/* Footer content wrapper */}
        <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-3 sm:gap-4 md:flex-row">
          {/* Footer branding */}
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-linear-to-br from-purple-500 to-pink-500 sm:h-8 sm:w-8">
              <Gamepad2 className="h-3.5 w-3.5 text-foreground sm:h-4 sm:w-4" />
            </div>
            <span className="text-sm font-bold text-foreground sm:text-base">
              GameDev Academy
            </span>
          </div>
          {/* Copyright text */}
          <p className="text-xs text-muted-foreground sm:text-sm">
            2026 GameDev Academy. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
