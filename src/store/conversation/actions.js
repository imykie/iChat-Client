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
// import { withFirebase } from "../../context/Firebase";

const firebase = require("firebase");

const fetchConversation = (data) => {
  return async (dispatch) => {
    dispatch(fetchConversationRequest);
    await firebase
      .firestore()
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

const fetchAllConversation = (data) => {
  return async (dispatch) => {
    dispatch(fetchConversationRequest);
    await firebase
      .firestore()
      .collection("conversation")
      .where("user_id", "=", data.user_id)
      .get()
      .then((doc) => {
        if (!doc.exists) {
          const data = { message: "Conversation does not exist" };
          return dispatch(fetchConversationSuccess(data));
        } else {
          console.log(doc.data())
          return dispatch(fetchConversationSuccess(doc.data()));
        }
      })
      .catch((err) => {
        dispatch(fetchConversationFailed(err));
      });
  };
};

const createConversation = (data) => {
  return async (dispatch, getState) => {
    getState();
    dispatch(createConversationRequest());
    await firebase
      .firestore()
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
        // const returnedData = doc.data();
        dispatch(createConversationSuccess(doc));
        console.log(doc);
      })
      .catch((err) => {
        dispatch(createConversationFailed(err));
        console.log(err, data);
      });
  };
};

const editConversation = (data) => {
  return async (dispatch) => {
    dispatch(editConversationRequest);
    await firebase
      .firestore()
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

const deleteConversation = (data) => {
  return async (dispatch) => {
    dispatch(deleteConversationRequest);
    await firebase
      .firestore()
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
  return async (dispatch) => {
    dispatch(editConversationRequest);
    await firebase
      .firestore()
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
  return async (dispatch) => {
    dispatch(editConversationRequest);
    await firebase
      .firestore()
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

export {
  fetchConversation,
  fetchAllConversation,
  createConversation,
  editConversation,
  deleteConversation,
  makeAdmin,
  addMember,
};
