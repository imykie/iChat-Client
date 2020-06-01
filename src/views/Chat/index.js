import React, { Component } from "react";
import { withAuthorization } from "../../components/Session";
import { withFirebase } from "../../components/Firebase";
import { compose } from "recompose";

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
const condition = (authUser) => !!authUser;

const enhance = compose(withAuthorization(condition), withFirebase);

export default enhance(Chat);
