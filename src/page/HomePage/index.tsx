import {useState, useEffect, useMemo} from "react";
import Confetti from "react-confetti";
import {axiosInstance} from "@api/apiClient.ts";

const personaName = ['스티븐 잡스', '워렌 버핏', '김종국', '찰스', '장원영'];

function HomePage() {
  const nonConfetti = 116;
  const [showConfetti, setShowConfetti] = useState(false);
  const [windowDimension, setWindowDimension] = useState({
    width: window.innerWidth,
    height: window.innerHeight - nonConfetti,
  });
  const [week, setWeek] = useState<number>(0);
  const [flag, setFlag] = useState<boolean>(false);
  const [content, setContent] = useState<string>('');
  const [mappingId, setMappingId] = useState<number>(0);

  const userId = localStorage.getItem('userId')

  useEffect(() => {
    const handleResize = () => {
      setWindowDimension({
        width: window.innerWidth,
        height: window.innerHeight - nonConfetti,
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

  useEffect(()=>{

    axiosInstance.get(`api/goal/${userId}`).then(res => {
      if(res.status === 200) {
        console.log(res.data);
        setWeek(res.data.data.week);
        setFlag(res.data.data.flag);
        setContent(res.data.data.content);
        setMappingId(res.data.data.mappingId);
      } else {
        alert(`${res.data.data}`);
      }
    });
  },[])

  const handleAchievement = () => {
    axiosInstance.post(`api/goal/flag`,{mappingId:mappingId, flag:flag})
    //     .then(res => {
    //   if(res.status === 200) {
    //     console.log('res',res)
    //     setWeek(res.data.data.week);
    //     setFlag(res.data.data.flag);
    //     setContent(res.data.data.content);
    //     setMappingId(res.data.data.mappingId);
    //   } else {
    //     alert(`${res.data.data}`);
    //   }
    // });


    if(!flag) setShowConfetti(true);
  };
  const persona_name = useMemo(() => {
    return personaName[Number(localStorage.getItem('personaId'))-1]
  },[])

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
        <div className="text-center">
          <h2 className="text-primary pb-2">{week}주차</h2>
          <div className="text-m14">오늘도 {persona_name} 따라 잡아볼까요?</div>
        </div>
        <div className="w-full flex items-center justify-center text-m18 h-40 bg-coral-100 rounded-3xl">
          <div>{content}</div>
        </div>
        {/*<button*/}
        {/*    className="bg-primary text-white text-m16 px-10 py-4 rounded-xl transition-transform active:scale-95"*/}
        {/*    onClick={handleAchievement}*/}
        {/*>*/}
        {/*  달성했어요*/}
        {/*</button>*/}
        <button
            onClick={handleAchievement}
            className={`text-m16 px-10 py-4 rounded-xl transition-transform active:scale-95
    ${!flag ? 'bg-gray-200 text-gray-500' : 'bg-gray-200 text-gray-500'}
  `}
        >
          {!flag ? '달성했어요' : '달성했어요'}
        </button>
      </div>
  );
}

export default HomePage;
