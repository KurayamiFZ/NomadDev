'use client'

import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Home() {
  const router = useRouter()
  return (
    <div className="flex flex-col min-h-screen w-screen 
                bg-neutral-950 
                bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(41,19,60,1),rgba(255,255,255,0))]
                bg-fixed
                items-center">
      

      {/* Header Widget */}
      <div className="mt-8 rounded-3xl h-[3px] w-1/5 items-center justify-center px-3 py-5 bg-[linear-gradient(to_right,#A95BF0,#E94D9B)]">
        <p className="-m-3 flex justify-center text-white font-bold text-sm">
          Одоогоор 2,847 сурагч шууд хичээллэж байна
        </p>
      </div>

      {/* Main Headline */}
      <p className="mt-16 text-6xl text-white font-extrabold">3 сарын таны аялал</p>

      <span className="bg-[linear-gradient(to_right,#A95BF0,#E94D9B)] font-[Inter] font-extrabold text-5xl bg-clip-text text-transparent">
        Тэгээс эхлээд тоглоом хөгжүүлэгч болтлоо
      </span>

      <p className="mt-8 text-gray-500 text-xl">
        Батлагдсан хөтөлбөрөө шууд хичээлийн демогоор туршаад үз. Бүртгэл шаардлагагүй.
      </p>

      <div className="w-2/4 py-8 border flex flex-col justify-center items-center border-fuchsia-900 bg-black rounded-3xl mt-8 space-y-6 pt-0">

        {/* Headline */}
        <div className="bg-gray-800 flex items-center justify-between rounded-t-3xl h-15 w-full">
          <div className="flex w-2/3 h-full items-center">
            <span className="icon-[proicons--game] bg-purple-400 size-6 m-2"></span>
            <p className="text-white font-bold">Хичээл туршаад үз – Харилцан үйлдэлтэй демо</p>
          </div>
          <p className="text-green-400 font-bold mr-8">●live</p>
        </div>

        <div className="flex flex-row items-start w-full">
          <span className="icon-[tabler--book] ml-26 size-5 bg-purple-400"></span>
          <span className="font-bold ml-2  text-sm text-white">Хичээлээ сонго</span>
        </div>
        

        {/* Lesson Tabs */}
        <div className="flex flex-col items-center gap-3 w-full">
          <button className="flex bg-linear-to-r from-purple-500 to-pink-500 w-3/4 py-2 rounded-lg">
           <div className="flex flex-col items-start">
            <p className="font-extrabold font-[Inter] ml-8 text-white text-[12px] ">Тоглогчийн хөдөлгөөн</p>
            <p className="font-medium font-[Inter] ml-8 pb-1 text-gray-400 text-[10px] ">2D удирдлагыг сурах</p>
            <div className="ml-8 w-6/12 h-4 rounded-xl bg-green-400 text-[10px] text-green-700">Анхан шат</div>
           </div>
          </button>
          <button className="flex bg-gray-800 w-3/4 py-2 rounded-lg">
           <div className="flex flex-col items-start">
            <p className="font-extrabold font-[Inter] ml-8 text-white text-[12px] ">Дайсны хиймэл оюун</p>
            <p className="font-medium font-[Inter] ml-8 pb-1 text-gray-400 text-[10px] ">Ухаалаг өрсөлдөгчид</p>
            <div className="ml-8 w-6/12 h-4 rounded-xl bg-orange-400 text-[10px] text-orange-700">Дундаж шат</div>
           </div>
          </button>
          <button className="flex bg-gray-800 w-3/4 py-2 rounded-lg">
           <div className="flex flex-col items-start">
            <p className="font-extrabold font-[Inter] ml-8 text-white text-[12px] ">Олон тоглогчтой горим</p>
            <p className="font-medium font-[Inter] ml-8 pb-1 text-gray-400 text-[10px] ">Бодит сүлжээ</p>
            <div className="ml-8 w-6/12 h-4 rounded-xl bg-red-400 text-[10px] text-red-700">Дээд шат</div>
           </div>
          </button>
        </div>


        {/* Video Section */}
        <div className="relative w-3/4 bg-black rounded-xl aspect-video flex items-center justify-center border border-purple-500/30 overflow-hidden">
          <img
            src="/mnt/data/127fb424-a1ff-4045-8d68-a073f90f5465.png"
            alt="Video placeholder"
            className="absolute inset-0 w-5/6 h-full object-cover opacity-20"
          />
          <button className="z-10 size-10 text-white flex items-center justify-center text-6xl hover:scale-110 transition">
            ▶
          </button>
          <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-black to-transparent p-4 text-white flex justify-between text-sm">
            <span>Хичээл 1: Тоглогчийн хөдөлгөөн</span>
            <span>12:34</span>
          </div>
        </div>

        {/* Code Editor */}
        <div className="bg-gray-900 rounded-xl w-3/4 h-64 p-4 space-y-3">
          <div className="flex justify-between items-center">
            <span className="font-bold text-sm text-white">Өөрөө туршиж үз</span>
            <button className="bg-green-500 text-white px-4 py-1 rounded-lg text-sm font-bold hover:bg-green-400 transition">
              Run Code
            </button>
          </div>
          <textarea
            placeholder={`// Кодоо энд бичнэ үү...\nvoid Update() {\n    transform.Translate(Vector3.forward * Time.deltaTime);\n}`}
            className="overflow-auto scrollbar-thin scrollbar-thumb-purple-400 scrollbar-track-purple-800 w-full h-44 bg-black text-green-400 p-4 rounded-lg font-mono text-sm border border-gray-800 focus:outline-none focus:border-purple-500 resize-none"
          />
        </div>

        {/* Footer Note */}
        <div className="bg-purple-500/10 w-3/4 h-[134px] border flex flex-col justify-center  border-purple-500 rounded-xl p-4 text-gray-300 text-sm">
          <p className="text-xl font-extrabold font-[Inter] ml-8 text-purple-400">Энэ бол 150+ хичээлийн ердөө нэг нь</p>
          <p className="text-[11px] ml-8">Тоглоом хөгжлийг эхнээс нь худалдаанд гаргах хүртэл эзэмших 12 долоо хоногийн бүрэн аяллаа нээгээрэй.</p>
        </div>

      </div>

      <div className="flex flex-col w-full items-center justify-center"> 
        <p className="m-18 text-4xl font-extrabold text-white font-[Inter]">Амжилтад хүрэх тод зам</p>
          <div className="mb-36 flex flex-row items-center justify-center w-full h-[500px]">
            {/* Foundation */}
            <div className="flex self-start size-22 mr-8 rounded-full bg-[linear-gradient(to_right,#3A8FED,#26ACD9)]"></div>
            <div className="border-2 border-stone-800 rounded-2xl mr-31 pb-12 w-1/2 h-[490px] bg-[linear-gradient(to_right,#111826,#000000)]">
              {/* Text */}
              <div className="flex flex-col justify-center w-full h-1/4 space-y-1">
                <span className="font-extrabold text-xl font-[Inter] ml-10 pt-5 text-purple-400">1-3 Долоо Хоног</span>
                <span className="font-bold text-4xl font-[Inter] ml-10 text-white">Суурь шат</span>
                <span className="font-light text-sm font-[Inter] ml-10 text-white">Үндсүүдийг бүрэн эзэмш</span>
              </div>
              {/* Cards */}
              <div className="flex flex-col font-[Inter] items-center justify-center pt-8 md:justify-between w-full h-4/5">
                <div className="flex items-center bg-black rounded-xl border border-gray-800 w-11/12 h-2/12">
                  <span className="text-m text-white ml-4 font-extralight">C# Basics & Syntax</span>
                </div>
                <div className="flex items-center bg-black rounded-xl border border-gray-800 w-11/12 h-2/12">
                  <span className="text-m text-white ml-4 font-extralight">Unity Interface Mastery</span>
                </div>
                <div className="flex items-center bg-black rounded-xl border border-gray-800 w-11/12 h-2/12">
                  <span className="text-m text-white ml-4 font-extralight">2D Game Mechanics</span>
                </div>
                <div className="flex items-center bg-black rounded-xl border border-gray-800 w-11/12 h-2/12">
                  <span className="text-m text-white ml-4 font-extralight">Ship Your First Playable Game</span>
                </div>
              </div>
            </div>
          </div>
          {/* Building */}
          <div className="mb-36 flex flex-row items-center justify-center w-full h-[500px]">
            <div className="flex self-start size-22 mr-8 rounded-full bg-[linear-gradient(to_right,#B359E3,#DE4FA8)]"></div>
            <div className="border-2 border-stone-800 rounded-2xl mr-31 pb-12 w-1/2 h-[490px] bg-[linear-gradient(to_right,#111826,#000000)]">
              {/* Text */}
              <div className="flex flex-col justify-center w-full h-1/4 space-y-1">
                <span className="font-extrabold text-xl font-[Inter] ml-10 pt-5 text-purple-400">4-6 Долоо Хоног</span>
                <span className="font-bold text-4xl font-[Inter] ml-10 text-white">Бүтээлийн шат</span>
                <span className="font-light text-sm font-[Inter] ml-10 text-white">Бодит төслүүд хийж эхэл</span>
              </div>
              {/* Cards */}
              <div className="flex flex-col items-center justify-center pt-8 md:justify-between w-full h-4/5">
                <div className="flex items-center bg-black rounded-xl border border-gray-800 w-11/12 h-2/12">
                  <span className="text-m text-white ml-4 font-extralight">3D Environments & Lighting</span>
                </div>
                <div className="flex items-center bg-black rounded-xl border border-gray-800 w-11/12 h-2/12">
                  <span className="text-m text-white ml-4 font-extralight">Character Controllers</span>
                </div>
                <div className="flex items-center bg-black rounded-xl border border-gray-800 w-11/12 h-2/12">
                  <span className="text-m text-white ml-4 font-extralight">Physics & Collision System</span>
                </div>
                <div className="flex items-center bg-black rounded-xl border border-gray-800 w-11/12 h-2/12">
                  <span className="text-m text-white ml-4 font-extralight">Complete Mobile Game</span>
                </div>
              </div>
            </div>
          </div>
          {/* Advanced */}
          <div className="mb-36 flex flex-row items-center justify-center w-full h-[500px]">
            <div className="flex self-start size-22 mr-8 rounded-full bg-[linear-gradient(to_right,#F59930,#FF3828)]"></div>
            <div className="border-2 border-stone-800 rounded-2xl mr-31 pb-12 w-1/2 h-[490px] bg-[linear-gradient(to_right,#111826,#000000)]">
              {/* Text */}
              <div className="flex flex-col justify-center w-full h-1/4 space-y-1">
                <span className="font-extrabold text-xl font-[Inter] ml-10 pt-5 text-purple-400">7-9 Долоо Хоног</span>
                <span className="font-bold text-4xl font-[Inter] ml-10 text-white">Ахисан шат</span>
                <span className="font-light text-sm font-[Inter] ml-10 text-white">Мэргэжлийн арга техникүүд</span>
              </div>
              {/* Cards */}
              <div className="flex flex-col items-center justify-center pt-8 md:justify-between w-full h-4/5">
                <div className="flex items-center bg-black rounded-xl border border-gray-800 w-11/12 h-2/12">
                  <span className="text-m text-white ml-4 font-extralight">Multiplayer Networking</span>
                </div>
                <div className="flex items-center bg-black rounded-xl border border-gray-800 w-11/12 h-2/12">
                  <span className="text-m text-white ml-4 font-extralight">AI & Pathfinding</span>
                </div>
                <div className="flex items-center bg-black rounded-xl border border-gray-800 w-11/12 h-2/12">
                  <span className="text-m text-white ml-4 font-extralight">Performance Optimization</span>
                </div>
                <div className="flex items-center bg-black rounded-xl border border-gray-800 w-11/12 h-2/12">
                  <span className="text-m text-white ml-4 font-extralight">Advanced RPG Systems</span>
                </div>
              </div>
            </div>
          </div>
          {/* Launch */}
          <div className="mb-36 flex flex-row items-center justify-center w-full h-[500px]">
            <div className="flex self-start size-22 mr-8 rounded-full bg-[linear-gradient(to_right,#7FEB57,#046922)]"></div>
            <div className="border-2 border-stone-800 rounded-2xl mr-31 pb-12 w-1/2 h-[490px] bg-[linear-gradient(to_right,#111826,#000000)]">
              {/* Text */}
              <div className="flex flex-col justify-center w-full h-1/4 space-y-1">
                <span className="font-extrabold text-xl font-[Inter] ml-10 pt-5 text-purple-400">10-12 Долоо Хоног</span>
                <span className="font-bold text-4xl font-[Inter] ml-10 text-white">Гарааны шат</span>
                <span className="font-light text-sm font-[Inter] ml-10 text-white">Арилжааны тоглоомоо худалдаанд гарга.</span>
              </div>
              {/* Cards */}
              <div className="flex flex-col items-center justify-center pt-8 md:justify-between w-full h-4/5">
                <div className="flex items-center bg-black rounded-xl border border-gray-800 w-11/12 h-2/12">
                  <span className="text-m text-white ml-4 font-extralight">Monetization Strategies</span>
                </div>
                <div className="flex items-center bg-black rounded-xl border border-gray-800 w-11/12 h-2/12">
                  <span className="text-m text-white ml-4 font-extralight">Marketing & ASO</span>
                </div>
                <div className="flex items-center bg-black rounded-xl border border-gray-800 w-11/12 h-2/12">
                  <span className="text-m text-white ml-4 font-extralight">Store Submission Process</span>
                </div>
                <div className="flex items-center bg-black rounded-xl border border-gray-800 w-11/12 h-2/12">
                  <span className="text-m text-white ml-4 font-extralight">Professional Portfolio</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      
      {/* Phase */}
      <div className="m-40 flex flex-col font-[Inter] rounded-3xl space-y-2 w-6/8 h-[550px] items-center justify-center bg-[linear-gradient(to_right,#943EE5,#D72E7B)]">
        <span className="text-6xl">🎮</span>
        <span className="font-extrabold text-xl text-white">Эхний Долоо Хоног</span>
        <span className="font-m text-white">Анхлан Суралцагч</span>
        <span className="font-m text-white mb-8 text-[13px]">Код бичих туршилаггүй</span>
        <span className="text-6xl text-amber-300">→</span>
        <span className="font-extrabold text-amber-300 text-xl">12 Долоо Хоногийн Өөрчлөлт</span>
        <span className="font-m text-white text-[13px] mb-8">150 Гаруй Хичээл • 5 Бүрэн Тоглоом</span>
        <span className="text-6xl mt-3">🚀</span>
        <span className="font-extrabold text-xl text-white">12 Дахь Долоо Хоног</span>
        <span className="font-m text-white">Тоглоом нийтэлсэн хөгжүүлэгч</span>
        <span className="font-m text-white text-[13px]">Арилжааны тоглоом гаргасан</span>
      </div>

      <div className="flex flex-col items-center w-full h-[800px]">
        <div className="m-8 flex flex-col border-2 border-stone-800 rounded-3xl w-6/8 h-[200px] items-center justify-center bg-[linear-gradient(to_bottom,#111826,#000000)]">
          <span className="font-extrabold text-2xl font-[Inter] ml-10 pt-5 text-purple-400">150+</span>
          <span className="font-bold text-sm font-[Inter] ml-10 text-white">Видео Хичээлүүд</span>
          <span className="font-light text-[10px] font-[Inter] ml-10 text-gray-500">HD контент</span>
        </div>
        <div className="m-8 flex flex-col border-2 border-stone-800 rounded-3xl w-6/8 h-[200px] items-center justify-center bg-[linear-gradient(to_bottom,#111826,#000000)]">
          <span className="font-extrabold text-2xl font-[Inter] ml-10 pt-5 text-purple-400">50+</span>
          <span className="font-bold text-sm font-[Inter] ml-10 text-white">Кодын Дасгалууд</span>
          <span className="font-light text-[10px] font-[Inter] ml-10 text-gray-500">Бодитоор Хийж Сургах Дадлага</span>
        </div>
        <div className="m-8 flex flex-col border-2 border-stone-800 rounded-3xl w-6/8 h-[200px] items-center justify-center bg-[linear-gradient(to_bottom,#111826,#000000)]">
          <span className="font-extrabold text-2xl font-[Inter] ml-10 pt-5 text-purple-400">5</span>
          <span className="font-bold text-sm font-[Inter] ml-10 text-white">Бүрэн Хэмжээний Тоглоомууд</span>
          <span className="font-light text-[10px] font-[Inter] ml-10 text-gray-500">Портфолиод Бэлэн</span>
        </div>
        <div className="m-8 flex flex-col border-2 border-stone-800 rounded-3xl w-6/8 h-[200px] items-center justify-center bg-[linear-gradient(to_bottom,#111826,#000000)]">
          <span className="font-extrabold text-2xl font-[Inter] ml-10 pt-5 text-purple-400">15k+</span>
          <span className="font-bold text-sm font-[Inter] ml-10 text-white">Идэвхтэй Суралцагчид</span>
          <span className="font-light text-[10px] font-[Inter] ml-10 text-gray-500">Өргөжин Тэлж Буй Хамт Олон</span>
        </div>
      </div>

      <div className="m-8 flex flex-col border-4 border-green-500 rounded-3xl w-1/3 h-[570px] items-center justify-center bg-[linear-gradient(to_bottom,#111826,#000000)]">
        <div className="flex justify-center items-end w-full h-1/3">
          <span className="text-white text-3xl font-black font-[Inter]">Our Guarantee To You</span>
        </div>
        <div className="flex flex-col ml-16 space-y-4 justify-center w-full h-3/6">
          <div className="flex flex-row">
            <div className="flex flex-col justify-center">
              <span className="text-white text-m font-bold">30-Day Money Back Guarantee</span>
              <span className="text-gray-600 text-sm">Not satisfied? Get a full refund, no questions asked.</span>
            </div>
          </div>
          <div className="flex flex-row">
            <div className="flex flex-col justify-center">
              <span className="text-white text-m font-bold">Job Placement Support</span>
              <span className="text-gray-600 text-sm">No offer in 6 months? Get a refund + 6 more months free mentorship.</span>
            </div>
          </div>
          <div className="flex flex-row">
            <div className="flex flex-col justify-center">
              <span className="text-white text-m font-bold">Lifetime Access</span>
              <span className="text-gray-600 text-sm">All lessons, updates, and future content included forever.</span>
            </div>
          </div>
        </div>
        <span className="flex text-green-400 justify-center font-bold">Zero Risk, All Reward</span>
      </div>

      <div className="m-40 flex flex-col rounded-3xl w-6/8 h-[550px] items-center justify-center bg-[linear-gradient(to_right,#943EE5,#D72E7B)]">
        <div className="flex flex-col gap-5 justify-center items-center w-full h-1/3">
          <div className="w-full h-1/2"></div>
          <span className="text-5xl font-black text-white">Ready To Start Your Journey?</span>
          <span className="text-2xl font-[Inter] font-extralight text-white">Join 15,000+ developers who transformed their careers. Start building real game today.</span>
        </div>
        <div className="flex flex-row justify-center items-center gap-5 w-full h-1/4">
          <button className="w-2/9 h-1/2 font-bold bg-white hover:bg-stone-300 text-purple-950 rounded-full border-2 border-purple-800" onClick={() => router.push('/Curriculum')}>Одоо бүртгүүлэх - 30K</button>
          <button className="w-2/9 h-1/2 font-bold bg-black/50 hover:bg-stone-300 text-white rounded-full border-2 border-white" onClick={() => router.push('/Curriculum')}>View Curriculum</button>
        </div>
        <div className="flex flex-col justify-center items-center w-full h-1/5">
          <div className="flex flex-row gap-8 justify-center w-full h-1/2">
            <span className="text-sm text-white font-m">30-Days Money Back</span>
            <span className="text-sm text-white font-m">Lifetime Access</span>
            <span className="text-sm text-white font-m">Job Guarantee</span>
          </div>
          <span className="text-lg text-yellow-400 font-bold">Next cohort starts in Dec 1st - Only 8 spots remaining.</span>
        </div>
      </div>
    </div>
  );
}