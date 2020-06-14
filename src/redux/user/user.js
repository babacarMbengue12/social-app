import constants from './constantes'
export default (state = {},action={} ) =>{
    switch (action.type){
        case constants.LOGIN:
            return action.user
        case constants.LOGOUT:
            return {token: null,user: {}}
        default:
            return state;
    }
}