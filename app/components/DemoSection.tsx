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
      className="mx-4 flex w-[calc(100%-2rem)] max-w-4xl flex-col overflow-hidden rounded-2xl border border-purple-600/20 bg-black/80 backdrop-blur-sm sm:mx-6 sm:w-[calc(100%-3rem)] sm:rounded-3xl lg:mx-auto lg:w-full"
    >
      <div className="flex flex-col gap-2 bg-secondary/80 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-6 sm:py-4">
        <div className="flex items-center gap-2 sm:gap-3">
          <Icon
            name="Gamepad2"
            className="h-4 w-4 text-purple-300 sm:h-5 sm:w-5"
          />
          <span className="text-sm font-bold text-foreground sm:text-base">
            Try a Lesson - Interactive Demo
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-emerald-300" />
          <span className="text-xs font-medium text-emerald-300 sm:text-sm">
            live
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-4 p-4 sm:gap-6 sm:p-6">
        <div className="flex items-center gap-2">
          <Icon
            name="BookOpen"
            className="h-4 w-4 text-purple-300 sm:h-5 sm:w-5"
          />
          <span className="text-xs font-bold text-foreground sm:text-sm">
            Choose Your Lesson
          </span>
        </div>

        <div className="mt-4 grid gap-2 grid-cols-1 sm:mt-6 sm:grid-cols-2 sm:gap-3">
          {LANDING_LESSONS.map((lesson: LandingLesson, index: number) => (
            <button
              key={lesson.title}
              onClick={() => setActiveLesson(index)}
              style={{
                animationDelay: `${index * 100}ms`,
              }}
              className={`
        flex flex-col items-start rounded-lg p-3 text-left transition-all
        sm:rounded-xl sm:p-4
        animate-fade-in-left
        ${
          activeLesson === index
            ? "bg-linear-to-r from-purple-600/30 to-pink-600/40"
            : "bg-secondary/60 hover:bg-secondary"
        }
      `}
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

        <div className="relative flex aspect-video w-full items-center justify-center overflow-hidden rounded-lg border border-purple-600/20 bg-black sm:rounded-xl">
          <div className="absolute inset-0 bg-linear-to-br from-purple-800/15 to-pink-800/15" />
          <button className="z-10 flex h-12 w-12 items-center justify-center rounded-full bg-linear-to-r from-purple-600 to-pink-600 transition-transform hover:scale-110 sm:h-16 sm:w-16">
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

        <div className="flex flex-col gap-1.5 rounded-lg border border-purple-600/30 bg-purple-600/8 p-4 sm:gap-2 sm:rounded-xl sm:p-6">
          <span className="text-base font-extrabold text-purple-300 sm:text-xl">
            This is just 1 of 150+ lessons
          </span>
          <span className="text-xs text-muted-foreground sm:text-sm">
            Unlock complete 12-week journey to master game development from
            scratch to store launch.
          </span>
        </div>
      </div>
    </section>
  );
}
