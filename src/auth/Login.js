import React from "react";
import Center from "../shared/Center";
import MyForm from "../shared/Form";
import { Form } from "react-bootstrap";
import { login } from "../utils/http/auth";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import { onLogin } from "../redux/user/action";
import { setUser } from "../utils/userStorage";
import { connect } from "react-redux";
class Login extends MyForm {
  state = {
    data: {
      username: "",
      password: "",
      remember: false,
    },
    loading: false,
    errors: {},
  };
  Schema = Yup.object().shape({
    username: Yup.string().required().min(3).label("Username"),
    password: Yup.string().required().label("Password"),
  });
  async submit() {
    this.setState({ loading: true });
    try {
      const res = await login({
        identifier: this.state.data.username,
        password: this.state.data.password,
      });
      if (this.state.data.remember) {
        setUser({ ...res.data, remember: false });
      } else {
        setUser({ ...res.data, remember: true });
      }
      this.props.onLogin({ ...res.data, remember: true });
      window.location = "/";
    } catch (ex) {
      this.setState({ errors: { username: "invalid credentials" } });
    }
    this.setState({ loading: false });
  }
  render() {
    return (
      <Center>
        <h1 className="text-center">SIGN IN</h1>
        <Form style={{ minWidth: 350 }}>
          {this.renderInput("username", "Username", { type: "text" })}
          {this.renderInput("password", "Password", { type: "password" })}
          {this.renderCheckbox("remember", "remember me ?")}
          {this.renderButton("Sign in")}
        </Form>
        <small>
          d'ont have account ? <Link to="/register">Register Here</Link>
        </small>
      </Center>
    );
  }
}
export default connect(null, { onLogin })(Login);
