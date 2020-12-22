import React, { createContext, useReducer } from "react";
import {
  updateChatReducer,
  updateChatState,
  userDetailReducer,
  userDetailState,
  activeChatReducer,
  activeChatState,
  activeChatUserReducer,
  activeChatUserState,
    triggerRefreshUserListReducer,
    triggerRefreshUserListState
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
  activeChatReducer,
  activeChatUserReducer,
    triggerRefreshUserListReducer
);

const initialState = {
  ...updateChatState,
  ...userDetailState,
  ...activeChatState,
  ...activeChatUserState,
  ...triggerRefreshUserListState
};

const store = createContext(initialState);
const { Provider } = store;

const StoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer(combinedReducers, initialState);

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { store, StoreProvider };
