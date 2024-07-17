const loading = () => {
  return (
    <div className="w-full min-h-[40vh] flex items-center justify-center gap-10 flex-wrap">
      <div className="flex-[1] h-[200px] md:h-[260px] basis-[200px] max-w-[400px] bg-slate-400 animate-pulse rounded-md"></div>
      <div className="flex-[1] h-[200px] md:h-[260px] basis-[200px] max-w-[400px] bg-slate-400 animate-pulse rounded-md"></div>
      <div className="flex-[1] h-[200px] md:h-[260px] basis-[200px] max-w-[400px] bg-slate-400 animate-pulse rounded-md"></div>
      <div className="flex-[1] h-[200px] md:h-[260px] basis-[200px] max-w-[400px] bg-slate-400 animate-pulse rounded-md"></div>
    </div>
  );
};

export default loading;
