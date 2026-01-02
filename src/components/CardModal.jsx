import { useState } from "react";

const COLORS = [
  { name: "Green", color: "#61bd4f" },
  { name: "Blue", color: "#0079bf" },
  { name: "Red", color: "#eb5a46" },
  { name: "Yellow", color: "#f2d600" },
];

export default function CardModal({ card, onClose, onSave, onDelete }) {
  const [state, setState] = useState({ ...card });
  const [task, setTask] = useState("");

  const [labelText, setLabelText] = useState("");
  const [labelColor, setLabelColor] = useState(COLORS[0]);

  const addLabel = () => {
    if (!labelText.trim()) return;
    if (state.labels.some((l) => l.name === labelText.trim())) return;

    setState({
      ...state,
      labels: [
        ...state.labels,
        { name: labelText.trim(), color: labelColor.color },
      ],
    });

    setLabelText("");
  };

  const deleteChecklistItem = (id) => {
    setState({
      ...state,
      checklist: state.checklist.filter((i) => i.id !== id),
    });
  };

  const deleteLabel = (name) => {
    setState({
      ...state,
      labels: state.labels.filter((l) => l.name !== name),
    });
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-5 rounded w-[420px] space-y-4 shadow-lg">
        {/* Title */}
        <input
          className="border rounded px-3 py-2 w-full text-lg font-medium"
          value={state.title}
          onChange={(e) => setState({ ...state, title: e.target.value })}
        />

        {/* Description */}
        <textarea
          className="border rounded px-3 py-2 w-full"
          value={state.text}
          onChange={(e) => setState({ ...state, text: e.target.value })}
        />

        {/* Labels */}
        <div>
          <p className="font-medium mb-1">Labels</p>

          <div className="flex gap-1 flex-wrap mb-2">
            {state.labels.map((l, i) => (
              <span
                key={i}
                className="text-xs text-white px-2 py-1 rounded flex items-center gap-1"
                style={{ backgroundColor: l.color }}
              >
                {l.name}
                <button
                  onClick={() => deleteLabel(l.name)}
                  className="text-white font-bold"
                >
                  ×
                </button>
              </span>
            ))}
          </div>

          <div className="flex gap-2">
            <input
              className="border rounded px-2 py-1 flex-1"
              placeholder="Label text"
              value={labelText}
              onChange={(e) => setLabelText(e.target.value)}
            />

            <select
              className="border rounded px-2 py-1"
              onChange={(e) =>
                setLabelColor(COLORS.find((c) => c.name === e.target.value))
              }
            >
              {COLORS.map((c) => (
                <option key={c.name}>{c.name}</option>
              ))}
            </select>

            <button onClick={addLabel} className="bg-gray-200 px-2 rounded">
              Add
            </button>
          </div>
        </div>

        {/* Checklist */}
        <div>
          <p className="font-medium mb-1">Checklist</p>

          <div className="space-y-1">
            {state.checklist.map((item) => (
              <div key={item.id} className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={item.done}
                  onChange={() =>
                    setState({
                      ...state,
                      checklist: state.checklist.map((i) =>
                        i.id === item.id ? { ...i, done: !i.done } : i
                      ),
                    })
                  }
                />
                <span
                  className={
                    item.done ? "line-through text-gray-400 flex-1" : "flex-1"
                  }
                >
                  {item.text}
                </span>
                <button
                  onClick={() => deleteChecklistItem(item.id)}
                  className="text-red-500"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (!task.trim()) return;

              setState({
                ...state,
                checklist: [
                  ...state.checklist,
                  {
                    id: Date.now(),
                    text: task.trim(),
                    done: false,
                  },
                ],
              });
              setTask("");
            }}
          >
            <input
              className="border rounded px-2 py-1 w-full mt-2 text-sm"
              placeholder="+ Add checklist item"
              value={task}
              onChange={(e) => setTask(e.target.value)}
            />
          </form>
        </div>

        {/* Actions */}
        <div className="flex justify-between pt-2">
          <button
            onClick={() => {
              onSave(state);
              onClose();
            }}
            className="bg-[color:var(--primary)] text-white px-4 py-1.5 rounded"
          >
            Save
          </button>

          <div className="flex gap-2">
            <button
              onClick={() => {
                onDelete(state.id);
                onClose();
              }}
              className="text-red-600"
            >
              Delete Card
            </button>

            <button onClick={onClose} className="text-gray-600">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
