import { Link } from "react-router-dom";

function NoteList({ notes, activeId, previewLength }) {
  const shorten = (str) => {
    return str.substring(0, previewLength || 100) + "...";
  };

  return (
    <ul className="rounded-md border text-md text-slate-700">
      {notes.map((note) => {
        return (
          <li
            className={`cursor-pointer border-b px-4 py-2 ${
              note.id === activeId ? "bg-slate-200" : "hover:bg-slate-200"
            }`}
            key={note.id}
          >
            <Link to={`/view/${note.id}`}>
              <strong>{note.title}</strong>
              <p className="leading text-xs text-slate-500">
                {shorten(note.content)}
              </p>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

export default NoteList;
