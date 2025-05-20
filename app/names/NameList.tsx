export default function NameList({ results, copiedIdx, handleCopy }: {
  results: string[];
  copiedIdx: number | null;
  handleCopy: (name: string, idx: number) => void;
}) {
  if (results.length === 0) return null;
  return (
    <div className="space-y-3">
      <h2 className="text-xl font-semibold mb-2 text-blue-700 flex items-center gap-2">
        <span role="img" aria-label="palette">🎨</span> Stylish Names:
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {results.map((name, idx) => (
          <div key={idx} className="p-3 bg-white border border-gray-200 rounded-lg text-lg font-mono select-all shadow-sm flex items-center gap-2 hover:bg-blue-50 transition cursor-pointer">
            <span className="flex-1 break-all">{name}</span>
            <button
              onClick={() => handleCopy(name, idx)}
              className={`px-2 py-1 rounded text-xs font-semibold border ${copiedIdx === idx ? 'bg-green-100 border-green-400 text-green-700' : 'bg-blue-100 border-blue-400 text-blue-700 hover:bg-blue-200'} transition`}
            >
              {copiedIdx === idx ? 'Copied!' : 'Copy'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
} 