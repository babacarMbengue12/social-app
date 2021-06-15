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
import NewPost from "../posts/newPost";
class Home extends Component {
  state = {
    loading: false,
    currentIndex: 0,
    perpage: 3,
    user: {},
  };
  async componentDidMount() {
    if (this.props.posts.length === 0) {
      this.setState({ loading: true });
      const users = await list_user();
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
    const { user } = this.props;
    const { currentIndex, perpage } = this.state;
    const d = this.getPosts();
    const posts = _.slice(d, 0, (currentIndex + 1) * perpage);
    const hasNext = (currentIndex + 1) * perpage < d.length;
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
          <div className="col-md-3">
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Image
                className="align-self-center"
                src="https://via.placeholder.com/120/02"
                roundedCircle
              />
            </div>
            <div>
              <h4 className="text-center">
                {user.firstname} -- {user.lastname}
              </h4>
              <div className="text-center">
                <Link to="/account/edit" className="btn btn-primary">
                  Edit profile
                </Link>
              </div>
            </div>
          </div>
          <div className="col-md-9">
            <div className="row justify-content-center">
              {!this.state.loading && <NewPost history={this.props.history} />}
              {posts.map((p) => {
                return (
                  <div
                    key={p.id}
                    className="card col-md-8 m-3"
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
                      {String(this.props.user.id) === String(p.user?.id) && (
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
              {hasNext && (
                <div className="col-md-12 text-right mt-2 mb-2">
                  <button
                    onClick={() =>
                      this.setState({
                        currentIndex: this.state.currentIndex + 1,
                      })
                    }
                    className="btn btn-success"
                  >
                    Load more
                  </button>
                </div>
              )}
              {!this.state.loading && posts.length === 0 && (
                <h4 className="text-center">
                  there is no post{" "}
                  {this.state.user && "For " + this.state.user.username}
                </h4>
              )}
            </div>
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
