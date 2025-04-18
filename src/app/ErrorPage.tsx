const ErrorPage = () => {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-white px-4 text-center">
            <h1 className="text-4xl font-bold text-orange-500 mb-4">문제가 발생했어요</h1>
            <p className="text-gray-600 text-sm mb-6">잠시 후 다시 시도하거나 관리자에게 문의해주세요.</p>
            <button
                className="rounded-full bg-orange-400 px-6 py-2 text-white hover:bg-orange-500"
                onClick={() => window.location.reload()}
            >
                새로고침
            </button>
        </div>
    );
};

export default ErrorPage;
