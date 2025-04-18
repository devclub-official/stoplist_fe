// src/page/BadgePage/index.tsx

import developerBadge from "@/asset/badge/developer-badge.svg";
import helchangBadge from "@/asset/badge/helchang-badge.svg";
import ilzallerBadge from "@/asset/badge/ilzaller-badge.svg";
import jaetaekBadge from "@/asset/badge/jaetaek-badge.svg";
import positiveBadge from "@/asset/badge/positive-badge.svg";

const badges = [
  { name: "김종국", src: developerBadge },
  { name: "헬창", src: helchangBadge },
  { name: "일잘러", src: ilzallerBadge },
  { name: "재테크", src: jaetaekBadge },
  { name: "긍정왕", src: positiveBadge },
];

function BadgePage() {
  return (
    <div className="pt-10 px-4 h-full">
      <div className="grid grid-cols-3 gap-4">
        {badges.map((badge, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center p-4 border rounded-lg shadow hover:shadow-md transition"
          >
            <img src={badge.src} alt={badge.name} className="w-16 h-16 mb-2" />
            <span className="text-sm font-medium">{badge.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BadgePage;
