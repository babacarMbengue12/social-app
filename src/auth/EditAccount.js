import React from "react";
import Center from "../shared/Center";
import MyForm from "../shared/Form";
import { Form } from "react-bootstrap";
import { edit_account } from "../utils/http/auth";
import * as Yup from "yup";
import { connect } from "react-redux";
import { setUser } from "../utils/userStorage";
class EditAcount extends MyForm {
  state = {
    data: {
      username: this.props.user.username,
      firstname: this.props.user.firstname,
      lastname: this.props.user.lastname,
      email: this.props.user.email,
      bio: this.props.user.bio,
    },
    errors: {},
    loading: false,
  };
  Schema = Yup.object().shape({
    email: Yup.string().email().required().label("Email"),
    firstname: Yup.string().required().min(3).label("First Name"),
    lastname: Yup.string().required().min(3).label("Last Name"),
    bio: Yup.string().required().min(3).label("Username"),
  });
  async submit() {
    this.setState({ loading: true });
    try {
      const res = await edit_account(this.props.user.id, {
        ...this.state.data,
        identifier: this.state.data.username,
      });
      // this.props.onLogin({ user: res.data, token: this.props.token });
      setUser({ user: res.data, jwt: this.props.token });
      window.location = "/account";
    } catch (ex) {
      if (ex.response.status === 400) {
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
      } else {
        alert(ex);
      }
    }
    this.setState({ loading: false });
  }
  render() {
    return (
      <Center>
        <h1 className="text-center">EditAcount</h1>
        <Form style={{ minWidth: 300 }}>
          {this.renderInput("username", "Username")}
          {this.renderInput("email", "Email", { type: "email" })}
          {this.renderInput("firstname", "First Name", { type: "text" })}
          {this.renderInput("lastname", "Last Name", { type: "text" })}
          {this.renderInput("bio", "Bio", { as: "textarea" })}

          {this.renderButton("EditAcount")}
        </Form>
      </Center>
    );
  }
}
const mapState = ({ user }) => ({ user: user.user, token: user.jwt });
export default connect(mapState)(EditAcount);
