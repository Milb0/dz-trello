import { useState } from "react";
import Card from "./Card";
import AddCardForm from "./AddCardForm";

export default function Board({
  board,
  cards,
  addCard,
  moveCard,
  onOpenCard,
  onDeleteBoard,
  onRenameBoard,
}) {
  const [showForm, setShowForm] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const [editingTitle, setEditingTitle] = useState(false);
  const [title, setTitle] = useState(board.title);

  const saveTitle = () => {
    const trimmed = title.trim();
    if (!trimmed) {
      setTitle(board.title);
    } else if (trimmed !== board.title) {
      onRenameBoard(board.id, trimmed);
    }
    setEditingTitle(false);
  };

  return (
    <div
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) =>
        moveCard(Number(e.dataTransfer.getData("cardId")), board.id)
      }
      className="bg-white rounded border p-4 min-w-[280px] transition hover:shadow-md"
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-3">
        {editingTitle ? (
          <input
            className="font-semibold text-sm border rounded px-2 py-1 w-full"
            value={title}
            autoFocus
            onChange={(e) => setTitle(e.target.value)}
            onBlur={saveTitle}
            onKeyDown={(e) => {
              if (e.key === "Enter") saveTitle();
              if (e.key === "Escape") {
                setTitle(board.title);
                setEditingTitle(false);
              }
            }}
          />
        ) : (
          <h2 className="font-semibold flex items-center gap-2">
            <span
              onClick={() => setEditingTitle(true)}
              className="cursor-pointer hover:underline"
              title="Click to rename"
            >
              {board.title}
            </span>

            <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">
              {cards.length}
            </span>
          </h2>
        )}

        {/* Delete */}
        {confirmDelete ? (
          <div className="flex gap-1 text-xs">
            <button
              onClick={() => onDeleteBoard(board.id)}
              className="text-red-600 font-medium"
            >
              Delete
            </button>
            <button
              onClick={() => setConfirmDelete(false)}
              className="text-gray-500"
            >
              Cancel
            </button>
          </div>
        ) : (
          <button
            onClick={() => setConfirmDelete(true)}
            className="text-gray-400 hover:text-red-600"
            aria-label="Delete board"
          >
            ✕
          </button>
        )}
      </div>

      {/* Cards */}
      <div className="space-y-3">
        {cards.map((card) => (
          <Card key={card.id} card={card} onOpen={onOpenCard} />
        ))}
      </div>

      {/* Add card */}
      {showForm ? (
        <AddCardForm
          boardId={board.id}
          addCard={addCard}
          onClose={() => setShowForm(false)}
        />
      ) : (
        <button
          onClick={() => setShowForm(true)}
          className="mt-3 text-sm text-gray-500 hover:text-black"
        >
          + Add Card
        </button>
      )}
    </div>
  );
}
