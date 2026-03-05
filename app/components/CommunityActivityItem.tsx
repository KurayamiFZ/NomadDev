import Icon from "./icons";
import { CommunityActivity } from "@/lib/types";

interface CommunityActivityItemProps {
  activity: CommunityActivity;
}

export function CommunityActivityItem({ activity }: CommunityActivityItemProps) {
  return (
    <div className="flex items-start gap-3">
      <div className="w-8 h-8 bg-linear-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-xs font-bold shrink-0">
        {activity.user.charAt(0)}
      </div>
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
    </div>
  );
}
