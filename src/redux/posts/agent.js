import constants from "./constantes";
export default (state = [], action = {}) => {
  switch (action.type) {
    case constants.ON_GET_POSTS:
      return action.agents;
    case constants.ON_ADD_POST:
      return [action.agent, ...state];
    case constants.ON_DELETE_POST:
      return state.filter((ag) => ag.id !== action.agent.id);
    case constants.ON_EDIT_POST:
      const data = [...state];
      const index = data.findIndex((ag) => ag.id === action.agent.id);
      data[index] = { ...data[index], ...action.agent };
      return data;
    default:
      return state;
  }
};
