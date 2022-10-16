import "./index.css";
import React, { useContext, useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Pages/Login/Login";
import Home from "./Pages/Home";
import Loader from "./Components/Loader/Loader";
import { AuthContext } from "./Context/AuthContext";
function App() {
  const [comp, setComp] = useState(<Loader />);
  const { currentUser } = useContext(AuthContext);
  useEffect(() => {
    const timer = setTimeout(() => {
      setComp(<Login />);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route index element={currentUser ? <Home /> : comp} />;
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
