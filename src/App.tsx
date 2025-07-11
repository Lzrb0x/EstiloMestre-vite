import { Routes, Route, Link } from "react-router-dom";
import About from "./pages/About.tsx";

export default function App() {
  return (
    <div>
      <nav className="p-4 bg-gray-200 flex gap-4">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
      </nav>

      <Routes>
        <Route path="/about" element={<About />} />
      </Routes>
    </div>
  );
}
