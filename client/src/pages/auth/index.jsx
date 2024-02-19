import React, { useState } from "react";
import { Login } from "../../components/login";
import { SignUp } from "../../components/signup";
import { getUser } from "../../utils/localStorage";

export function Auth() {
  const [showLogin, setShowLogin] = useState(false);
  return (
    <div>
      {showLogin ? (
        <Login handleShowSignUp={() => setShowLogin(false)} />
      ) : (
        <SignUp handleShowLogin={() => setShowLogin(true)} />
      )}
    </div>
  );
}
