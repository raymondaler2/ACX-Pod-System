import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home.jsx";
import Knowledgebase from "./pages/Knowledgebase.jsx";
import NotFound from "./pages/NotFound.jsx";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/Login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/Knowledgebase" element={<Knowledgebase />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default App;
