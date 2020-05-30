import {
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
} from "./actionCreators";

const fetchConversation = () => {
  return (dispatch) => {
    dispatch(fetchConversationRequest);
  };
};

const sendConversation = () => {
  return (dispatch) => {
    dispatch(sendConversationRequest);
  };
};

const editConversation = () => {
  return (dispatch) => {
    dispatch(editConversationRequest);
  };
};

const deleteConversation = () => {
  return (dispatch) => {
    dispatch(deleteConversationRequest);
  };
};

export {
  fetchConversation,
  sendConversation,
  editConversation,
  deleteConversation,
};
