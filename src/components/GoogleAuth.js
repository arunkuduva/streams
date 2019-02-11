import React from "react";
import { connect } from "react-redux";
import { signIn, signOut } from "../actions";

class GoogleAuth extends React.Component {
  // state = { isSignedIn: null };
  componentDidMount() {
    window.gapi.load("client:auth2", () => {
      window.gapi.client
        .init({
          clientId:
            "1044496529088-th3o62m7sravej22i8fo35c645nlrtdd.apps.googleusercontent.com",
          scope: "email"
        })
        .then(() => {
          this.auth = window.gapi.auth2.getAuthInstance();
          console.log(this.auth.isSignedIn);
          this.onAuthChange(this.auth.isSignedIn.get());
          //  this.setState({ isSignedIn: this.auth.isSignedIn.get() });
          this.auth.isSignedIn.listen(this.onAuthChange);
        });
    });
  }

  onAuthChange = isSignedIn => {
    // this.setState({ isSignedIn: isSignedIn });
    if (isSignedIn) {
      this.props.signIn(this.auth.currentUser.get().getId());
    } else {
      this.props.signOut();
    }
  };

  onSignInClick = () => {
    window.gapi.auth2.getAuthInstance().signIn();
    //this.onAuthChange();
  };

  onSignOutClick = () => {
    window.gapi.auth2.getAuthInstance().signOut();
    //this.onAuthChange();
  };
  renderAuthButton() {
    if (this.props.isSignedIn === null) {
      return null;
    } else if (this.props.isSignedIn) {
      return (
        <button className="ui red google button" onClick={this.onSignOutClick}>
          <i className="google icon" />
          Signout
        </button>
      );
    } else {
      return (
        <button className="ui red google button" onClick={this.onSignInClick}>
          <i className="google icon" />
          SignIn with Google
        </button>
      );
    }
  }

  render() {
    return <div>{this.renderAuthButton()} </div>;
  }
}

const mapStateToProps = state => {
  return { isSignedIn: state.auth.isSignedIn };
};
export default connect(
  mapStateToProps,
  { signIn, signOut }
)(GoogleAuth);
