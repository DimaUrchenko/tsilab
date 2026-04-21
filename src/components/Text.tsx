interface TextProps {
  variant?: "h1" | "h2" | "h3" | "p";
  children: React.ReactNode;
  bold?: boolean;
  center?: boolean;
  className?: string;
}

export const Text = ({ variant = "p", children, bold = false, center = false, className = "" }: TextProps) => {
  const variants = {
    h1: "text-3xl font-bold",
    h2: "text-2xl font-semibold",
    h3: "text-xl font-medium",
    p: "text-base"
  };

  const additional = `
    ${bold ? "font-bold" : ""}
    ${center ? "text-center" : ""}
  `;

  const Tag = variant;

  return (
    <Tag className={`${variants[variant]} ${additional} ${className}`}>
      {children}
    </Tag>
  );
};