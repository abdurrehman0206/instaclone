import "./index.css";
import React, { useContext, useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Pages/Login/Login";
import Home from "./Pages/Home";
import Loader from "./Components/Loader/Loader";
import UserProfile from "./Components/UserProfile/UserProfile";
import Header from "./Components/Header/Header";
import { AuthContext } from "./Context/AuthContext";
function App() {
  const [comp, setComp] = useState(<Loader />);
  const { currentUser } = useContext(AuthContext);
  console.log("🚀 ~ file: App.js ~ line 12 ~ App ~ currentUser", currentUser);
  useEffect(() => {
    const timer = setTimeout(() => {
      setComp(<Login />);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route index element={currentUser ? <Home /> : comp} />;
          <Route path="/login" element={<Login />} />
          {currentUser && (
            <Route
              path={`/${currentUser.displayName}`}
              element={<UserProfile />}
            />
          )}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
