import React from "react";

const Login = ({ onSwitch }) => {
  return (
    <div className="container">
      <div className="panel">
        <h2>Login Here</h2>
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Password" />
        <small>Forgot Password?</small>
        <button>Login</button>
      </div>
      <div className="panel dark">
        <h2>Start Your Journey Now!</h2>
        <p>If you don’t have an account yet, join us and start your journey</p>
        <button onClick={onSwitch}>Register →</button>
      </div>
    </div>
  );
};

export default Login;
