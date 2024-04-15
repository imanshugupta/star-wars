import { Suspense } from "react";
import { Header } from "components/Header";
import { useRoutes, Routes, Route } from "react-router-dom";
import { Loader } from "components/Loader";
import CharacterList from "pages/CharacterList";
import CharacterDetail from "pages/CharacterDetail";

function App() {
  const elements = useRoutes([
    { path: "/", element: <CharacterList /> },
    { path: "/character-detail/:id", element: <CharacterDetail /> },
  ]);

  return (
    <>
      <Header />
      <div className="container mt-3 mb-4">
        <Suspense fallback={<Loader />}>{elements}</Suspense>
      </div>
    </>
  );
}

export default App;
