import { useEffect, useState } from "react";
import Board from "./components/Board";
import AddBoardForm from "./components/AddBoardForm";
import CardModal from "./components/CardModal";

const STORAGE_KEY = "kanban-data";

export default function App() {
  const [boards, setBoards] = useState([]);
  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);

  // ✅ hydration guard
  const [hydrated, setHydrated] = useState(false);

  /* LOAD from localStorage (ONCE) */
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const data = JSON.parse(saved);
        setBoards(data.boards || []);
        setCards(data.cards || []);
      } catch {
        console.error("Invalid localStorage data");
      }
    }
    setHydrated(true); // 🔑 allow saving after load
  }, []);

  /* SAVE to localStorage (ONLY after hydration) */
  useEffect(() => {
    if (!hydrated) return;

    localStorage.setItem(STORAGE_KEY, JSON.stringify({ boards, cards }));
  }, [boards, cards, hydrated]);

  /* Board actions */
  const addBoard = (title) => {
    setBoards([...boards, { id: Date.now(), title }]);
  };

  const deleteBoard = (boardId) => {
    setBoards(boards.filter((b) => b.id !== boardId));
    setCards(cards.filter((c) => c.boardId !== boardId));
  };

  const renameBoard = (boardId, newTitle) => {
    setBoards(
      boards.map((b) => (b.id === boardId ? { ...b, title: newTitle } : b))
    );
  };

  /* Card actions */
  const addCard = (boardId, card) => {
    setCards([...cards, { ...card, id: Date.now(), boardId }]);
  };

  const moveCard = (cardId, boardId) => {
    setCards(cards.map((c) => (c.id === cardId ? { ...c, boardId } : c)));
  };

  const saveCard = (updatedCard) => {
    setCards(cards.map((c) => (c.id === updatedCard.id ? updatedCard : c)));
  };

  const deleteCard = (cardId) => {
    setCards(cards.filter((c) => c.id !== cardId));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="flex justify-center mb-6">
        <img src="/kanban.svg" alt="Kanban Board" className="h-16 md:h-20" />
      </div>

      <AddBoardForm addBoard={addBoard} />

      <div className="flex gap-4 overflow-x-auto mt-6 items-start">
        {boards.map((board) => (
          <Board
            key={board.id}
            board={board}
            cards={cards.filter((c) => c.boardId === board.id)}
            addCard={addCard}
            moveCard={moveCard}
            onOpenCard={setSelectedCard}
            onDeleteBoard={deleteBoard}
            onRenameBoard={renameBoard}
          />
        ))}
      </div>

      {selectedCard && (
        <CardModal
          card={selectedCard}
          onClose={() => setSelectedCard(null)}
          onSave={saveCard}
          onDelete={deleteCard}
        />
      )}
    </div>
  );
}
