export default function Card({ card, onOpen }) {
  return (
    <div
      draggable
      onDragStart={(e) => e.dataTransfer.setData("cardId", card.id)}
      className="group bg-gray-50 border rounded p-3 hover:shadow relative"
    >
      {/* Edit menu */}
      <div className="absolute top-1 right-1 flex items-center gap-1">
        <div className="relative">
          <button
            onClick={() => onOpen(card)}
            className="text-gray-600 hover:text-gray-800 peer text-sm"
            aria-label="Edit card"
          >
            ✏️
          </button>

          <span className="absolute right-0 top-6 text-xs bg-gray-800 text-white px-2 py-0.5 rounded opacity-0 peer-hover:opacity-100 transition whitespace-nowrap">
            Edit card
          </span>
        </div>
      </div>

      {/* Title & description */}
      <p className="font-medium text-gray-800">{card.title}</p>

      {card.text && <p className="text-sm text-gray-600">{card.text}</p>}

      {/* Checklist */}
      {card.checklist.length > 0 && (
        <div className="mt-2 space-y-1">
          {card.checklist.map((item) => (
            <div key={item.id} className="flex items-center gap-2 text-sm">
              <span>{item.done ? "☑" : "☐"}</span>
              <span className={item.done ? "line-through text-gray-400" : ""}>
                {item.text}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Labels at bottom */}
      {card.labels.length > 0 && (
        <div className="flex gap-1 flex-wrap mt-3">
          {card.labels.map((l, i) => (
            <span
              key={i}
              className="text-xs text-white px-2 py-0.5 rounded"
              style={{ backgroundColor: l.color }}
            >
              {l.name}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
