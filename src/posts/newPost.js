import React from "react";
import Center from "../shared/Center";
import MyForm from "../shared/Form";
import { Form } from "react-bootstrap";
import * as Yup from "yup";
import { connect } from "react-redux";
import { onAddPost } from "../redux/posts/action";
import { new_post } from "../utils/http/user";
class EditAcount extends MyForm {
  state = {
    data: {
      title: "",
      content: "",
      user: this.props.user.id,
    },
    errors: {},
    loading: false,
  };
  Schema = Yup.object().shape({
    title: Yup.string().required().min(5).label("Title"),
    content: Yup.string().required().min(15).label("Content"),
  });
  async submit() {
    this.setState({ loading: true });
    try {
      const res = await new_post({
        ...this.state.data,
        content: this.state.html,
      });
      this.props.onAddPost(res.data);
      window.location = "/";
    } catch (ex) {
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
    }
    this.setState({ loading: false });
  }
  render() {
    return (
      <Center>
        <h1 className="text-center">New Post</h1>
        <Form style={{ minWidth: 300, maxWidth: 600 }}>
          {this.renderInput("title", "Title")}
          {this.renderMarkDown("content")}
          {this.renderButton("New Post")}
        </Form>
      </Center>
    );
  }
}
const mapState = ({ user }) => ({ user: user.user, token: user.jwt });
export default connect(mapState, { onAddPost })(EditAcount);
