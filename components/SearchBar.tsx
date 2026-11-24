// Controlled text input. The parent owns the value and passes onChange.

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function SearchBar({ value, onChange, placeholder = "Search..." }: SearchBarProps) {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full rounded-lg border border-amber-200 bg-white px-4 py-2.5 outline-none focus:border-amber-600 focus:ring-2 focus:ring-amber-200"
    />
  );
}
