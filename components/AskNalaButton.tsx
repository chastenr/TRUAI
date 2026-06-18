"use client";

interface AskNalaButtonProps {
  address: string;
  question?: string;
  className?: string;
  children?: React.ReactNode;
}

export default function AskNalaButton({ address, question, className, children }: AskNalaButtonProps) {
  const handleClick = () => {
    window.dispatchEvent(new CustomEvent("nala-open"));

    const section = document.getElementById("concierge");
    if (section) section.scrollIntoView({ behavior: "smooth" });

    setTimeout(() => {
      window.dispatchEvent(
        new CustomEvent("nala-ask", {
          detail: {
            question:
              question ??
              `Tell me about the property at ${address}. What are the key features, pricing, and is it available for a showing?`,
          },
        })
      );
      window.dispatchEvent(new CustomEvent("nala-chat-focus"));
    }, 250);
  };

  return (
    <button type="button" onClick={handleClick} className={className}>
      {children ?? "Ask AI About This Property"}
    </button>
  );
}
