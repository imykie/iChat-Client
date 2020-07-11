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
import { withFirebase } from "../../context/Firebase";

const fetchMessages = (data, { firebase }) => {
  return (dispatch) => {
    dispatch(fetchMessageRequest);
    firebase.firestore
      .collection("messages")
      .doc(data.conversation_id)
      .get()
      .then((doc) => {
        if (!doc.exists) {
          const data = { message: "No Messages in this conversa" };
          return dispatch(fetchMessageSuccess(data));
        } else {
          return dispatch(fetchMessageSuccess(doc.data()));
        }
      })
      .catch((err) => {
        dispatch(fetchMessageFailed(err));
      });
  };
};

const sendMessage = (data, { firebase }) => {
  return (dispatch) => {
    dispatch(sendMessageRequest);
    firebase.firestore
      .collection("messages")
      .add({
        conversation_id: data.conversation_id,
        sender_id: data.sender_id,
        message_body: data.message,
        created_at: new Date(Date.now()),
        updated_at: new Date(Date.now()),
        sent: false,
        edited: {
          status: false,
          num: 0,
        },
        delivered: false,
        read_by: [],
      })
      .then((doc) => {
        //update sent to true if message got to database
        dispatch(sendMessageSuccess(doc.data()));
      })
      .catch((err) => {
        dispatch(sendMessageFailed(err));
      });
  };
};

const editMessage = (data, { firebase }) => {
  return (dispatch) => {
    dispatch(editMessageRequest);
    firebase.firestore
      .collection("messages")
      .doc(data.message_id)
      .update({
        message_id: data.message,
        updated_at: new Date(Date.now()),
        sent: false,
        edited: {
          status: true,
          num: data.num_edited + 1,
        },
      })
      .then((doc) => {
        //update sent to true
        dispatch(editMessageSuccess(doc.data()));
      })
      .catch((err) => {
        dispatch(editMessageFailed(err));
      });
  };
};

const deleteMessage = (data, {firebase}) => {
  return (dispatch) => {
    dispatch(deleteMessageRequest);
    firebase.firestore
      .collection("messages")
      .doc(data.message_id)
      .delete()
      .then((doc) => {
        dispatch(deleteMessageSuccess(doc.data()));
      })
      .catch((err) => {
        dispatch(deleteMessageFailed(err));
      });
  };
};

// const fetchMessagesContainer = withFirebase(fetchMessages);
// const sendMessageContainer = withFirebase(sendMessage);
// const editMessageContainer = withFirebase(editMessage);
// const deleteMessageContainer = withFirebase(deleteMessage);

export {
  fetchMessages,
  sendMessage,
  editMessage,
  deleteMessage,
};
