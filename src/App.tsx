import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Page1 from "./pages/page";
import ThankYou from "./pages/Thankq";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Page1 />} />
      <Route 
        path="/submited" 
        element={
          localStorage.getItem("formSubmitted") === "true" 
            ? <ThankYou /> 
            : <Navigate to="/" replace />
        } 
      />
    </Routes>
  );
}

export default App;

//dvzvsafd Dvzsddscsd sdcdvzc zcz zdc a ads  dsc cds dc ddcdc d c dcdcdcdcdcdcdc