import React from "react";
import Center from "../shared/Center";
import MyForm from "../shared/Form";
import { Form } from "react-bootstrap";
import { register } from "../utils/http/auth";
import { Link } from "react-router-dom";
import * as Yup from "yup";
class Register extends MyForm {
  state = {
    data: {
      username: "",
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      password_confirmation: "",
      provider: null,
      resetPasswordToken: null,
      confirmed: true,
      blocked: false,
      role: null,
      bio: "",
    },
    errors: {},
    loading: false,
  };
  Schema = Yup.object().shape({
    email: Yup.string().email().required().label("Email"),
    password: Yup.string().required().label("Password").min(6),
    firstname: Yup.string().required().min(3).label("First Name"),
    lastname: Yup.string().required().min(3).label("Last Name"),
    username: Yup.string().required().min(3).label("Username"),
    bio: Yup.string().required().min(3).label("Bio"),
    password_confirmation: Yup.string()
      .label("Password Confirmation")
      .required()
      .test("passwords-match", "passwords does not match", function (value) {
        return this.parent.password === value;
      }),
  });
  async submit() {
    this.setState({ loading: true });
    try {
      await register({
        ...this.state.data,
        identifier: this.state.data.username,
      });
      window.location = "/login";
    } catch (ex) {
      try {
        const errors = {};
        const messages = ex?.response?.data?.message;
        if (messages) {
          messages.forEach((m) => {
            const m2 = m.messages[0];
            Object.keys(this.state.data).forEach((key) => {
              if (m2?.id.toString().includes(key)) {
                errors[key] = m2?.message;
              }
            });
          });
        }
        this.setState({ errors });
      } catch (e) {
        alert(ex);
      }
    }
    this.setState({ loading: false });
  }
  render() {
    return (
      <Center>
        <h1 className="text-center">Register</h1>
        <Form style={{ minWidth: 300 }}>
          <div className="row">
            <div className="col-md-6">
              {this.renderInput("username", "Username")}
            </div>
            <div className="col-md-6">
              {this.renderInput("email", "Email", { type: "email" })}
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              {this.renderInput("firstname", "First Name", { type: "text" })}
            </div>
            <div className="col-md-6">
              {this.renderInput("lastname", "Last Name", { type: "text" })}
            </div>
          </div>
          {this.renderInput("bio", "Bio", { as: "textarea" })}
          {this.renderInput("password", "Password", { type: "password" })}
          {this.renderInput("password_confirmation", "Password Confirmation", {
            type: "password",
          })}
          {this.renderButton("Register")}
        </Form>
        <small>
          alredy have an account ? <Link to="/login">Login Here</Link>
        </small>
      </Center>
    );
  }
}

export default Register;
