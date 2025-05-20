import { Input } from "@/components/ui/input";

export default function NameInput({ input, setInput, onClear, styleCount }: {
  input: string;
  setInput: (val: string) => void;
  onClear: () => void;
  styleCount: number;
}) {
  return (
    <div className="w-full flex flex-col items-center mb-2">
      <Input
        type="text"
        value={input}
        onChange={e => setInput(e.target.value)}
        placeholder="Enter your name or text..."
        className="w-full max-w-md mb-2 text-lg px-4 py-3 border-2 border-blue-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        autoFocus
      />
      <div className="flex gap-2 w-full max-w-md">
        <button
          onClick={onClear}
          className="px-3 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 text-sm font-medium transition"
          disabled={!input.trim()}
        >
          Clear
        </button>
        <span className="ml-auto text-xs text-gray-500 self-center">{styleCount} styles</span>
      </div>
    </div>
  );
} 