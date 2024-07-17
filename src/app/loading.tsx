const loading = () => {
  return (
    <div className="w-screen h-screen bg-black/50 flex items-center justify-center gap-4 absolute z-[9999] left-0 top-0">
      <div className="w-4 h-4 rounded-full bg-green-600 animate-bounce"></div>
      <div className="w-4 h-4 rounded-full bg-green-600 animate-bounce [animation-delay:-.3s]"></div>
      <div className="w-4 h-4 rounded-full bg-green-600 animate-bounce [animation-delay:-.5s]"></div>
    </div>
  );
};

export default loading;
