import {
  SignIn,
  SignUp,
  createUser,
  fireError,
  statePersist,
  jobList,
} from '../actionType';

export const SignInUser = (payload) => ({
  type: SignIn,
  payload,
});
export const SignUpUser = (payload) => ({
  type: SignUp,
  payload,
});
export const authState = (payload) => ({
  type: statePersist,
  payload,
});
export const setUser = (payload) => ({
  type: createUser,
  payload,
});
export const setError = (payload) => ({
  type: fireError,
  payload,
});
export const jobsListGen = (payload) => ({
  type: jobList,
  payload,
});
