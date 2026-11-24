// A labelled text input that shows a red error message under it.
// Reused for every text field in the checkout form with different props.

interface FormInputProps {
  label: string;
  name: string;
  value: string;
  onChange: (name: string, value: string) => void;
  error?: string;
  type?: string;
  placeholder?: string;
}

export default function FormInput({
  label,
  name,
  value,
  onChange,
  error,
  type = "text",
  placeholder,
}: FormInputProps) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={name} className="font-medium text-stone-700">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(name, e.target.value)}
        className={`rounded-lg border bg-white px-4 py-2.5 outline-none focus:ring-2 ${
          error ? "border-red-500 focus:ring-red-200" : "border-amber-200 focus:border-amber-600 focus:ring-amber-200"
        }`}
      />
      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
}
