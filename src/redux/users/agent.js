import constants from "./constantes";
export default (state = [], action = {}) => {
  switch (action.type) {
    case constants.ON_GET_USERS1S:
      return action.agents;
    case constants.ON_ADD_AGENT:
      return [action.agent, ...state];
    case constants.ON_DELETE_AGENT:
      return state.filter((ag) => ag.id !== action.agent.id);
    case constants.ON_EDIT_AGENT:
      const data = [...state];
      const index = data.findIndex((ag) => ag.id === action.agent.id);
      data[index] = { ...data[index], ...action.agent };
      return data;
    default:
      return state;
  }
};
