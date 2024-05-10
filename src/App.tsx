import React, { Suspense } from "react";
import { Header } from "components/Header";
import { useRoutes } from "react-router-dom";
import { Loader } from "components/Loader";

const CharacterList = React.lazy(() => import("pages/CharacterList"));
const CharacterDetail = React.lazy(() => import("pages/CharacterDetail"));

function App() {
  const elements = useRoutes([
    { path: "/", element: <CharacterList /> },
    { path: "/character-detail/:id", element: <CharacterDetail /> },
  ]);

  return (
    <div className="bg-dark orbitron-regular app-container">
      <Header />
      <div className="container py-4 text-light">
        <Suspense fallback={<Loader />}>{elements}</Suspense>
      </div>
    </div>
  );
}

export default App;
