import React, { Component } from "react";
import { withAuthorization } from "../../components/Session";
import { withFirebase } from "../../components/Firebase";
import { compose } from "recompose";
import { connect } from "react-redux";
import {
  fetchConversationContainer,
  createConversationContainer,
  editConversationContainer,
  deleteConversationContainer,
  makeAdmin,
  addMember,
  fetchMessagesContainer,
  sendMessageContainer,
  editMessageContainer,
  deleteMessageContainer,
} from "../../store";

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: JSON.parse(localStorage.getItem("authUser")),
      conversation: this.props.data.conversation,
      message: this.props.data.message,
    };
  }

  getUsers = () => {
    this.props.firebase.firestore
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
  render() {
    console.log(this.getUsers(), this.props, this.state);
    return <div>Chat</div>;
  }
}

const mapStateToProps = (state) => {
  return {
    data: state,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchConversation: () =>
      dispatch(fetchConversationContainer(ownProps.data)),
    createConversation: () =>
      dispatch(createConversationContainer(ownProps.data)),
    editConversation: () => dispatch(editConversationContainer(ownProps.data)),
    deleteConversation: () =>
      dispatch(deleteConversationContainer(ownProps.data)),
    makeAdmin: () => dispatch(makeAdmin(ownProps.data)),
    addMember: () => dispatch(addMember(ownProps.data)),
    fetchMessages: () => dispatch(fetchMessagesContainer(ownProps.data)),
    sendMessage: () => dispatch(sendMessageContainer(ownProps.data)),
    editMessage: () => dispatch(editMessageContainer(ownProps.data)),
    deleteMessage: () => dispatch(deleteMessageContainer(ownProps.data)),
  };
};
const condition = (authUser) => !!authUser;

const enhance = compose(
  withAuthorization(condition),
  withFirebase,
  connect(mapStateToProps, mapDispatchToProps)
);

export default enhance(Chat);
