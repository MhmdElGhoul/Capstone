import React, { useState } from "react";
import Login from "./components/Login";
import Register from "./components/Register";
import "./App.css";

function App() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <>
      {isLogin ? (
        <Login onSwitch={() => setIsLogin(false)} />
      ) : (
        <Register onSwitch={() => setIsLogin(true)} />
      )}
    </>
  );
}

export default App;
