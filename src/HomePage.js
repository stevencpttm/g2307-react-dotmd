import { useLoaderData, Link } from "react-router-dom";
import NoteList from "./NoteList";

function HomePage() {
  const loaderData = useLoaderData();

  return (
    <>
      <nav className="bg-slate-800 py-2">
        <div className="container mx-auto flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold text-white">
            dotMD
          </Link>
          <Link to="/create" className="text-md text-white">
            Create
          </Link>
        </div>
      </nav>

      <div className="container mx-auto mt-6 flex">
        <div className="w-1/2 md:w-1/3 pr-2">
          <NoteList notes={loaderData.notes} />
        </div>

        <div className="w-1/2 md:w-2/3 px-4 text-md">
          Please select a note in the sidebar, or create a new note.
        </div>
      </div>
    </>
  );
}

export default HomePage;
