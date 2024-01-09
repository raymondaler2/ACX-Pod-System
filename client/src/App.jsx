import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home.jsx";
import Knowledgebase from "./pages/Knowledgebase.jsx";
import NotFound from "./pages/NotFound.jsx";
import { useEffect, useState } from "react";
import KnowledgebaseSOP from "./components/KnowledgebaseSOP.jsx";
import CreateUser from "./pages/CreateUser.jsx";
import axios from "axios";

const App = () => {
  const [sopIDs, setSopIDs] = useState([]);

  const fetchSopIDs = async () => {
    const site = import.meta.env.VITE_SITE;
    const response = await axios.get(`http://${site}:4000/api/sop/all/id/`);
    setSopIDs(response.data);
  };

  useEffect(() => {
    fetchSopIDs();
  }, []);

  return (
    <>
      <Routes>
        <Route path="/CreateUser" element={<CreateUser />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/Knowledgebase" element={<Knowledgebase />} />
        {sopIDs?.map((data) => (
          <Route
            path={`/Knowledgebase/${data._id}`}
            element={<KnowledgebaseSOP id={data._id} />}
          />
        ))}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default App;
