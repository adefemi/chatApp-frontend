import React, { createContext, useReducer } from "react";
import {
  updateChatReducer,
  updateChatState,
  userDetailReducer,
  userDetailState,
  activeChatReducer,
  activeChatState,
} from "./reducers";

const reduceReducers = (...reducers) => (prevState, value, ...args) => {
  return reducers.reduce(
    (newState, reducer) => reducer(newState, value, ...args),
    prevState
  );
};

const combinedReducers = reduceReducers(
  updateChatReducer,
  userDetailReducer,
  activeChatReducer
);

const initialState = {
  ...updateChatState,
  ...userDetailState,
  ...activeChatState,
};

const store = createContext(initialState);
const { Provider } = store;

const StoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer(combinedReducers, initialState);

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { store, StoreProvider };
