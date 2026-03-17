function AccordionItem({ item, isActive, onToggle }) {
  return (
    <div style={{ border: "1px solid #ccc", marginBottom: "10px" }}>
      <div
        style={{ padding: "10px", cursor: "pointer", background: "#eee" }}
        onClick={onToggle}
      >
        {item.title}
      </div>

      {isActive && <div style={{ padding: "10px" }}>{item.content}</div>}
    </div>
  );
}

export default AccordionItem;
