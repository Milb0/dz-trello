import { useState } from "react";

const COLORS = [
  { name: "Green", color: "#61bd4f" },
  { name: "Blue", color: "#0079bf" },
  { name: "Red", color: "#eb5a46" },
  { name: "Yellow", color: "#f2d600" },
];

export default function AddCardForm({ boardId, addCard, onClose }) {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");

  // labels
  const [labelText, setLabelText] = useState("");
  const [labelColor, setLabelColor] = useState(COLORS[0]);
  const [labels, setLabels] = useState([]);

  // checklist
  const [checklist, setChecklist] = useState([]);
  const [taskText, setTaskText] = useState("");

  const addLabel = () => {
    if (!labelText.trim()) return;
    setLabels([...labels, { name: labelText, color: labelColor.color }]);
    setLabelText("");
  };

  const addChecklistItem = () => {
    if (!taskText.trim()) return;
    setChecklist([
      ...checklist,
      { id: Date.now(), text: taskText, done: false },
    ]);
    setTaskText("");
  };

  const submit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    addCard(boardId, {
      title,
      text,
      labels,
      checklist,
    });

    onClose();
  };

  return (
    <form onSubmit={submit} className="mt-3 space-y-3">
      {/* Title */}
      <input
        className="border rounded px-2 py-1 w-full"
        placeholder="Card title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        autoFocus
      />

      {/* Description */}
      <textarea
        className="border rounded px-2 py-1 w-full"
        placeholder="Description"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      {/* Labels */}
      <div>
        <p className="text-sm font-medium mb-1">Labels</p>

        <div className="flex gap-2 mb-2">
          <input
            className="border rounded px-2 py-1 flex-1"
            placeholder="Label text"
            value={labelText}
            onChange={(e) => setLabelText(e.target.value)}
          />

          <select
            className="border rounded px-2 py-1"
            value={labelColor.name}
            onChange={(e) =>
              setLabelColor(COLORS.find((c) => c.name === e.target.value))
            }
          >
            {COLORS.map((c) => (
              <option key={c.name} value={c.name}>
                {c.name}
              </option>
            ))}
          </select>

          <button
            type="button"
            onClick={addLabel}
            className="bg-gray-200 px-2 rounded"
          >
            Add
          </button>
        </div>

        {/* Label preview */}
        <div className="flex gap-1 flex-wrap">
          {labels.map((l, i) => (
            <span
              key={i}
              className="text-xs text-white px-2 py-0.5 rounded"
              style={{ backgroundColor: l.color }}
            >
              {l.name}
            </span>
          ))}
        </div>
      </div>

      {/* Checklist */}
      <div>
        <p className="text-sm font-medium mb-1">Checklist</p>

        <div className="flex gap-2">
          <input
            className="border rounded px-2 py-1 flex-1"
            placeholder="Checklist item"
            value={taskText}
            onChange={(e) => setTaskText(e.target.value)}
          />
          <button
            type="button"
            onClick={addChecklistItem}
            className="bg-gray-200 px-2 rounded"
          >
            Add
          </button>
        </div>

        {checklist.map((item) => (
          <p key={item.id} className="text-sm text-gray-600">
            ☐ {item.text}
          </p>
        ))}
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        <button className="bg-[color:var(--primary)] text-white px-3 py-1 rounded">
          Add Card
        </button>
        <button type="button" onClick={onClose} className="text-sm">
          Cancel
        </button>
      </div>
    </form>
  );
}
