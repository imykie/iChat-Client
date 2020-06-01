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
import { withFirebase } from "../../components/Firebase";

const fetchConversation = (data, { firebase }) => {
  return (dispatch) => {
    dispatch(fetchConversationRequest);
    firebase.firestore
      .collection("conversation")
      .doc(data.id)
      .get()
      .then((doc) => {
        if (!doc.exists) {
          const data = {message: 'Conversation does not exist'}
          return dispatch(fetchConversationSuccess(data))
        } else {
          return dispatch(fetchConversationSuccess(doc.data()))
        }
      })
      .catch((err) => {
        dispatch(fetchConversationFailed(err));
      });
  };
};

const sendConversation = (data, { firebase }) => {
  return (dispatch) => {
    dispatch(sendConversationRequest);
  };
};

const editConversation = (data, { firebase }) => {
  return (dispatch) => {
    dispatch(editConversationRequest);
  };
};

const deleteConversation = (data, { firebase }) => {
  return (dispatch) => {
    dispatch(deleteConversationRequest);
  };
};

const fetchConversationContainer = withFirebase(fetchConversation);
const sendConversationContainer = withFirebase(sendConversation);
const editConversationContainer = withFirebase(editConversation);
const deleteConversationContainer = withFirebase(deleteConversation);

export {
  fetchConversationContainer,
  sendConversationContainer,
  editConversationContainer,
  deleteConversationContainer,
};
