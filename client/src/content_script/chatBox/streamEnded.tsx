export default function EndStream() {
  const handleContinue = () => {
    window.location.reload();
  };
  return (
    <div
      className="fixed inset-0 bg-slate-950/80 flex items-center justify-center"
      style={{
        transform: "scale(2)",
        zIndex: 999,
      }}
    >
      <div
        className="bg-slate-900/90 rounded-3xl p-8 flex flex-col items-center gap-6 border border-blue-900/30 shadow-2xl shadow-blue-500/10"
        style={{ width: "11%" }}
      >
        <h1 className="text-xl font-semibold text-gray-200 text-center">
          StreamSync Chat Ended by Host
        </h1>
        <button
          onClick={handleContinue}
          className="relative w-full h-12 px-4 py-2 
                   bg-gradient-to-r from-slate-800/90 to-slate-900/90
                   text-gray-200 font-semibold rounded-xl 
                   border border-white/10 hover:border-white/20
                   transition-all duration-300 ease-in-out
                   shadow-lg shadow-blue-500/20
                   hover:shadow-violet-500/30 hover:from-slate-800/95 hover:to-slate-900/95
                   "
        >
          <span className="group-hover:text-white transition-colors">
            Continue
          </span>
        </button>
      </div>
    </div>
  );
}
