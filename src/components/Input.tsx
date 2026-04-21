interface InputProps {
  type?: "text" | "password" | "email";
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  label?: string;
  disabled?: boolean;
  error?: string;
  className?: string;
}

export const Input = ({ 
  type = "text", 
  placeholder = "", 
  value, 
  onChange, 
  label, 
  disabled = false, 
  error, 
  className = "" 
}: InputProps) => {
  return (
    <div className={`flex flex-col gap-1 w-full ${className}`}>
      {label && (
        <label className="text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        className={`
          px-3 py-2 border rounded-lg outline-none transition-all
          ${error ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"}
          focus:ring-2 focus:border-transparent
          ${disabled ? "bg-gray-100 cursor-not-allowed opacity-60" : "bg-white"}
        `}
      />
      {error && (
        <p className="text-red-500 text-xs mt-1">{error}</p>
      )}
    </div>
  );
};