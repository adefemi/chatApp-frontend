import Axios from "axios";
import { logout, tokenName } from "./Pages/authController";
import { ME_URL, REFERESH_URL } from "./urls";

export const LastUserChat = "lastUserChat";

export const axiosHandler = ({
  method = "",
  url = "",
  token = null,
  data = {},
  extra = null,
}) => {
  let methodType = method.toUpperCase();
  if (
    ["GET", "POST", "PATCH", "PUT", "DELETE"].includes(methodType) ||
    {}.toString(data) !== "[object Object]"
  ) {
    let axiosProps = { method: methodType, url, data };

    if (token) {
      axiosProps.headers = { Authorization: `Bearer ${token}` };
    }
    if (extra) {
      axiosProps.headers = { ...axiosProps.headers, ...extra };
    }
    return Axios(axiosProps);
  } else {
    alert(`method ${methodType} is not accepted or data is not an object`);
  }
};

export const errorHandler = (err, defaulted = false) => {
  if (defaulted) {
    return "Ops!, an error occurred.";
  }

  let messageString = "";
  if (!err.response) {
    messageString += "Network error! check your network and try again";
  } else {
    let data = err.response.data.results;
    if (!err.response.data.results) {
      data = err.response.data;
    }
    messageString = loopObj(data);
  }
  return messageString.replace(/{|}|'|\[|\]/g, "");
};

const loopObj = (obj) => {
  let agg = "";
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      agg += `<div>${key}: ${
        typeof obj[key] === "object" ? loopObj(obj[key]) : obj[key]
      }</div>`;
    }
  }
  return agg;
};

export const getToken = async (props) => {
  let token = localStorage.getItem(tokenName);
  if (!token) logout(props);
  token = JSON.parse(token);
  const userProfile = await axiosHandler({
    method: "get",
    url: ME_URL,
    token: token.access,
  }).catch((e) => null);
  if (userProfile) {
    return token.access;
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
      return getNewAccess.data.access;
    } else {
      logout(props);
    }
  }
};
