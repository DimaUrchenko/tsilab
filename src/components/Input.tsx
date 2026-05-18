type InputType = "text" | "password" | "email" | "tel";

interface InputProps {
  type?: InputType;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  label?: string;
  disabled?: boolean;
  error?: string;
  className?: string;
  required?: boolean;  // <- ДОБАВЬ ЭТУ СТРОКУ
}

export const Input = ({ 
  type = "text", 
  placeholder = "", 
  value, 
  onChange, 
  label, 
  disabled = false, 
  error, 
  className = "",
  required = false  // <- ДОБАВЬ ЭТУ СТРОКУ
}: InputProps) => {
  return (
    <div className={`flex flex-col gap-1 w-full ${className}`}>
      {label && (
        <label className="text-sm font-medium text-gray-700">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        required={required}  // <- ДОБАВЬ ЭТУ СТРОКУ
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