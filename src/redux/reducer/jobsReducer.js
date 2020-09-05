import { jobList } from '../actionType';

const intialState = {
  loading: true,
  jobs: [],
};
const jobsReducer = (state = intialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case jobList:
      return { ...state, jobs: [...payload], loading: false };
    default:
      return state;
  }
};
export default jobsReducer;
