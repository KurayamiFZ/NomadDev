"use client";

import { useState } from "react";
import Icon from "./icons";
import { Button } from "./button";
import { LANDING_LESSONS, type LandingLesson } from "@/lib/constants";

export function DemoSection() {
  const [activeLesson, setActiveLesson] = useState(0);

  return (
    <section
      id="demo"
      className="mx-4 flex w-[calc(100%-2rem)] max-w-4xl flex-col overflow-hidden rounded-2xl border border-purple-500/30 bg-black/60 backdrop-blur-sm sm:mx-6 sm:w-[calc(100%-3rem)] sm:rounded-3xl"
    >
      <div className="flex flex-col gap-2 bg-secondary/80 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-6 sm:py-4">
        <div className="flex items-center gap-2 sm:gap-3">
          <Icon
            name="Gamepad2"
            className="h-4 w-4 text-purple-400 sm:h-5 sm:w-5"
          />
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

      <div className="flex flex-col gap-4 p-4 sm:gap-6 sm:p-6">
        <div className="flex items-center gap-2">
          <Icon
            name="BookOpen"
            className="h-4 w-4 text-purple-400 sm:h-5 sm:w-5"
          />
          <span className="text-xs font-bold text-foreground sm:text-sm">
            Choose Your Lesson
          </span>
        </div>

        <div className="grid gap-2 sm:grid-cols-3 sm:gap-3">
          {LANDING_LESSONS.map((lesson: LandingLesson, index: number) => (
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
              <span
                className={`mt-1.5 rounded-full px-2 py-0.5 text-[10px] font-medium sm:mt-2 sm:px-3 sm:text-xs ${lesson.levelColor}`}
              >
                {lesson.level}
              </span>
            </button>
          ))}
        </div>

        <div className="relative flex aspect-video w-full items-center justify-center overflow-hidden rounded-lg border border-purple-500/30 bg-black sm:rounded-xl">
          <div className="absolute inset-0 bg-linear-to-br from-purple-900/20 to-pink-900/20" />
          <button className="z-10 flex h-12 w-12 items-center justify-center rounded-full bg-linear-to-r from-purple-500 to-pink-500 transition-transform hover:scale-110 sm:h-16 sm:w-16">
            <Icon
              name="Play"
              className="h-4 w-4 text-foreground sm:h-6 sm:w-6"
              fill="currentColor"
            />
          </button>
          <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-linear-to-t from-black to-transparent p-2 sm:p-4">
            <span className="text-xs text-foreground sm:text-sm">
              Lesson 1: {LANDING_LESSONS[activeLesson].title}
            </span>
            <span className="text-xs text-foreground/60 sm:text-sm">12:34</span>
          </div>
        </div>

        <div className="flex flex-col gap-3 rounded-lg bg-secondary/60 p-3 sm:gap-4 sm:rounded-xl sm:p-4">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-2">
              <Icon
                name="Code"
                className="h-4 w-4 text-purple-400 sm:h-5 sm:w-5"
              />
              <span className="text-sm font-bold text-foreground sm:text-base">
                Try It Yourself
              </span>
            </div>
            <Button
              size="sm"
              className="w-full bg-emerald-500 text-foreground hover:bg-emerald-400 sm:w-auto"
            >
              <Icon name="Play" className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
              Run Code
            </Button>
          </div>
          <textarea
            placeholder={`// Write your code here...\nvoid Update() {\n    transform.Translate(Vector3.forward * Time.deltaTime);\n}`}
            className="h-32 w-full resize-none rounded-lg border border-border bg-black p-3 font-mono text-xs text-emerald-400 placeholder:text-muted-foreground focus:border-purple-500 focus:outline-none sm:h-40 sm:p-4 sm:text-sm"
          />
        </div>

        <div className="flex flex-col gap-1.5 rounded-lg border border-purple-500/50 bg-purple-500/10 p-4 sm:gap-2 sm:rounded-xl sm:p-6">
          <span className="text-base font-extrabold text-purple-400 sm:text-xl">
            This is just 1 of 150+ lessons
          </span>
          <span className="text-xs text-muted-foreground sm:text-sm">
            Unlock the complete 12-week journey to master game development from
            scratch to store launch.
          </span>
        </div>
      </div>
    </section>
  );
}
