import React, { Component } from "react";
import Navbar from "./Navbar";
import { Route, Redirect, Switch } from "react-router-dom";
import Login from "../auth/Login";
import Register from "../auth/Register";
import Account from "../auth/Account";
import { connect } from "react-redux";
import Logout from "../auth/Logout";
import EditAcount from "../auth/EditAccount";
import Home from "../Feed/Home";
import newPost from "../posts/newPost";
import EditPost from "../posts/EditPost";
import Post from "../Feed/Post";
import UserRoute from "../routes/UserRoute";
import GuestRoute from "../routes/GuestRoute";

class Layout extends Component {
  render() {
    console.log("user", this.props.user);
    return (
      <React.Fragment>
        <Navbar user={this.props.user} />
        <Switch>
          <UserRoute path="/" exact component={Home} />
          <GuestRoute path="/login" exact component={Login} />
          <GuestRoute path="/register" exact component={Register} />
          <UserRoute path="/account/edit" exact component={EditAcount} />
          <UserRoute path="/account" exact component={Account} />
          <UserRoute path="/logout" exact component={Logout} />
          <UserRoute path="/posts/show/:id" exact component={Post} />
          <UserRoute path="/posts/new" exact component={newPost} />
          <UserRoute path="/posts/edit/:id" exact component={EditPost} />
          <Route
            path="/not-found"
            exact
            component={() => (
              <div className="container mt-5">
                <h1>Page not fount</h1>
              </div>
            )}
          />
          <Redirect to="/not-found" />
        </Switch>
      </React.Fragment>
    );
  }
}
const mapState = ({ user }) => ({ user: user.user, token: user.token || null });
export default connect(mapState)(Layout);
