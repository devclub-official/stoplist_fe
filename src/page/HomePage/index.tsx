import { useState, useEffect } from "react";
import Confetti from "react-confetti";

function HomePage() {
  const [showConfetti, setShowConfetti] = useState(false);
  const [windowDimension, setWindowDimension] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowDimension({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (showConfetti) {
      const timer = setTimeout(() => {
        setShowConfetti(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [showConfetti]);

  const handleAchievement = () => {
    setShowConfetti(true);
  };

  return (
    <div className="flex items-center pt-10 h-full flex-col px-4 gap-10 relative">
      {showConfetti && (
        <Confetti
          width={windowDimension.width}
          height={windowDimension.height}
          recycle={false}
          numberOfPieces={500}
          gravity={0.2}
        />
      )}

      <h2 className="text-primary">n주차</h2>
      <div className="w-full flex items-center justify-center h-40 bg-coral-100 rounded-3xl">
        <div>미션 어쩌구 저쩌구</div>
      </div>
      <button
        className="bg-primary text-white text-m16 px-10 py-4 rounded-xl transition-transform active:scale-95"
        onClick={handleAchievement}
      >
        달성했어요
      </button>
    </div>
  );
}

export default HomePage;
