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

// import { withFirebase } from "../../context/Firebase";
const firebase = require("firebase");

const fetchMessages = (data) => {
  return (dispatch) => {
    dispatch(fetchMessageRequest);
    firebase
      .firestore()
      .collection("messages")
      .doc(data.conversation_id)
      .onSnapshot(
        (doc) => {
          if (doc.empty) {
            const data = {
              empty: true,
              message: "No Messages available in chat",
            };
            return dispatch(fetchMessageSuccess(data));
          } else {
            let allMessages = [];
            doc.forEach((d) => {
              console.log(d.data());
              allMessages.push(d.data());
            });
            return dispatch(fetchMessageSuccess(allMessages));
          }
        },
        (err) => {
          dispatch(fetchMessageFailed(err));
        }
      );
  };
};

const sendMessage = (data) => {
  return (dispatch) => {
    dispatch(sendMessageRequest);
    firebase
      .firestore()
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
        // update sent to true if message got to database
        dispatch(sendMessageSuccess(doc.data()));
      })
      .catch((err) => {
        dispatch(sendMessageFailed(err));
      });
  };
};

const editMessage = (data) => {
  return (dispatch) => {
    dispatch(editMessageRequest);
    firebase
      .firestore()
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
        // update sent to true
        dispatch(editMessageSuccess(doc.data()));
      })
      .catch((err) => {
        dispatch(editMessageFailed(err));
      });
  };
};

const deleteMessage = (data) => {
  return (dispatch) => {
    dispatch(deleteMessageRequest);
    firebase
      .firestore()
      .collection("messages")
      .doc(data.message_id)
      .delete()
      .then(() => {
        const info = { message: "Message deleted successfully" };
        dispatch(deleteMessageSuccess(info));
      })
      .catch((err) => {
        dispatch(deleteMessageFailed(err));
      });
  };
};

export { fetchMessages, sendMessage, editMessage, deleteMessage };
