import {
  updateChatAction,
  userDetailAction,
  activeChatAction,
  activeChatUserAction,
} from "./actions";

export const updateChatState = {
  chatState: false,
};

export const activeChatState = {
  activeChat: null,
};

export const activeChatUserState = {
  activeChatUser: null,
};

export const userDetailState = {
  userDetail: null,
};

export const activeChatReducer = (state, action) => {
  if (action.type === activeChatAction) {
    return {
      ...state,
      activeChat: action.payload,
    };
  } else {
    return state;
  }
};

export const activeChatUserReducer = (state, action) => {
  if (action.type === activeChatUserAction) {
    return {
      ...state,
      activeChatUser: action.payload,
    };
  } else {
    return state;
  }
};

export const userDetailReducer = (state, action) => {
  if (action.type === userDetailAction) {
    return {
      ...state,
      userDetail: action.payload,
    };
  } else {
    return state;
  }
};

export const updateChatReducer = (state, action) => {
  if (action.type === updateChatAction) {
    return {
      ...state,
      chatState: action.payload,
    };
  } else {
    return state;
  }
};
