import {
  fetchMessageRequest,
  fetchMessageSuccess,
  fetchMessageFailed,
  sendMessageRequest,
  sendMessageSuccess,
  sendMessageFailed,
  editMessageRequest,
  editMessageSuccess,
  editMessageFailed,
  deleteMessageRequest,
  deleteMessageSuccess,
  deleteMessageFailed,
} from "./actionCreators";

const fetchMessage = () => {
  return (dispatch) => {
    dispatch(fetchMessageRequest);
  };
};

const sendMessage = () => {
  return (dispatch) => {
    dispatch(sendMessageRequest);
  };
};

const editMessage = () => {
  return (dispatch) => {
    dispatch(editMessageRequest);
  };
};

const deleteMessage = () => {
  return (dispatch) => {
    dispatch(deleteMessageRequest);
  };
};

export { fetchMessage, sendMessage, editMessage, deleteMessage };
