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
// const firestore = firebase.firestore();

const fetchConversation = (data) => {
  return (dispatch) => {
    dispatch(fetchConversationRequest);
    firebase
      .firestore()
      .collection("conversation")
      .doc(data.id)
      .onSnapshot(
        (doc) => {
          if (doc.empty) {
            const data = {
              empty: true,
              message: "Conversation does not exist",
            };
            return dispatch(fetchConversationSuccess(data));
          } else {
            return dispatch(fetchConversationSuccess(doc.data()));
          }
        },
        (err) => {
          dispatch(fetchConversationFailed(err));
        }
      );
  };
};

const fetchAllConversation = (data) => {
  return (dispatch) => {
    dispatch(fetchConversationRequest);
    firebase
      .firestore()
      .collection("conversation")
      .where("members", "array-contains", { user_id: data.user_id })
      .onSnapshot(
        (doc) => {
          if (doc.empty) {
            const data = {
              empty: true,
              message: "Conversation does not exist",
            };
            return dispatch(fetchConversationSuccess(data));
          } else {
            let allConversations = [];
            doc.forEach((d) => {
              console.log(d.data());
              allConversations.push(d.data());
            });
            return dispatch(fetchConversationSuccess(allConversations));
          }
        },
        (err) => {
          dispatch(fetchConversationFailed(err));
        }
      );
  };
};

const createConversation = (data) => {
  return (dispatch, getState) => {
    getState();
    dispatch(createConversationRequest());
    firebase
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
  return (dispatch) => {
    dispatch(editConversationRequest);
    firebase
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
  return (dispatch) => {
    dispatch(deleteConversationRequest);
    firebase
      .firestore()
      .collection("conversation")
      .doc(data.conversation_id)
      .delete()
      .then(() => {
        const info = { message: "conversation deleted successfully" };
        dispatch(deleteConversationSuccess(info));
      })
      .catch((err) => {
        dispatch(deleteConversationFailed(err));
      });
  };
};

const makeAdmin = (data) => {
  return (dispatch) => {
    dispatch(editConversationRequest);
    firebase
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
    const userId = await firebase
      .firestore()
      .collection("users")
      .where("email", "==", "tundexmike@gmail.com")
      .get()
      .then((doc) => {
        console.log(doc.data());
        return doc.data().uid;
      })
      .catch((err) => {
        console.log(err);
        return null;
      });

    if (userId) {
      firebase
        .firestore()
        .collection("conversation")
        .doc(data.conversation_id)
        .update({
          members: firebase.firestore.FieldValue.arrayUnion({
            user_id: userId,
          }),
        })
        .then((doc) => {
          dispatch(editConversationSuccess(doc.data()));
        })
        .catch((err) => {
          dispatch(editConversationFailed(err));
        });
    }
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
