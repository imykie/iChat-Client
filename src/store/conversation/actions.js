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
const firebase = require("firebase");

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
    console.log(data);
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
    firebase.firestore
      .collection("conversation")
      .doc(data.conversation_id)
      .update({
        conversation_name: data.conversation_name,
        updated_at: new Date(Date.now()),
        conversation_avatar: data.conversation_avatar,
      })
      .then((doc) => {
        dispatch(editConversationSuccess(doc.data()));
      })
      .catch((err) => {
        dispatch(editConversationFailed(err.data()));
      });
  };
};

const deleteConversation = (data, { firebase }) => {
  return (dispatch) => {
    dispatch(deleteConversationRequest);
    firebase.firestore
      .collection("conversation")
      .doc(data.conversation_id)
      .delete()
      .then((doc) => {
        dispatch(deleteConversationSuccess(doc.data));
      })
      .catch((err) => {
        dispatch(deleteConversationFailed(err));
      });
  };
};

const makeAdmin = (data) => {
  return (dispatch) => {
    dispatch(editConversationRequest);
    firebase.firestore
      .collection("conversation")
      .doc(data.conversation_id)
      .update({
        admins: firebase.firestore.FieldValue.arrayUnion({
          user_id: data.admin_id,
        }),
      })
      .then((doc) => {
        dispatch(editConversationSuccess(doc.data()));
      })
      .catch((err) => {
        dispatch(editConversationFailed(err));
      });
  };
};

const addMember = (data) => {
  return (dispatch) => {
    dispatch(editConversationRequest);
    firebase.firestore
      .collection("conversation")
      .doc(data.conversation_id)
      .update({
        members: firebase.firestore.FieldValue.arrayUnion({
          user_id: data.member_id,
        }),
      })
      .then((doc) => {
        dispatch(editConversationSuccess(doc.data()));
      })
      .catch((err) => {
        dispatch(editConversationFailed(err));
      });
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
  makeAdmin,
  addMember,
};
