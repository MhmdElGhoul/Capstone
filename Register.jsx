import React from "react";

const Register = ({ onSwitch }) => {
  return (
    <div className="container">
      <div className="panel dark">
        <h2>Hello!</h2>
        <p>Welcome to the internal website, your go-to resource.</p>
        <button onClick={onSwitch}>← Login</button>
      </div>
      <div className="panel">
        <h2>Register Here</h2>
        <input type="text" placeholder="Full Name" />
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Password" />
        <button>Register</button>
      </div>
    </div>
  );
};

export default Register;
