export default function Header() {
  return (
    <div className="sticky top-0 z-10 backdrop-blur-xl bg-slate-900/80 border-b border-slate-800/50">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold text-white">
            StreamSyn
          </h1>
        </div>
      </div>
    </div>
  );
}
