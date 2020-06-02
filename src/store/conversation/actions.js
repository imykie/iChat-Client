import {
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
          const data = { message: "Conversation does not exist" };
          return dispatch(fetchConversationSuccess(data));
        } else {
          return dispatch(fetchConversationSuccess(doc.data()));
        }
      })
      .catch((err) => {
        dispatch(fetchConversationFailed(err));
      });
  };
};

const createConversation = (data, { firebase }) => {
  return (dispatch) => {
    dispatch(createConversationRequest);
    firebase.firestore
      .collection("conversation")
      .add({
        creator_id: data.user_id,
        members: [{ user_id: data.user_id }],
        conversation_name: data.conversation_name,
        conversation_type: data.conversation_type,
        created_at: new Date(Date.now()),
        updated_at: new Date(Date.now()),
        admins: [{ user_id: data.user_id }],
        conversation_avatar: "",
      })
      .then((doc) => {
        dispatch(createConversationSuccess(doc.data()));
      })
      .catch((err) => {
        dispatch(createConversationFailed(err));
      });
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
const createConversationContainer = withFirebase(createConversation);
const editConversationContainer = withFirebase(editConversation);
const deleteConversationContainer = withFirebase(deleteConversation);

export {
  fetchConversationContainer,
  createConversationContainer,
  editConversationContainer,
  deleteConversationContainer,
};
