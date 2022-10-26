import "./App.css";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import UsersPage from "./pages/UsersPage/UsersPage";

function App() {
  return (
    <Routes>
      <Route path="/users" element={<UsersPage />} />
      <Route path="/" element={<HomePage />} />
    </Routes>
  );
}

export default App;
