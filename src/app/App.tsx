import { Outlet, Link, useLocation } from "react-router-dom";

function App() {
  const location = useLocation();

  const isActive = (path: string): boolean => {
    return location.pathname === path;
  };

  return (
    <div className="flex flex-col h-screen">
      <main className="flex-1 overflow-auto pb-16">
        <Outlet />
      </main>

      <nav className="fixed bottom-0 w-full bg-white border-t border-grey-20 h-16 flex justify-around items-center px-4 safe-area-inset-padding-bottom">
        <Link
          to="/mypage"
          className={`flex flex-col items-center justify-center rounded-lg w-20 h-12 ${
            isActive("/mypage")
              ? "bg-coral-600 text-white"
              : "bg-white text-coral-600"
          }`}
        >
          <img
            src={
              isActive("/mypage")
                ? "/src/asset/mypage-icon-white.svg"
                : "/src/asset/mypage-icon.svg"
            }
            alt="마이페이지"
            className="w-5 h-5 mb-1"
          />
          <span className="text-m12">마이페이지</span>
        </Link>

        <Link
          to="/home"
          className={`flex flex-col items-center justify-center rounded-lg w-20 h-12 ${
            isActive("/home")
              ? "bg-coral-600 text-white"
              : "bg-white text-coral-600"
          }`}
        >
          <img
            src={
              isActive("/home")
                ? "/src/asset/home-icon-white.svg"
                : "/src/asset/home-icon.svg"
            }
            alt="홈"
            className="w-5 h-5 mb-1"
          />
          <span className="text-m12">홈</span>
        </Link>

        <Link
          to="/badges"
          className={`flex flex-col items-center justify-center rounded-lg w-20 h-12 ${
            isActive("/badges")
              ? "bg-coral-600 text-white"
              : "bg-white text-coral-600"
          }`}
        >
          <img
            src={
              isActive("/badges")
                ? "/src/asset/badge-icon-white.svg"
                : "/src/asset/badge-icon.svg"
            }
            alt="배지"
            className="w-5 h-5 mb-1"
          />
          <span className="text-m12">배지</span>
        </Link>
      </nav>
    </div>
  );
}

export default App;
