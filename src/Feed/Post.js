import React, { Component } from "react";
import { list_user, list_posts } from "../utils/http/user";
import { connect } from "react-redux";
import Content from "./Content";
class Home extends Component {
  state = {
    post: {},
  };
  async componentDidMount() {
    const id = this.props.match.params.id;
    let posts = this.props.posts;
    if (posts.length === 0) {
      posts = await list_posts();
    }
    if (id) {
      const index = posts.findIndex((p) => p.id == id);
      if (index !== -1) {
        this.setState({ post: posts[index] });
      }
    }
  }

  render() {
    return (
      <div className="container mt-3">
        <div className="row">
          <div className="col-md-9">
            <h1> {this.state.post.title}</h1>
            <p> {this.state.post.created_at}</p>
            <p> {this.state.post?.user?.username}</p>
            <Content content={this.state.post.content} />
          </div>
        </div>
      </div>
    );
  }
}
const mapState = ({ posts, user }) => ({
  posts,
  user: user.user,
});
export default connect(mapState)(Home);
