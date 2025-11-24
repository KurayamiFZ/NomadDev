import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen w-screen 
                bg-neutral-950 
                bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(41,19,60,1),rgba(255,255,255,0))]
                bg-fixed
                items-center">
      
      <div className="mt-8 rounded-3xl h-[3px] w-[490px] items-center justify-center px-3 py-5 bg-[linear-gradient(to_right,#A95BF0,#E94D9B)]">
        <p className="-m-3 flex justify-center font-extrabold">
          Одоогоор 2,847 сурагч шууд хичээллэж байна
        </p>
      </div>

      <p className="mt-16 text-6xl font-extrabold">3 сарын таны аялал</p>

      <span className="bg-[linear-gradient(to_right,#A95BF0,#E94D9B)] font-[Inter] font-extrabold text-5xl bg-clip-text text-transparent">
        Тэгээс эхлээд тоглоом хөгжүүлэгч болтлоо
      </span>

      <p className="mt-8 text-gray-500 text-2xl">
        Батлагдсан хөтөлбөрөө шууд хичээлийн демогоор туршаад үз. Бүртгэл шаардлагагүй.
      </p>

      <div className="w-2/3 py-8 border-2 flex flex-col justify-center items-center border-fuchsia-900 bg-stone-950 rounded-3xl mt-8 space-y-6">

        {/* Lesson Tabs */}
        <div className="flex flex-col items-center gap-3">
          <button className="bg-linear-to-r from-purple-500 to-pink-500 text-white w-[1050px] py-3 rounded-lg font-bold">
            Тоглогчийн хөдөлгөөн
          </button>
          <button className="bg-gray-800 text-gray-400 w-[1050px] py-3 rounded-lg hover:bg-gray-700">
            Дайсны хиймэл оюун
          </button>
          <button className="bg-gray-800 text-gray-400 w-[1050px] py-3 rounded-lg hover:bg-gray-700">
            Олон тоглогчтой сүлжээ
          </button>
        </div>

        {/* Video Section */}
        <div className="relative w-5/6 bg-black rounded-xl aspect-video flex items-center justify-center border border-purple-500/30 overflow-hidden">
          <img
            src="/mnt/data/127fb424-a1ff-4045-8d68-a073f90f5465.png"
            alt="Video placeholder"
            className="absolute inset-0 w-5/6 h-full object-cover opacity-20"
          />
          <button className="z-10 w-20 h-20 bg-white rounded-full flex items-center justify-center hover:scale-110 transition">
            ▶
          </button>
          <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-black to-transparent p-4 text-white flex justify-between text-sm">
            <span>Хичээл 1: Тоглогчийн хөдөлгөөн</span>
            <span>12:34</span>
          </div>
        </div>

        {/* Code Editor */}
        <div className="bg-gray-900 rounded-xl w-[1050px] h-[417px] p-4 border border-gray-800 space-y-3">
          <div className="flex justify-between items-center">
            <span className="font-bold text-purple-400">Өөрөө туршиж үз</span>
            <button className="bg-green-500 px-4 py-2 rounded-lg text-sm font-bold hover:bg-green-400 transition">
              Run Code
            </button>
          </div>
          {/*<textarea
            value={codeSample}
            onChange={(e) => setCodeSample(e.target.value)}
            placeholder={`// Кодоо энд бичнэ үү...\nvoid Update() {\n    transform.Translate(Vector3.forward * Time.deltaTime);\n}`}
            className="w-full h-32 bg-black text-green-400 p-4 rounded-lg font-mono text-sm border border-gray-800 focus:outline-none focus:border-purple-500 resize-none"
          />*/}
        </div>

        {/* Footer Note */}
        <div className="bg-purple-500/10 w-[1050px] h-[134px] border flex items-center justify-start  border-purple-500 rounded-xl p-4 text-gray-300 text-sm">
          Энэхүү хичээл бол 150+ хичээлийн ердөө нэг нь юм.
        </div>

      </div>

      <div className="flex flex-col w-full items-center justify-center"> 
        <p className="m-18 text-6xl font-extrabold font-[Inter]">Амжилтад хүрэх тод зам</p>
        <div className="mb-36 flex flex-row items-center justify-evenly w-full h-[500px]">
          <div className="flex self-start size-25 ml-36 rounded-full bg-[linear-gradient(to_right,#3A8FED,#26ACD9)]"></div>
          <div className="border-2 border-stone-800 rounded-2xl pb-12 mr-80 w-2/4 h-[490px] bg-[linear-gradient(to_right,#111826,#000000)]"></div>
        </div>
        <div className="mb-36 flex flex-row items-center justify-evenly w-full h-[500px]">
          <div className="flex self-start size-25 ml-36 rounded-full bg-[linear-gradient(to_right,#B359E3,#DE4FA8)]"></div>
          <div className="border-2 border-stone-800 rounded-2xl pb-12 mr-80 w-2/4 h-[490px] bg-[linear-gradient(to_right,#111826,#000000)]"></div>
        </div>
        <div className="mb-36 flex flex-row items-center justify-evenly w-full h-[500px]">
          <div className="flex self-start size-25 ml-36 rounded-full bg-[linear-gradient(to_right,#F56B30,#EE4F43)]"></div>
          <div className="border-2 border-stone-800 rounded-2xl pb-12 mr-80 w-2/4 h-[490px] bg-[linear-gradient(to_right,#111826,#000000)]"></div>
        </div>
      </div>
      
      <div className="m-40 flex flex-col rounded-3xl w-[1750px] h-[550px] items-center justify-center bg-[linear-gradient(to_right,#943EE5,#D72E7B)]">

      </div>
      <div className="flex flex-col items-center w-full h-[800px]">
        <div className="m-8 flex flex-col border-2 border-stone-800 rounded-3xl w-[1750px] h-[200px] items-center justify-center bg-[linear-gradient(to_bottom,#111826,#000000)]">

        </div>
        <div className="m-8 flex flex-col border-2 border-stone-800 rounded-3xl w-[1750px] h-[200px] items-center justify-center bg-[linear-gradient(to_bottom,#111826,#000000)]">

        </div>
        <div className="m-8 flex flex-col border-2 border-stone-800 rounded-3xl w-[1750px] h-[200px] items-center justify-center bg-[linear-gradient(to_bottom,#111826,#000000)]">

        </div>
        <div className="m-8 flex flex-col border-2 border-stone-800 rounded-3xl w-[1750px] h-[200px] items-center justify-center bg-[linear-gradient(to_bottom,#111826,#000000)]">

        </div>
      </div>
      <div className="m-8 flex flex-col border-4 border-green-500 rounded-3xl w-[874px] h-[570px] items-center justify-center bg-[linear-gradient(to_bottom,#111826,#000000)]">

      </div>
      <div className="m-40 flex flex-col rounded-3xl w-[1750px] h-[550px] items-center justify-center bg-[linear-gradient(to_right,#943EE5,#D72E7B)]">

      </div>
    </div>
  );
}
