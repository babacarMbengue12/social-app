import React, { Component } from "react";
import { list_user, list_posts } from "../utils/http/user";
import { onGetPosts, onDeletePost } from "../redux/posts/action";
import { onGetUsers } from "../redux/users/action";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Spinner, Image } from "react-bootstrap";
import _ from "lodash";
import { delete_post } from "../utils/http/user";
import Content from "./Content";
class Home extends Component {
  state = {
    loading: false,
    user: {},
  };
  async componentDidMount() {
    if (this.props.posts.length === 0) {
      this.setState({ loading: true });
      const users = await list_user();
      // this.setState({ user: users[0] || {} });
      this.props.onGetUsers(users);

      const posts = await list_posts();
      this.props.onGetPosts(posts);
      this.setState({ loading: false });
    }
  }
  getPosts() {
    let posts = [];
    if (!this.state.user?.id) {
      posts = this.props.posts;
    } else {
      posts = this.props.posts.filter((p) => p.user?.id === this.state.user.id);
    }
    posts = posts.map((p) => {
      p.order = new Date(p.created_at).getTime();
      return p;
    });
    return _.orderBy(posts, ["order"], ["desc"]);
  }
  async deletePost(post) {
    const posts = this.props.posts;
    this.props.onDeletePost(post);
    try {
      await delete_post(post.id);
      alert("post deleted");
    } catch (ex) {
      alert("post not deleted");
      this.props.onGetPosts(posts);
    }
  }
  render() {
    const { users } = this.props;
    const posts = this.getPosts();
    return (
      <div className="container mt-3">
        {this.state.loading && (
          <div
            className="row"
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Spinner animation={"border"} variant="dark" size="lg" />
          </div>
        )}
        <div className="row">
          <div className="col-md-9">
            <div className="row">
              {posts.map((p) => {
                return (
                  <div
                    key={p.id}
                    className="card col-md-5 m-3"
                    style={{ width: "18rem" }}
                  >
                    <div className="card-body">
                      <h5 className="card-title">
                        <Link to={`/posts/show/${p.id}`}>{p.title}</Link>
                      </h5>
                      <p className="card-text">
                        <Content
                          content={p.content.substring(0, 100) + "..."}
                        />
                      </p>
                      <p>
                        <small>Par {p.user?.username}</small>
                        <small>{p.created_at}</small>
                      </p>
                      <Link
                        to={`/posts/show/${p.id}`}
                        className="btn btn-primary"
                      >
                        Read more
                      </Link>
                      {this.props.user.id == p.user?.id && (
                        <div style={{ marginTop: 25 }}>
                          <Link
                            to={"/posts/edit/" + p.id}
                            className="btn btn-primary"
                          >
                            Edit
                          </Link>
                          <button
                            onClick={() => this.deletePost(p)}
                            className="btn btn-danger ml-1"
                          >
                            Delete
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
              {!this.state.loading && posts.length === 0 && (
                <h4 className="text-center">
                  there is no post{" "}
                  {this.state.user && "For " + this.state.user.username}
                </h4>
              )}
            </div>
          </div>
          <div className="col-md-3">
            <li
              class={
                !this.state.user?.id
                  ? "list-group-item active"
                  : "list-group-item"
              }
            >
              <a
                onClick={(e) => {
                  e.preventDefault();
                  this.setState({ user: null });
                }}
                style={{ color: "inherit" }}
                href="#"
              >
                All User
              </a>
            </li>
            <ul className="list-group">
              {users.map((p) => {
                return (
                  <li
                    key={p.id}
                    className={
                      this.state.user?.id === p.id
                        ? "list-group-item active"
                        : "list-group-item"
                    }
                  >
                    <a
                      style={{ color: "inherit" }}
                      onClick={(e) => {
                        e.preventDefault();
                        this.setState({ user: p });
                      }}
                      href="#"
                    >
                      <Image
                        className="align-self-center mr-2"
                        src="https://via.placeholder.com/40/02"
                        roundedCircle
                      />
                      {p.username}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}
const mapState = ({ users, posts, user }) => ({
  users,
  posts,
  user: user.user,
});

export default connect(mapState, { onGetPosts, onGetUsers, onDeletePost })(
  Home
);
