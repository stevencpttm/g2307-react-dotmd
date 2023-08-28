import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";

import {
  createBrowserRouter,
  RouterProvider,
  redirect,
} from "react-router-dom";

import HomePage from "./HomePage";
import ViewPage from "./ViewPage";
import CreatePage from "./CreatePage";
import EditPage from "./EditPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    loader: async () => {
      const response = await fetch("http://localhost:3001/notes");
      const json = await response.json();

      return {
        notes: json,
      };
    },
  },
  {
    path: "/view/:id",
    element: <ViewPage />,
    loader: async ({ params }) => {
      const id = +params.id;

      // Load notes from API
      const notesResponse = await fetch("http://localhost:3001/notes");
      const notes = await notesResponse.json();

      // Load single note from API
      const noteResponse = await fetch(`http://localhost:3001/notes/${id}`);
      const note = await noteResponse.json();

      return {
        id: id,
        notes: notes,
        note: note,
      };
    },
  },
  {
    path: "/create",
    element: <CreatePage />,
    action: async ({ request }) => {
      const formData = await request.formData();

      const title = formData.get("title");
      const content = formData.get("content");

      // Send to create new note API endpoint
      const response = await fetch(`http://localhost:3001/notes`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title,
          content: content,
          datetime: new Date().toISOString(),
        }),
      });
      const json = await response.json();

      return redirect(`/view/${json.id}`);
    },
  },
  {
    path: "/edit/:id",
    element: <EditPage />,
    loader: async ({ params }) => {
      const id = params.id;

      // Fetch single note from API
      const response = await fetch(`http://localhost:3001/notes/${id}`);
      const note = await response.json();

      return {
        note: note,
      };
    },
    action: async ({ params, request }) => {
      const id = params.id;

      const formData = await request.formData();
      const title = formData.get("title");
      const content = formData.get("content");

      // Call the update API
      try {
        const response = await fetch(`http://localhost:3001/notes/${id}`, {
          method: "put",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: title,
            content: content,
          }),
        });
      } catch (err) {
        console.error(err);
      }

      return redirect(`/view/${id}`);
    },
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
