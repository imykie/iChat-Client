import {
  FETCH_MESSAGE_REQUEST,
  FETCH_MESSAGE_SUCCESSS,
  FETCH_MESSAGE_FAILED,
  SEND_MESSAGE_REQUEST,
  SEND_MESSAGE_SUCCESSS,
  SEND_MESSAGE_FAILED,
  EDIT_MESSAGE_REQUEST,
  EDIT_MESSAGE_SUCCESSS,
  EDIT_MESSAGE_FAILED,
  DELETE_MESSAGE_REQUEST,
  DELETE_MESSAGE_SUCCESSS,
  DELETE_MESSAGE_FAILED,
} from "./actionTypes";

const fetchMessageRequest = () => {
  return {
    type: FETCH_MESSAGE_REQUEST,
  };
};

const fetchMessageSuccess = (data) => {
  return {
    type: FETCH_MESSAGE_SUCCESSS,
    payload: data,
  };
};

const fetchMessageFailed = (error) => {
  return {
    type: FETCH_MESSAGE_FAILED,
    payload: error,
  };
};


