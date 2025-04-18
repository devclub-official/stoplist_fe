import developerBadge from "@/asset/badge/developer-badge.svg";
import helchangBadge from "@/asset/badge/helchang-badge.svg";
import ilzallerBadge from "@/asset/badge/ilzaller-badge.svg";
import jaetaekBadge from "@/asset/badge/jaetaek-badge.svg";
import positiveBadge from "@/asset/badge/positive-badge.svg";
import {useEffect, useState} from "react";
import {axiosInstance} from "@api/apiClient.ts";

const personaBadgeMap = [
    { name: "스티븐 잡스", src: developerBadge },
    { name: "김종국", src: helchangBadge },
    { name: "찰스", src: ilzallerBadge },
    { name: "워렌 버핏", src: jaetaekBadge },
    { name: "장원영", src: positiveBadge },
];

type BadgeProps = {
    name: string;
    flag: boolean;
}

function BadgePage() {
    const [userBadgeList, setUserBadgeList] = useState<BadgeProps[]>([]);

    useEffect(() => {
        const userId = localStorage.getItem('userId')

        axiosInstance.get(`api/badge/${userId}`).then(res => {
            if(res.status === 200) {
                setUserBadgeList(res.data.data);
            } else {
                alert(`${res.data.data}`);
            }
        });
    }, []);
  return (
    <div className="pt-10 px-4 h-full">
      <div className="grid grid-cols-3 gap-4">
        {userBadgeList.map((userBadge, index) => {
            const matchedPersona = personaBadgeMap.find(
                (personaBadge) => personaBadge.name === userBadge.name
            );
            return (
                <div
                    key={index}
                    className="flex flex-col items-center justify-center p-4 rounded-lg"
                >
                    <div className="relative">
                        <img
                            src={matchedPersona?.src}
                            alt={userBadge.name}
                            className={`w-16 h-16 mb-2 ${
                                !userBadge.flag ? "filter grayscale opacity-50" : ""
                            }`}
                        />
                    </div>
                    <span className="text-sm font-medium">{userBadge.name}</span>
                </div>
            )
        })}
      </div>
    </div>
  );
}

export default BadgePage;
