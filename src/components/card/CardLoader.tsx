const CardLoader = () => {
  return (
    <div className="flex flex-col items-center gap-10 flex-[6]">
      <Loader />
      <Loader />
      <Loader />
    </div>
  );
};

export default CardLoader;

const Loader = () => {
  return (
    <div className="flex flex-col gap-4 w-full max-w-[468px]">
      <div className="flex justify-between">
        <div className="w-300px h-10 bg-slate-400 rounded"></div>
        <div className="w-10 h-10 bg-slate-400 rounded"></div>
      </div>
      <div className="w-full lg:h-[600px] md:h-[500px] h-[350px] bg-slate-400 animate-pulse rounded"></div>
      <div className="w-full h-20 bg-slate-400 animate-pulse rounded"></div>
    </div>
  );
};
