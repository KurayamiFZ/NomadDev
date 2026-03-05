import Icon from "./icons";
import { UpcomingClass } from "@/lib/types";

interface LiveClassCardProps {
  class: UpcomingClass;
}

export function LiveClassCard({ class: classData }: LiveClassCardProps) {
  return (
    <div className="bg-gray-800 rounded-xl p-4 border border-gray-700 hover:border-purple-500 transition">
      <div className="flex items-start justify-between mb-3">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <h3 className="font-bold text-lg">{classData.title}</h3>
            {classData.live && (
              <div className="bg-red-500 text-white text-xs px-2 py-1 rounded-full font-bold flex items-center gap-1 animate-pulse">
                <div className="w-2 h-2 bg-white rounded-full"></div>
                LIVE TODAY
              </div>
            )}
          </div>
          <div className="text-sm text-gray-400">
            with {classData.instructor}
          </div>
        </div>
        <Icon name="Clock" className="size-5 text-gray-400" />
      </div>
      <div className="flex items-center justify-between">
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
      </div>
    </div>
  );
}
