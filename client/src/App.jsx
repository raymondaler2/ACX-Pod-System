import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home.jsx";
import Knowledgebase from "./pages/Knowledgebase.jsx";
import NotFound from "./pages/NotFound.jsx";
import { useEffect, useState } from "react";
import KnowledgebaseSOP from "./components/KnowledgebaseSOP.jsx";
import UserProfile from "./pages/UserProfile.jsx";
import Users from "./pages/Users.jsx";
import axios from "axios";

const PrivateRoute = ({ element, isAuthenticated, fallbackPath }) => {
  return isAuthenticated ? element : <Navigate to={fallbackPath} />;
};

const App = () => {
  const location = useLocation();
  const [sopIDs, setSopIDs] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const fetchSopIDs = async () => {
    const site = import.meta.env.VITE_SITE;
    const response = await axios.get(`http://${site}:4000/api/sop/all/id/`);
    setSopIDs(response.data);
  };

  const authenticateUser = async () => {
    const site = import.meta.env.VITE_SITE;
    const response = await axios.get(
      `http://${site}:3000/api/user/auth/${localStorage.getItem("token")}`
    );
    setIsAuthenticated(response.data);
  };

  useEffect(() => {
    authenticateUser();
  }, []);

  useEffect(() => {
    authenticateUser();
  }, [location.pathname]);

  useEffect(() => {
    if (isAuthenticated) {
      fetchSopIDs();
    }
  }, [isAuthenticated]);

  return (
    <>
      <Routes>
        <Route
          path="/Users"
          element={
            <PrivateRoute
              element={<Users />}
              isAuthenticated={isAuthenticated}
              fallbackPath="/Login"
            />
          }
        />
        <Route path="/Login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route
          path="/Knowledgebase"
          element={
            <PrivateRoute
              element={<Knowledgebase />}
              isAuthenticated={isAuthenticated}
              fallbackPath="/Login"
            />
          }
        />
        <Route
          path="/UserProfile"
          element={
            <PrivateRoute
              element={<UserProfile />}
              isAuthenticated={isAuthenticated}
              fallbackPath="/Login"
            />
          }
        />
        {sopIDs?.map((data) => (
          <Route
            key={data._id}
            path={`/Knowledgebase/${data._id}`}
            element={
              <PrivateRoute
                element={<KnowledgebaseSOP id={data._id} />}
                isAuthenticated={isAuthenticated}
                fallbackPath="/Login"
              />
            }
          />
        ))}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default App;
