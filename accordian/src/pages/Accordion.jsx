import { useState } from "react";
import AccordionItem from "./AccordionItem";

const items = [
  { id: 1, title: "Section 1", content: "Content of section 1" },
  { id: 2, title: "Section 2", content: "Content of section 2" },
  { id: 3, title: "Section 3", content: "Content of section 3" },
];

function Accordion() {
  const [activeId, setActiveId] = useState(null);

  const toggleItem = (id) => {
    setActiveId((prev) => (prev === id ? null : id));
  };

  return (
    <div>
      {items.map((item) => (
        <AccordionItem
          key={item.id}
          item={item}
          isActive={activeId === item.id}
          onToggle={() => toggleItem(item.id)}
        />
      ))}
    </div>
  );
}

export default Accordion;
