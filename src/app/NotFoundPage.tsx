import { useNavigate } from 'react-router-dom';

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-white px-4 text-center">
        <h1 className="text-4xl font-bold text-orange-500 mb-2">404</h1>
        <p className="text-gray-600 mb-6">페이지를 찾을 수 없습니다.</p>
        <button
            className="rounded-full bg-orange-400 px-6 py-2 text-white hover:bg-orange-500"
            onClick={() => navigate('/')}
        >
          홈으로 돌아가기
        </button>
      </div>
  );
};

export default NotFoundPage;
