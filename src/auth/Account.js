import React from "react";
import Center from "../shared/Center";
import { Image, Spinner } from "react-bootstrap";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { unsetUser } from "../utils/userStorage";
import { delete_account } from "../utils/http/auth";
class Account extends React.Component {
  state = {
    loading: false,
  };
  async delecteAccount() {
    this.setState({ loading: true });
    try {
      await delete_account(this.props.user.id);
      unsetUser();
      window.location = "/";
    } catch (ex) {
      console.log(ex);
    }
    this.setState({ loading: false });
  }
  render() {
    const user = this.props.user;
    return (
      <Center>
        <div style={{ minWidth: 300 }}>
          <h1 className="text-center">Account</h1>

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
            <h4 className="text-center">{user.username}</h4>
            <h6 className="text-center">{user.email}</h6>
            <p className="text-center">
              {user.firstname} -- {user.lastname}
            </p>
            <p>{user.bio}</p>
            <div
              style={{
                flexDirection: "row",
                minWidth: 300,
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Link to="/account/edit" className="btn btn-primary">
                Edit profile
              </Link>
              <button
                onClick={() => this.delecteAccount()}
                className="btn btn-danger ml-1"
              >
                {this.state.loading && (
                  <Spinner animation={"border"} variant="light" size="sm" />
                )}
                {!this.state.loading && "Delete account"}
              </button>
            </div>
          </div>
        </div>
      </Center>
    );
  }
}

export default connect(({ user }) => ({ user: user.user }))(Account);
