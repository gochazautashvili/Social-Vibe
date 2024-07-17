const loading = () => {
  return (
    <div className="w-[1200px] min-h-[600px] p-5 m-4 rounded border-2 gap-10 flex justify-center flex-wrap">
      <div className="flex-[1] h-[200px] md:h-[260px] basis-[200px] max-w-[400px] bg-slate-400 animate-pulse rounded-md"></div>
      <div className="flex-[1] h-[200px] md:h-[260px] basis-[200px] max-w-[400px] bg-slate-400 animate-pulse rounded-md"></div>
      <div className="flex-[1] h-[200px] md:h-[260px] basis-[200px] max-w-[400px] bg-slate-400 animate-pulse rounded-md"></div>
      <div className="flex-[1] h-[200px] md:h-[260px] basis-[200px] max-w-[400px] bg-slate-400 animate-pulse rounded-md"></div>
    </div>
  );
};

export default loading;
