import React from "react";
import { connect } from "react-redux";
import { Redirect, Route } from "react-router-dom";

function UserRoute({ login, component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      exact
      render={(props) =>
        login ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
}

const mapState = ({ user }) => ({ login: user?.user?.id });
export default connect(mapState)(UserRoute);
