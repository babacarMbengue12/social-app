import React from "react";
import Center from "../shared/Center";
import MyForm from "../shared/Form";
import { Form } from "react-bootstrap";
import * as Yup from "yup";
import { connect } from "react-redux";
import { onEditPost } from "../redux/posts/action";
import { edit_post } from "../utils/http/user";
import { list_posts } from "../utils/http/user";

class EditAcount extends MyForm {
  state = {
    data: {
      title: "",
      content: "",
      user: this.props.user.id,
    },
    post: {},
    errors: {},
    loading: false,
  };
  Schema = Yup.object().shape({
    title: Yup.string().required().min(5).label("Title"),
    content: Yup.string().required().min(15).label("Content"),
  });
  async componentDidMount() {
    const id = String(this.props.match.params.id);

    let posts = this.props.posts;
    if (posts.length === 0) {
      posts = await list_posts();
    }
    if (id) {
      const index = posts.findIndex((p) => String(p.id) === id);
      if (index !== -1) {
        if (String(posts[index].user.id) === String(this.props.user.id)) {
          this.setState({
            data: { title: posts[index].title, content: posts[index].content },
          });
          this.setState({ post: posts[index] });
        } else {
          this.props.history.push("/not-fount");
        }
      } else {
        this.props.history.push("/not-fount");
      }
    }
  }

  async submit() {
    this.setState({ loading: true });
    try {
      const res = await edit_post(this.state.post.id, {
        ...this.state.data,
        content: this.state.html,
      });
      this.props.onEditPost(res.data);
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
          {/* {this.renderFile("image", "Image")} */}
          {this.renderMarkDown("content")}
          {this.renderButton("Edit Post")}
        </Form>
      </Center>
    );
  }
}
const mapState = ({ user, posts }) => ({
  user: user.user,
  token: user.jwt,
  posts,
});
export default connect(mapState, { onEditPost })(EditAcount);
