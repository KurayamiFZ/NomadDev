"use client";

import { useRouter } from "next/navigation";
import { BookOpen, MessageCircle, Download, Share2, BookMarked } from "lucide-react";
import Icon from "./icons";

interface QuickAction {
  icon: React.ReactNode;
  label: string;
  color: string;
  href?: string;
  onClick?: () => void;
}

interface QuickActionsProps {
  variant?: "default" | "compact";
  className?: string;
}

export function QuickActions({ variant = "default", className = "" }: QuickActionsProps) {
  const router = useRouter();

  // Define standardized quick actions
  const quickActions: QuickAction[] = [
    {
      icon: <Icon name="BookOpen" />,
      label: "Хичээлийн хөтөлбөр",
      color: "text-blue-400",
      href: "/home/projects",
    },
    {
      icon: <Icon name="MessageCircle" />,
      label: "Асуулт тавих",
      color: "text-pink-400",
      href: "/feedback",
    },
    {
      icon: <Icon name="BookMarked" />,
      label: "Судалгааны тэмдэглэл",
      color: "text-yellow-400",
      href: "/notes",
    },
  ];

  const handleActionClick = (action: QuickAction) => {
    if (action.onClick) {
      action.onClick();
    } else if (action.href) {
      router.push(action.href);
    }
  };

  const baseClasses = "bg-linear-to-br from-gray-900 to-black border border-gray-800 rounded-2xl p-6";
  const titleClasses = variant === "compact" 
    ? "text-lg font-bold mb-4" 
    : "text-xl font-bold mb-4 bg-linear-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent";

  return (
    <div className={`${baseClasses} ${className}`}>
      <h2 className={titleClasses}>
        {variant === "compact" ? "Хурдан үйлдлүүд" : "Хурдан холбоосууд"}
      </h2>
      <div className="space-y-2">
        {quickActions.map((action, index) => (
          <button
            key={index}
            onClick={() => handleActionClick(action)}
            className="w-full flex items-center gap-3 p-3 bg-white/5 hover:bg-white/10 rounded-xl transition-all duration-300 text-left group transform hover:scale-105"
            style={{ transitionDelay: `${index * 50}ms` }}
          >
            <span className={`transform transition-transform duration-300 hover:scale-110 ${action.color}`}>
              {action.icon}
            </span>
            <span className="font-medium group-hover:text-white transition-colors">
              {action.label}
            </span>
            <Icon
              name="ChevronRight"
              className="w-4 h-4 ml-auto text-gray-400 group-hover:translate-x-1 transition-transform"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
