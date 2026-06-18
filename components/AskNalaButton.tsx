"use client";

// Client wrapper for the "Ask AI About This Property" CTA.
// Scrolls to #concierge and fires a nala-ask event with a prefilled question.

interface AskNalaButtonProps {
  address: string;
  className?: string;
  children?: React.ReactNode;
}

export default function AskNalaButton({ address, className, children }: AskNalaButtonProps) {
  const handleClick = () => {
    const section = document.getElementById("concierge");
    if (section) section.scrollIntoView({ behavior: "smooth" });

    // Wait for scroll to land before firing the prefill event
    setTimeout(() => {
      window.dispatchEvent(
        new CustomEvent("nala-ask", {
          detail: {
            question: `Tell me about the property at ${address}. What are the key features, pricing, and is it available for a showing?`,
          },
        })
      );
    }, 700);
  };

  return (
    <button type="button" onClick={handleClick} className={className}>
      {children ?? "Ask AI About This Property"}
    </button>
  );
}
