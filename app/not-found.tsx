"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";

export default function NotFound() {
  const router = useRouter();
  return (
    <div
      className="flex flex-col justify-center items-center min-h-screen w-screen 
                bg-neutral-950 
                bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(41,19,60,1),rgba(255,255,255,0))]
                bg-fixed"
    >
      <span className="text-4xl text-white font-black">
        404 | Page Not Found
      </span>
      <button
        className="bg-black/10 hover:bg-neutral-700 border-3 mt-8 border-white rounded-full w-1/7 h-15"
        onClick={() => router.push("/")}
      >
        Back To Page
      </button>
    </div>
  );
}
