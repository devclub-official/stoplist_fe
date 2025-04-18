const LoadingPage = () => {
    return (
        <div className="flex min-h-screen items-center justify-center bg-white">
            <div className="flex flex-col items-center gap-2">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-orange-400 border-t-transparent"></div>
                <p className="text-sm text-gray-600">불러오는 중...</p>
            </div>
        </div>
    );
};

export default LoadingPage;
