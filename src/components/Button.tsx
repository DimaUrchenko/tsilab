interface ButtonProps {
  size: "small" | "middle" | "large";
  color: "primary" | "secondary";
  title: string;
  onClick: () => void;
  disabled?: boolean;
  className?: string;
}

export const Button = ({ size, color, title, onClick, disabled = false, className = "" }: ButtonProps) => {
  const sizeClasses = {
    small: "px-3 py-1 text-sm",
    middle: "px-5 py-2 text-base",
    large: "px-6 py-3 text-lg",
  };
  
  const colorClasses = {
    primary: "bg-amber-600 hover:bg-amber-700 text-white",
    secondary: "bg-blue-600 hover:bg-blue-700 text-white",
  };

  const disabledClasses = disabled 
    ? "opacity-50 cursor-not-allowed" 
    : "cursor-pointer transition-all duration-200";

  return (
    <button
      className={`${sizeClasses[size]} ${colorClasses[color]} rounded-lg ${disabledClasses} ${className}`}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
    >
      {title}
    </button>
  );
};