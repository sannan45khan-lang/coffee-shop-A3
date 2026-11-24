// Reusable button used across the app.
// No 'use client' needed: the parent Client Component passes the onClick handler.

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit";
  variant?: "primary" | "secondary";
  disabled?: boolean;
  fullWidth?: boolean;
}

export default function Button({
  children,
  onClick,
  type = "button",
  variant = "primary",
  disabled = false,
  fullWidth = false,
}: ButtonProps) {
  const colors =
    variant === "primary"
      ? "bg-amber-800 text-white hover:bg-amber-900"
      : "border border-amber-800 text-amber-800 hover:bg-amber-100";

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`rounded-lg px-5 py-2.5 font-semibold transition disabled:cursor-not-allowed disabled:opacity-50 ${colors} ${
        fullWidth ? "w-full" : ""
      }`}
    >
      {children}
    </button>
  );
}
