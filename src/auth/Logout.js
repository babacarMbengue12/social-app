import React from "react";
import { connect } from "react-redux";
import { unsetUser } from "../utils/userStorage";
import { onLogin } from "../redux/user/action";
class Logout extends React.Component {
  componentDidMount() {
    unsetUser();
    this.props.onLogin({ user: {}, token: null });
    window.location = "/";
  }

  render() {
    return null;
  }
}
export default connect(null, { onLogin })(Logout);
