import React, { useEffect, useState, useContext } from "react";
import Loader from "../components/loader";
import { axiosHandler } from "../helper";
import { REFERESH_URL, ME_URL } from "../urls";
import { store } from "../stateManagement/store";
import { userDetailAction } from "../stateManagement/actions";

export const tokenName = "tokenName";

export const logout = (props) => {
  localStorage.removeItem(tokenName);
  props.history.push("/login");
};

const AuthController = (props) => {
  const [checking, setChecking] = useState(true);

  const { dispatch } = useContext(store);

  const checkAuthState = async () => {
    let token = localStorage.getItem(tokenName);
    if (!token) {
      logout(props);
      return;
    }
    token = JSON.parse(token);
    const userProfile = await axiosHandler({
      method: "get",
      url: ME_URL,
      token: token.access,
    }).catch((e) => null);
    if (userProfile) {
      setChecking(false);
      dispatch({ type: userDetailAction, payload: userProfile.data });
    } else {
      const getNewAccess = await axiosHandler({
        method: "post",
        url: REFERESH_URL,
        data: {
          refresh: token.refresh,
        },
      }).catch((e) => null);
      if (getNewAccess) {
        localStorage.setItem(tokenName, JSON.stringify(getNewAccess.data));
        checkAuthState();
      } else {
        logout(props);
      }
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
