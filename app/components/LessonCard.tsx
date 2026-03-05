import Icon from "./icons";
import { Lesson } from "@/lib/types";

interface LessonCardProps {
  lesson: Lesson;
  onClick?: () => void;
}

export function LessonCard({ lesson, onClick }: LessonCardProps) {
  return (
    <div
      className={`flex items-center justify-between p-4 rounded-lg transition cursor-pointer ${
        lesson.current
          ? "bg-purple-900/30 border-2 border-purple-500"
          : lesson.completed
            ? "bg-gray-800/50 border border-gray-700"
            : "bg-gray-800 border border-gray-700 hover:border-gray-600"
      }`}
      onClick={onClick}
    >
      <div className="flex items-center gap-4">
        <div
          className={`w-10 h-10 rounded-full flex items-center justify-center ${
            lesson.completed
              ? "bg-green-500"
              : lesson.current
                ? "bg-purple-500"
                : "bg-gray-700"
          }`}
        >
          {lesson.completed ? (
            <Icon name="CheckCircle" className="size-6 text-white" />
          ) : lesson.locked ? (
            <Icon name="Lock" className="size-5 text-gray-400" />
          ) : (
            <Icon name="Play" className="size-5 text-white" />
          )}
        </div>
        <div>
          <div
            className={`font-bold ${
              lesson.completed ? "text-gray-400" : "text-white"
            }`}
          >
            {lesson.title}
          </div>
          <div className="text-sm text-gray-500">{lesson.duration}</div>
        </div>
      </div>
      {lesson.current && (
        <div className="bg-purple-500 text-white text-xs px-3 py-1 rounded-full font-bold">
          IN PROGRESS
        </div>
      )}
    </div>
  );
}
