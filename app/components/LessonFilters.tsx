import { useState } from "react";
import Icon from "./icons";
import { Lesson } from "@/lib/types";

interface LessonFiltersProps {
  selectedFilter: string;
  onFilterChange: (filter: string) => void;
}

export function LessonFilters({ selectedFilter, onFilterChange }: LessonFiltersProps) {
  const filters = ["all", "in-progress", "completed", "locked"];

  return (
    <div className="flex items-center gap-3 mb-8 overflow-x-auto">
      {filters.map((filter) => (
        <button
          key={filter}
          onClick={() => onFilterChange(filter)}
          className={`px-6 py-3 rounded-lg font-bold text-sm transition whitespace-nowrap ${
            selectedFilter === filter
              ? "bg-purple-600 text-white"
              : "bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white"
          }`}
        >
          {filter === "all" && "All Lessons"}
          {filter === "in-progress" && "In Progress"}
          {filter === "completed" && "Completed"}
          {filter === "locked" && "Upcoming"}
        </button>
      ))}
    </div>
  );
}
