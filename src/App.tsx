import "./App.css";
import { Routes, Route } from "react-router-dom";
import Page1 from "./pages/page";
import ThankYou from "./pages/Thankq";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Page1 />} />
      <Route path="/submited" element={<ThankYou />} />
    </Routes>
  );
}

export default App;
