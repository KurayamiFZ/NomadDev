"use client";

import { useRouter } from "next/navigation";

type Project = {
  name: string;
  description: string;
  tags: string[];
  likes: number;
  views: number;
  color: string;
  featured?: boolean;
};

const projectsData: Project[] = [
  {
    name: "Space Shooter 2D",
    description:
      "Classic arcade-style space shooter with power-ups and boss battles",
    tags: ["Unity", "C#", "Pixel Art"],
    likes: 234,
    views: 1205,
    color: "from-blue-600 to-blue-800",
    featured: true,
  },
  {
    name: "Platformer Adventure",
    description: "Retro platformer with smooth movement and challenging levels",
    tags: ["Unity", "C#", "2D animation"],
    likes: 189,
    views: 892,
    color: "from-green-600 to-green-800",
  },
  {
    name: "Puzzle Maze",
    description: "Mind bending puzzle game with 50+ levels",
    tags: ["Unity", "C#", "Level Design"],
    likes: 156,
    views: 673,
    color: "from-purple-600 to-purple-800",
  },
];

export default function Home() {
  const router = useRouter();

  return (
    <div className="min-h-screen w-full bg-black text-white p-6">
      {/* RESPONSIVE GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {projectsData.map((project, i) => (
          <div
            key={i}
            onClick={() => router.push(`/projects/${project.name}`)}
            className={`aspect-square rounded-xl p-4 cursor-pointer flex flex-col justify-between
              bg-linear-to-br ${project.color} hover:scale-[1.02] transition`}
          >
            {/* Top */}
            <div>
              <h3 className="text-lg font-bold">{project.name}</h3>
              <p className="text-sm opacity-80 mt-1 line-clamp-3">
                {project.description}
              </p>
            </div>

            {/* Bottom */}
            <div className="space-y-2">
              <div className="flex flex-wrap gap-1">
                {project.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="text-xs bg-black/30 px-2 py-0.5 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex justify-between text-xs opacity-80">
                <span>❤️ {project.likes}</span>
                <span>👁 {project.views}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
