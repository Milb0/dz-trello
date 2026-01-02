import { useState } from "react";

export default function AddBoardForm({ addBoard }) {
  const [title, setTitle] = useState("");

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (!title.trim()) return;
        addBoard(title);
        setTitle("");
      }}
      className="flex justify-center gap-2"
    >
      <input
        className="border rounded px-3 py-2"
        placeholder="Board name"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button className="bg-[color:var(--primary)] text-white px-4 rounded">
        Add
      </button>
    </form>
  );
}
