import React from "react";

import { withFirebase } from "../Firebase";
import AuthUserContext from "./context";

const { log } = console;

const withAuthentication = (Component) => {
  class Authentication extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        authUser: JSON.parse(localStorage.getItem("authUser")),
      };

      this.listener = () => {};
    }

    componentDidMount() {
      this.listener = this.props.firebase.auth.onAuthStateChanged(
        (authUser) => {
          if (authUser) {
            localStorage.setItem("authUser", JSON.stringify(authUser));
            this.setState({ authUser: authUser });
            log(this.state.authUser);
          } else {
            localStorage.removeItem("authUser");
            this.setState({ authUser: null });
            log(this.state.authUser);
          }
        }
      );
    }

    componentWillUnmount() {
      this.listener();
    }

    render() {
      return (
        <AuthUserContext.Provider value={this.state.authUser}>
          <Component {...this.props} authState={this.state.authUser} />
          {log(this.state)}
        </AuthUserContext.Provider>
      );
    }
  }

  return withFirebase(Authentication);
};

export default withAuthentication;
