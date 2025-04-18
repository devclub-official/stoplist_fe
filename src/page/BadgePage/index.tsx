// src/page/BadgePage/index.tsx
import developerBadge from "@/asset/badge/developer-badge.svg";
import helchangBadge from "@/asset/badge/helchang-badge.svg";
import ilzallerBadge from "@/asset/badge/ilzaller-badge.svg";
import jaetaekBadge from "@/asset/badge/jaetaek-badge.svg";
import positiveBadge from "@/asset/badge/positive-badge.svg";

const badges = [
  { name: "찰스", src: developerBadge, isActive: false },
  { name: "헬창", src: helchangBadge, isActive: true },
  { name: "일잘러", src: ilzallerBadge, isActive: true },
  { name: "재테크", src: jaetaekBadge, isActive: false },
  { name: "긍정왕", src: positiveBadge, isActive: true },
];

function BadgePage() {
  return (
    <div className="pt-10 px-4 h-full">
      <div className="grid grid-cols-3 gap-4">
        {badges.map((badge, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center p-4 rounded-lg"
          >
            <div className="relative">
              <img
                src={badge.src}
                alt={badge.name}
                className={`w-16 h-16 mb-2 ${
                  !badge.isActive ? "filter grayscale opacity-50" : ""
                }`}
              />
            </div>
            <span className="text-sm font-medium">{badge.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BadgePage;
