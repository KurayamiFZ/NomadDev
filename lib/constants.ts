export interface RoadmapPhase {
  weeks: string;
  title: string;
  subtitle: string;
  gradient: string;
  items: string[];
}

export interface Stat {
  value: string;
  label: string;
  sub: string;
}

export interface Guarantee {
  title: string;
  desc: string;
}

export interface LandingLesson {
  title: string;
  subtitle: string;
  level: string;
  levelColor: string;
}

// Landing lessons - demo lessons for interactive preview
export const LANDING_LESSONS: LandingLesson[] = [
  {
    title: "Тоглогчийн хөдөлгөөн",
    subtitle: "2D удирдлага сур",
    level: "Анхлан",
    levelColor: "bg-emerald-500/20 text-emerald-400",
  },
  {
    title: "Дайсны AI",
    subtitle: "Ухаантай өрсөлдөгчид",
    level: "Дунд",
    levelColor: "bg-amber-500/20 text-amber-400",
  },
  {
    title: "Олон тоглогчийн горим",
    subtitle: "Жинхэнэ сүлжээ",
    level: "Дэвшилтэт",
    levelColor: "bg-rose-500/20 text-rose-400",
  },
];

// Roadmap phases - learning journey phases
export const ROADMAP_PHASES: RoadmapPhase[] = [
  {
    weeks: "1-3-р долоо хоног",
    title: "Суурь",
    subtitle: "Үндсийг эзэмш",
    gradient: "from-blue-500 to-cyan-400",
    items: [
      "Програмчлалын үндсэн ойлголтууд",
      "Хөгжүүлэлтийн орчин тохируулах",
      "Үндсэн зарчмууд & Шилдэг аргууд",
      "Анхны төслөө бүтээ",
    ],
  },
  {
    weeks: "4-6-р долоо хоног",
    title: "Бүтээх",
    subtitle: "Жинхэнэ төслүүд эхлүүл",
    gradient: "from-purple-500 to-pink-500",
    items: [
      "Дэвшилтэт арга техникүүд",
      "Төслийн архитектур",
      "Асуудал шийдвэрлэх чадвар",
      "Портфолио төсөл дуусга",
    ],
  },
  {
    weeks: "7-9-р долоо хоног",
    title: "Дэвшилтэт",
    subtitle: "Мэргэжлийн арга техникүүд",
    gradient: "from-orange-500 to-red-500",
    items: [
      "Салбарын шилдэг аргууд",
      "Гүйцэтгэлийн оновчлол",
      "Дэвшилтэт загварууд",
      "Мэргэжлийн хөгжил",
    ],
  },
  {
    weeks: "10-12-р долоо хоног",
    title: "Нээлт",
    subtitle: "Эцсийн төслөө гарга",
    gradient: "from-emerald-500 to-green-600",
    items: [
      "Эцсийн төслийн засвар",
      "Портфолио хөгжүүлэлт",
      "Ажил мэргэжлийн бэлтгэл",
      "Төгсөлт & Гэрчилгээ",
    ],
  },
];

// Statistics - course statistics
// export const STATS: Stat[] = [
//   { value: "12+", label: "Видео хичээлүүд", sub: "HD агуулга" },
//   { value: "8+", label: "Кодны дасгалууд", sub: "Практик дадлага" },
//   { value: "4", label: "Дууссан төслүүд", sub: "Портфолиод бэлэн" },
//   {
//     value: "1000+",
//     label: "Идэвхтэй суралцагсад",
//     sub: "Өсөн нэмэгдэж буй нийгэмлэг",
//   },
// ];

// Guarantees - course guarantees and promises
export const GUARANTEES: Guarantee[] = [
  // {
  //   title: "30 хоногийн мөнгөн баталгаа",
  //   desc: "Сэтгэл хангалуун бус уу? Ямар ч асуултгүйгээр бүрэн буцаан олгоно.",
  // },
  {
    title: "Насан туршийн хандалт",
    desc: "Бүх хичээл, шинэчлэлт болон ирэх агуулгыг хязгааргүй ашиглах эрхтэй.",
  },
  {
    title: "Мэргэжлийн дэмжлэг",
    desc: "Хэрэгтэй үедээ багш нараасаа тусламж авах боломжтой.",
  },
];
