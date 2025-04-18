function HomePage() {
  return (
    <div className="flex justify-center items-center h-full flex-col px-4 gap-10">
      <h1 className="text-primary">n주차</h1>
      <div className="w-full flex items-center justify-center h-40 bg-coral-100 rounded-3xl">
        <div>미션 어쩌구 저쩌구</div>
      </div>
      <button className="bg-primary text-white text-m16 px-10 py-4 rounded-xl">
        달성했어요
      </button>
    </div>
  );
}

export default HomePage;
