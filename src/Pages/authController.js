import React, { useEffect, useState, useContext } from "react";
import Loader from "../components/loader";
export const tokenName = "tokenName";

const AuthController = (props) => {
  const [checking, setChecking] = useState(true);

  const checkAuthState = () => {
    const token = localStorage.getItem(tokenName);
    if (!token) {
      props.history.push("/login");
      return;
    }
  };

  useEffect(() => {
    checkAuthState();
  }, []);

  return (
    <div className="authContainer">
      {checking ? (
        <div className="centerAll">
          <Loader />
        </div>
      ) : (
        props.children
      )}
    </div>
  );
};

export default AuthController;
