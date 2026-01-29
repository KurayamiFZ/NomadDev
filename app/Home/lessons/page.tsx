"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Home() {
  const router = useRouter();

  type Lessons = {};
  const [activeTab, setActiveTab] = useState("lessons");
  return <div className="flex flex-col min-h-screen w-full bg-black"></div>;
}
