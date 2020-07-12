import React, { useState, useEffect } from "react";
import { withAuthorization } from "../../context/Session";
import { withFirebase } from "../../context/Firebase";
import { compose } from "recompose";
import { connect } from "react-redux";
import {
  fetchConversation,
  fetchAllConversation,
  createConversation,
  editConversation,
  deleteConversation,
  makeAdmin,
  addMember,
  fetchMessages,
  sendMessage,
  editMessage,
  deleteMessage,
} from "../../store";

function Chat(props) {
  const [state, setState] = useState({
    user: JSON.parse(localStorage.getItem("authUser")),
    conversation: props.data.conversation,
    message: props.data.message,
    data: {
      conversation_name: "",
    },
  });

  useEffect(() => {
    props.fetchAllConversation({ user_id: state.user.uid });
  }, []);

  console.log(props, state);

  const getUsers = () => {
    props.firebase.firestore
      .collection("users")
      .get()
      .then((snapshot) => {
        if (snapshot.empty) {
          console.log("No matching documents");
          return;
        }
        snapshot.forEach((doc) => {
          console.log(doc.data());
        });
      });
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    await props.createConversation(state.data);
  };

  const onCreateConversationChange = (event) => {
    let inputName = event.target.name;
    let inputValue = event.target.value;
    let statusCopy = Object.assign({}, state);
    statusCopy.data[inputName] = inputValue;
    statusCopy.data.user_id = state.user.uid;
    statusCopy.data.conversation_type = "group";
    setState({ ...statusCopy });
  };

  const {
    data: { conversation_name },
  } = state;

  return (
    <div>
      <div>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="conversation_name"
            value={conversation_name}
            onChange={onCreateConversationChange}
            style={{ width: 80 + "%", marginLeft: 10 + "%" }}
          />
          <button type="submit" value="submit">
            Create Conversation
          </button>
          <button
            type="button"
            onClick={() =>
              props.addMember({
                userEmail: "paulfrodo@gmail.com",
                conversationId: "ETxP5toaD6wLo5V7iIcd",
              })
            }
          >
            Add member
          </button>
        </form>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    data: state,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchConversation: (data) => dispatch(fetchConversation(data)),
    fetchAllConversation: (data) => dispatch(fetchAllConversation(data)),
    createConversation: (data) => dispatch(createConversation(data)),
    editConversation: (data) => dispatch(editConversation(data)),
    deleteConversation: (data) => dispatch(deleteConversation(data)),
    makeAdmin: (data) => dispatch(makeAdmin(data)),
    addMember: (data) => dispatch(addMember(data)),
    fetchMessages: (data) => dispatch(fetchMessages(data)),
    sendMessage: (data) => dispatch(sendMessage(data)),
    editMessage: (data) => dispatch(editMessage(data)),
    deleteMessage: (data) => dispatch(deleteMessage(data)),
  };
};

const condition = (authUser) => !!authUser;

const enhance = compose(
  withAuthorization(condition),
  withFirebase,
  connect(mapStateToProps, mapDispatchToProps)
);

export default enhance(Chat);
