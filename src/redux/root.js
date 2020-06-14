import { combineReducers } from "redux";
import user from "./user/user";
import users from "./users/agent";
import posts from "./posts/agent";

export default combineReducers({
  user,
  users,
  posts,
});
