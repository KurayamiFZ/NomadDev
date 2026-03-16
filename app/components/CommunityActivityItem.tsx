import { IconWrapper } from "./ui/IconWrapper";
import { FlexRow } from "./ui/FlexRow";
import { CommunityActivity } from "@/lib/types";

interface CommunityActivityItemProps {
  activity: CommunityActivity;
}

export function CommunityActivityItem({ activity }: CommunityActivityItemProps) {
  return (
    <FlexRow align="start" gap="sm">
      {/* User Avatar */}
      <IconWrapper 
        icon={() => (
          <span className="text-xs font-bold text-white">
            {activity.user.charAt(0)}
          </span>
        )}
        size="md"
        variant="gradient"
        color="purple"
      />
      
      {/* Activity Content */}
      <div className="flex-1 min-w-0">
        <p className="text-sm">
          <span className="font-bold text-white">
            {activity.user}
          </span>
          <span className="text-gray-400">
            {" "}
            {activity.action}{" "}
          </span>
          <span className="text-purple-400">
            {activity.item}
          </span>
        </p>
        <p className="text-xs text-gray-500 mt-1">
          {activity.time}
        </p>
      </div>
    </FlexRow>
  );
}
