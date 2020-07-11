import React, { Component } from "react";
import { withAuthorization } from "../../context/Session";
import { withFirebase } from "../../context/Firebase";
import { compose } from "recompose";
import { connect } from "react-redux";
import {
  fetchConversation,
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

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: JSON.parse(localStorage.getItem("authUser")),
      conversation: this.props.data.conversation,
      message: this.props.data.message,
      data: {
        conversation_name: "",
      },
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

  onSubmit = async (event) => {
    event.preventDefault();
    await this.props.createConversation(this.state.data);
  };

  onCreateConversationChange = (event) => {
    let inputName = event.target.name;
    let inputValue = event.target.value;
    let statusCopy = Object.assign({}, this.state);
    statusCopy.data[inputName] = inputValue;
    statusCopy.data.user_id = this.state.user.uid;
    statusCopy.data.conversation_type = "group";

    this.setState({ ...statusCopy });
  };

  render() {
    console.log(this.props, this.state);
    const {
      data: { conversation_name },
    } = this.state;

    return (
      <div>
        <div>
          <form onSubmit={this.onSubmit}>
            <input
              type="text"
              name="conversation_name"
              value={conversation_name}
              onChange={this.onCreateConversationChange}
              style={{ width: 80 + "%", marginLeft: 10 + "%" }}
            />
            <button type="submit" value="submit">
              Create Conversation
            </button>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    data: state,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchConversation: (data) => dispatch(fetchConversation(data)),
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
