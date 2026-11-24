import { Option } from "@/data/types";

// A row of choice buttons. Used twice in DrinkCustomizer with different props:
// once for cup size and once for milk type.

interface OptionPickerProps {
  label: string;
  options: Option[];
  selected: string;
  onSelect: (name: string) => void;
}

export default function OptionPicker({ label, options, selected, onSelect }: OptionPickerProps) {
  return (
    <div>
      <h3 className="mb-2 font-semibold text-stone-800">{label}</h3>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => (
          <button
            key={option.name}
            type="button"
            onClick={() => onSelect(option.name)}
            className={`rounded-lg border px-4 py-2 text-sm transition ${
              selected === option.name
                ? "border-amber-800 bg-amber-800 text-white"
                : "border-amber-200 bg-white text-stone-700 hover:border-amber-500"
            }`}
          >
            {option.name}
            {option.extraPrice > 0 && <span className="ml-1 opacity-75">+Rs {option.extraPrice}</span>}
          </button>
        ))}
      </div>
    </div>
  );
}
