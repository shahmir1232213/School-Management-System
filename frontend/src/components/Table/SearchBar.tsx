import { useEffect, useState } from "react";

interface Props {
  character: string;
  value: string;
  onDebouncedChange: (value: string) => void;
}

const SearchBar: React.FC<Props> = ({ character, value, onDebouncedChange }) => {
  const [inputValue, setInputValue] = useState(value);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      onDebouncedChange(inputValue.trim());
    }, 350);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [inputValue, onDebouncedChange]);

  return (
    <div className="flex h-[8vh] w-full items-center gap-3">
      <div className="flex h-[70%] w-32 items-center justify-center rounded-xl border-2 border-slate-200 bg-slate-50 text-sm font-semibold text-slate-500">
        Search
      </div>
      <input
        className="h-[70%] w-full rounded-xl border-2 border-slate-200 bg-white px-5 text-slate-700 outline-none transition focus:border-[#0d9488]"
        type="text"
        value={inputValue}
        onChange={(event) => setInputValue(event.target.value)}
        placeholder={`Search ${character} records`}
      />
    </div>
  );
};

export default SearchBar;
