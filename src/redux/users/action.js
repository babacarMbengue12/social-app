import constants from "./constantes";

export function onGetUsers(agents) {
  const action = { type: constants.ON_GET_USERS1S, agents };
  return (dispatch) => {
    return dispatch(action);
  };
}
export function onAddAgent(agent) {
  const action = { type: constants.ON_ADD_AGENT, agent };
  return (dispatch) => {
    return dispatch(action);
  };
}

export function onDeleteAgent(agent) {
  const action = { type: constants.ON_DELETE_AGENT, agent };
  return (dispatch) => {
    return dispatch(action);
  };
}
export function onEditAgent(agent) {
  const action = { type: constants.ON_EDIT_AGENT, agent };
  return (dispatch) => {
    return dispatch(action);
  };
}
