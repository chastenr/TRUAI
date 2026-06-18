"use client";

interface AskNalaButtonProps {
  address: string;
  question?: string;
  className?: string;
  children?: React.ReactNode;
}

export default function AskNalaButton({ address, question, className, children }: AskNalaButtonProps) {
  const handleClick = () => {
    const section = document.getElementById("concierge");
    if (section) section.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <button type="button" onClick={handleClick} className={className}>
      {children ?? "Ask AI About This Property"}
    </button>
  );
}
