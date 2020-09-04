import { createUser, SignIn, SignUp, fireError } from '../actionType';

const intialState = {
  user: {},
  loading: false,
  error: null,
};
const createReducer = (state = intialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case SignIn:
      return { ...state, loading: true };
    case SignUp:
      return { ...state, loading: true };
    case createUser:
      return { ...state, user: { ...payload }, loading: false };
    case fireError:
      return { ...state, error: { ...payload }, loading: false };
    default:
      return state;
  }
};
export default createReducer;
