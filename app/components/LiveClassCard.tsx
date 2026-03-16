import { BaseCard } from "./ui/BaseCard";
import { StatusBadge } from "./ui/StatusBadge";
import { IconWrapper } from "./ui/IconWrapper";
import { FlexRow } from "./ui/FlexRow";
import { Clock } from "lucide-react";
import { UpcomingClass } from "@/lib/types";

interface LiveClassCardProps {
  class: UpcomingClass;
}

export function LiveClassCard({ class: classData }: LiveClassCardProps) {
  return (
    <BaseCard variant="default" className="hover:border-purple-500">
      {/* Header with title and live indicator */}
      <FlexRow justify="between" align="start" className="mb-3">
        <div>
          <FlexRow align="center" gap="sm" className="mb-2">
            <h3 className="font-bold text-lg">{classData.title}</h3>
            {classData.live && (
              <StatusBadge variant="live" size="sm" animated>
                LIVE TODAY
              </StatusBadge>
            )}
          </FlexRow>
          <div className="text-sm text-gray-400">
            with {classData.instructor}
          </div>
        </div>
        <IconWrapper 
          icon={Clock}
          size="md"
          variant="transparent"
          color="gray"
        />
      </FlexRow>
      
      {/* Footer with time and action button */}
      <FlexRow justify="between" align="center">
        <span className="text-purple-400 font-medium">
          {classData.time}
        </span>
        <button
          className={`px-4 py-2 rounded-lg font-bold text-sm transition ${
            classData.live
              ? "bg-linear-to-r from-red-600 to-pink-600 hover:from-red-500 hover:to-pink-500"
              : "bg-gray-700 hover:bg-gray-600"
          }`}
        >
          {classData.live ? "Join Now" : "Set Reminder"}
        </button>
      </FlexRow>
    </BaseCard>
  );
}
