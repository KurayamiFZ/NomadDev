import { BaseCard } from "./ui/BaseCard";
import { StatusBadge } from "./ui/StatusBadge";
import { IconWrapper } from "./ui/IconWrapper";
import { CheckCircle, Lock, Play } from "lucide-react";
import { Lesson } from "@/lib/types";

interface LessonCardProps {
  lesson: Lesson;
  onClick?: () => void;
}

export function LessonCard({ lesson, onClick }: LessonCardProps) {
  // Determine card styling based on lesson state
  const getCardVariant = () => {
    if (lesson.current) return "bordered";
    if (lesson.completed) return "default";
    return "default";
  };

  const getCardClasses = () => {
    if (lesson.current) return "border-purple-500 bg-purple-900/30";
    if (lesson.completed) return "border-gray-700 bg-gray-800/50";
    return "border-gray-700 bg-gray-800 hover:border-gray-600";
  };

  // Determine icon and color based on lesson state
  const getIconData = () => {
    if (lesson.completed) return { icon: CheckCircle, color: "green" as const };
    if (lesson.locked) return { icon: Lock, color: "gray" as const };
    return { icon: Play, color: "purple" as const };
  };

  const { icon: IconComponent, color } = getIconData();

  return (
    <BaseCard
      variant={getCardVariant()}
      className={getCardClasses()}
      onClick={onClick}
      hoverable={!lesson.completed}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <IconWrapper
            icon={IconComponent}
            size="md"
            variant="solid"
            color={color}
          />
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
          <StatusBadge variant="purple" size="sm">
            ЯВАГДАЖ БАЙНА
          </StatusBadge>
        )}
      </div>
    </BaseCard>
  );
}
