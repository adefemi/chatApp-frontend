import React from "react";
import ReactDom from "react-dom";
import App from "./app";
import { StoreProvider } from "./stateManagement/store";
import SocketService from "./socketService";

ReactDom.render(
  <StoreProvider>
    <App />
    <SocketService />
  </StoreProvider>,
  document.getElementById("root")
);
