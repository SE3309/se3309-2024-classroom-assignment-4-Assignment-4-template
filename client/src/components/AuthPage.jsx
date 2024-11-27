import React, { useState } from "react";
import Login from "./Login";
import Register from "./Register";

function AuthPage({ setIsAuthenticated }) {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div>
      {isLogin ? (
        <Login setIsAuthenticated={setIsAuthenticated} />
      ) : (
        <Register />
      )}
      <button onClick={() => setIsLogin(!isLogin)}>
        {isLogin
          ? "Don't have an account? Register"
          : "Already have an account? Login"}
      </button>
    </div>
  );
}

export default AuthPage;
