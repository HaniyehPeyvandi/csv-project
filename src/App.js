import "./App.css";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import UsersPage from "./pages/UsersPage/UsersPage";
import UsersProvider from "./Providers/UsersProvider";

function App() {
  return (
    <UsersProvider>
      <Routes>
        <Route path="/users" element={<UsersPage />} />
        <Route path="/" element={<HomePage />} />
      </Routes>
    </UsersProvider>
  );
}

export default App;
