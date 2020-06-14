import constants from "./constantes";

export function onGetPosts(agents) {
  const action = { type: constants.ON_GET_POSTS, agents };
  return (dispatch) => {
    return dispatch(action);
  };
}
export function onAddPost(agent) {
  const action = { type: constants.ON_ADD_POST, agent };
  return (dispatch) => {
    return dispatch(action);
  };
}

export function onDeletePost(agent) {
  const action = { type: constants.ON_DELETE_POST, agent };
  return (dispatch) => {
    return dispatch(action);
  };
}
export function onEditPost(agent) {
  const action = { type: constants.ON_EDIT_POST, agent };
  return (dispatch) => {
    return dispatch(action);
  };
}
