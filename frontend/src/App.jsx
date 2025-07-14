import { Route, Routes } from "react-router";

import HomePage from "./pages/HomePage";
import CreatePage from "./pages/CreatePage";
import NoteDetailPage from "./pages/NoteDetailPage";
import ProtectRoute from "./components/ProtectRoute";
import Login from "./pages/Login";
import Register from "./pages/Register";

const App = () => {
  return (
    <div className="relative h-full w-full">
      <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_60%,#00FF9D40_100%)]" />

      <Routes>
        <Route
          path="/"
          element={
            <ProtectRoute>
              <HomePage />
            </ProtectRoute>
          }
        />
        <Route
          path="/create"
          element={
            <ProtectRoute>
              <CreatePage />
            </ProtectRoute>
          }
        />
        <Route
          path="/note/:id"
          element={
            <ProtectRoute>
              <NoteDetailPage />
            </ProtectRoute>
          }
        />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route />
      </Routes>
    </div>
  );
};

export default App;
