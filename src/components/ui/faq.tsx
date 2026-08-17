import { Plus } from "lucide-react";

export function Faq({ items }: { items: readonly { question: string; answer: string }[] }) {
  return (
    <div className="faq-list">
      {items.map((item) => (
        <details className="faq-item" key={item.question}>
          <summary><span>{item.question}</span><Plus aria-hidden="true" /></summary>
          <div><p>{item.answer}</p></div>
        </details>
      ))}
    </div>
  );
}
