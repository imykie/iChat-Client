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
} from "../../store";

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: JSON.parse(localStorage.getItem("authUser")),
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
    console.log(this.getUsers());
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
    fetchConversation: () => dispatch(fetchConversationContainer(ownProps.data.id)),
    createConversation: () => dispatch(createConversationContainer(ownProps.data.id)),
    editConversation: () => dispatch(editConversationContainer(ownProps.data.id)),
    deleteConversation: () => dispatch(deleteConversationContainer(ownProps.data.id))
  };
};
const condition = (authUser) => !!authUser;

const enhance = compose(
  withAuthorization(condition),
  withFirebase,
  connect(mapStateToProps, mapDispatchToProps)
);

export default enhance(Chat);
