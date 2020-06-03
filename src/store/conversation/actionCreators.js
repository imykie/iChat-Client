import {
  FETCH_CONVERSATION_REQUEST,
  FETCH_CONVERSATION_SUCCESS,
  FETCH_CONVERSATION_FAILED,
  CREATE_CONVERSATION_REQUEST,
  CREATE_CONVERSATION_SUCCESS,
  CREATE_CONVERSATION_FAILED,
  EDIT_CONVERSATION_REQUEST,
  EDIT_CONVERSATION_SUCCESS,
  EDIT_CONVERSATION_FAILED,
  DELETE_CONVERSATION_REQUEST,
  DELETE_CONVERSATION_SUCCESS,
  DELETE_CONVERSATION_FAILED,
} from "./actionTypes";

const fetchConversationRequest = () => {
  return {
    type: FETCH_CONVERSATION_REQUEST,
  };
};

const fetchConversationSuccess = (data) => {
  return {
    type: FETCH_CONVERSATION_SUCCESS,
    payload: data,
  };
};

const fetchConversationFailed = (error) => {
  return {
    type: FETCH_CONVERSATION_FAILED,
    payload: error,
  };
};

const createConversationRequest = () => {
  return {
    type: CREATE_CONVERSATION_REQUEST,
  };
};

const createConversationSuccess = (data) => {
  return {
    type: CREATE_CONVERSATION_SUCCESS,
    payload: data,
  };
};

const createConversationFailed = (error) => {
  return {
    type: CREATE_CONVERSATION_FAILED,
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
    type: EDIT_CONVERSATION_SUCCESS,
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
    type: DELETE_CONVERSATION_SUCCESS,
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
  createConversationRequest,
  createConversationSuccess,
  createConversationFailed,
  editConversationRequest,
  editConversationSuccess,
  editConversationFailed,
  deleteConversationRequest,
  deleteConversationSuccess,
  deleteConversationFailed,
};
