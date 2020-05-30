import {
  FETCH_CONVERSATION_REQUEST,
  FETCH_CONVERSATION_SUCCESSS,
  FETCH_CONVERSATION_FAILED,
  SEND_CONVERSATION_REQUEST,
  SEND_CONVERSATION_SUCCESSS,
  SEND_CONVERSATION_FAILED,
  EDIT_CONVERSATION_REQUEST,
  EDIT_CONVERSATION_SUCCESSS,
  EDIT_CONVERSATION_FAILED,
  DELETE_CONVERSATION_REQUEST,
  DELETE_CONVERSATION_SUCCESSS,
  DELETE_CONVERSATION_FAILED,
} from "./actionTypes";

const fetchConversationRequest = () => {
  return {
    type: FETCH_CONVERSATION_REQUEST,
  };
};

const fetchConversationSuccess = (data) => {
  return {
    type: FETCH_CONVERSATION_SUCCESSS,
    payload: data,
  };
};

const fetchConversationFailed = (error) => {
  return {
    type: FETCH_CONVERSATION_FAILED,
    payload: error,
  };
};

const sendConversationRequest = () => {
  return {
    type: SEND_CONVERSATION_REQUEST,
  };
};

const sendConversationSuccess = (data) => {
  return {
    type: SEND_CONVERSATION_SUCCESSS,
    payload: data,
  };
};

const sendConversationFailed = (error) => {
  return {
    type: SEND_CONVERSATION_FAILED,
    payload: error,
  };
};

const editConversationRequest = () => {
  return {
    type: EDIT_CONVERSATION_REQUEST,
  };
};

const editConversationSuccess = (data) => {
  return {
    type: EDIT_CONVERSATION_SUCCESSS,
    payload: data,
  };
};

const editConversationFailed = (error) => {
  return {
    type: EDIT_CONVERSATION_FAILED,
    payload: error,
  };
};

const deleteConversationRequest = () => {
  return {
    type: DELETE_CONVERSATION_REQUEST,
  };
};

const deleteConversationSuccess = (data) => {
  return {
    type: DELETE_CONVERSATION_SUCCESSS,
    payload: data,
  };
};

const deleteConversationFailed = (error) => {
  return {
    type: DELETE_CONVERSATION_FAILED,
    payload: error,
  };
};

export {
  fetchConversationRequest,
  fetchConversationSuccess,
  fetchConversationFailed,
  sendConversationRequest,
  sendConversationSuccess,
  sendConversationFailed,
  editConversationRequest,
  editConversationSuccess,
  editConversationFailed,
  deleteConversationRequest,
  deleteConversationSuccess,
  deleteConversationFailed,
};
