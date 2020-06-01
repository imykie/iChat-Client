import React, { Component } from "react";
import * as ROUTES from "../../constants/routes";

class LinkWithGoogle extends Component {
  constructor(props) {
    super(props);

    this.state = { success: false, error: null };
  }

  onSubmit = (event) => {
    event.preventDefault();

    this.props.firebase
      .linkGoogle()
      .then((socialAuthUser) => {
        this.setState({ success: true, error: null });
        // this.props.history.push(ROUTES.HOME)
      })
      .catch((err) => {
        this.setState({ error: err });
      });
  };

  render() {
    const { success, error } = this.state;

    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <button type="submit">Link Account With Google</button>
          {error && <p>{error.message}</p>}
          {success && <p>Account linking successful</p>}
        </form>
      </div>
    );
  }
}

export default LinkWithGoogle;
