import React, { Component } from "react";

class LinkWithGithub extends Component {
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
          <button type="submit">Link Account With Github</button>
          {error && <p>{error.message}</p>}
          {success && <p>Account linking successful</p>}
        </form>
      </div>
    );
  }
}

export default LinkWithGithub;
