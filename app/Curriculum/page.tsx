'use client'

import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Curriculum() {
  const router = useRouter()
  return (
    <div className="flex flex-col justify-center min-h-screen w-screen 
                bg-neutral-950 
                bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(41,19,60,1),rgba(255,255,255,0))]
                bg-fixed
                items-center">
        
        <div className="flex justify-between w-full h-1/12">
            <button className="self-center m-4 h-10 w-30 font-bold bg-black/50 hover:bg-stone-300 rounded-full border-2 border-white" onClick={() => router.push('/')}>⟵ Back</button>
            <span className="self-center bg-[linear-gradient(to_right,#A95BF0,#E94D9B)] bg-clip-text text-transparent font-extrabold font-[Inter] text-6xl mb-8 p-4">Plans</span>
            <div className="bg-black w-1/12 h-full"></div>
        </div>

        <div className="flex w-3/4 h-[800px] rounded-4xl bg-black/50 border-2 border-white ">

            {/* Free Plan */}
            <div className="flex flex-col justify-center space-y-2 w-1/3 h-full rounded-l-4xl border border-white">
                <span className="flex self-center text-3xl mt-4 font-medium font-[Inter]">Free</span>
                <span className="font-extrabold font-[Inter] m-4 text-white">✔ Benefits</span>
                <span className="font-extrabold font-[Inter] m-4 text-white">✔ Benefits</span>
                <span className="font-extrabold font-[Inter] m-4 text-white">✔ Benefits</span>
                <span className="font-extrabold font-[Inter] m-4 text-white">✔ Benefits</span>
                <span className="font-[Inter] m-4 text-gray-400">✖ Benefit</span>
                <span className="font-[Inter] m-4 text-gray-400">✖ Benefit</span>
                <span className="font-[Inter] m-4 text-gray-400">✖ Benefit</span>
                <span className="font-[Inter] m-4 text-gray-400">✖ Benefit</span>
                <span className="font-[Inter] m-4 text-gray-400">✖ Benefit</span>
                <span className="font-[Inter] m-4 text-gray-400">✖ Benefit</span>
                <button className="self-center m-4 w-4/6 h-1/10 font-bold bg-black/50 hover:bg-stone-300 rounded-full border-2 border-white" /*onClick={() => router.push('/Curriculum')}*/>View Curriculum</button>
            </div>
            {/* Basic Plan */}
            <div className="flex flex-col justify-center space-y-2 w-1/3 h-full border border-white">
                <span className="flex self-center text-3xl mt-4 font-bold font-[Inter]">Basic</span>
                <span className="font-extrabold font-[Inter] m-4 text-white">✔ Benefits</span>
                <span className="font-extrabold font-[Inter] m-4 text-white">✔ Benefits</span>
                <span className="font-extrabold font-[Inter] m-4 text-white">✔ Benefits</span>
                <span className="font-extrabold font-[Inter] m-4 text-white">✔ Benefits</span>
                <span className="font-extrabold font-[Inter] m-4 text-white">✔ Benefits</span>
                <span className="font-extrabold font-[Inter] m-4 text-white">✔ Benefits</span>
                <span className="font-extrabold font-[Inter] m-4 text-white">✔ Benefits</span>
                <span className="font-[Inter] m-4 text-gray-400">✖ Benefit</span>
                <span className="font-[Inter] m-4 text-gray-400">✖ Benefit</span>
                <span className="font-[Inter] m-4 text-gray-400">✖ Benefit</span>
                <button className="self-center m-4 w-4/6 h-1/10 font-bold bg-black/50 hover:bg-stone-300 rounded-full border-2 border-white" /*onClick={() => router.push('/Curriculum')}*/>View Curriculum</button>
            </div>
            {/* Premium Plan */}
            <div className="flex flex-col justify-center space-y-2 w-1/3 h-full rounded-r-4xl border border-white">
                <span className="flex self-center text-3xl mt-4 font-extrabold font-[Inter]">Advanced</span>
                <span className="font-extrabold font-[Inter] m-4 text-white">✔ Benefits</span>
                <span className="font-extrabold font-[Inter] m-4 text-white">✔ Benefits</span>
                <span className="font-extrabold font-[Inter] m-4 text-white">✔ Benefits</span>
                <span className="font-extrabold font-[Inter] m-4 text-white">✔ Benefits</span>
                <span className="font-extrabold font-[Inter] m-4 text-white">✔ Benefits</span>
                <span className="font-extrabold font-[Inter] m-4 text-white">✔ Benefits</span>
                <span className="font-extrabold font-[Inter] m-4 text-white">✔ Benefits</span>
                <span className="font-extrabold font-[Inter] m-4 text-white">✔ Benefits</span>
                <span className="font-extrabold font-[Inter] m-4 text-white">✔ Benefits</span>
                <span className="font-extrabold font-[Inter] m-4 text-white">✔ Benefits</span>
                <button className="self-center m-4 w-4/6 h-1/10 font-bold bg-black/50 hover:bg-stone-300 rounded-full border-2 border-white" /*onClick={() => router.push('/Curriculum')}*/>View Curriculum</button>
            </div>
        </div>
    </div>
  );
}