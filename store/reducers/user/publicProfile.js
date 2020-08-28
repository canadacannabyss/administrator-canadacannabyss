import update from 'immutability-helper';

const initialState = {
  publicProfile: {
    data: {},
    loading: false,
    fetched: false,
    error: false
  },
  activities: {
    data: {},
    loading: false,
    fetched: false,
    error: false
  }
};

export default function publicProfile(state = initialState, action) {
  switch (action.type) {
    case 'REQUEST_GET_PUBLIC_PROFILE':
      return update(state, {
        publicProfile: {
          loading: { $set: true }
        }
      });
    case 'SUCCESS_GET_PUBLIC_PROFILE':
      return update(state, {
        publicProfile: {
          data: { $set: action.payload.data },
          loading: { $set: false },
          fetched: { $set: true },
          error: { $set: false }
        }
      });
    case 'FAILURE_GET_PUBLIC_PROFILE':
      return update(state, {
        publicProfile: {
          fetched: { $set: true },
          error: { $set: true }
        }
      });
    case 'REQUEST_GET_PUBLIC_PROFILE_ACTIVITIES':
      return update(state, {
        activities: {
          loading: { $set: true }
        }
      });
    case 'SUCCESS_GET_PUBLIC_PROFILE_ACTIVITIES':
      return update(state, {
        activities: {
          data: { $set: action.payload.data },
          loading: { $set: false },
          fetched: { $set: true },
          error: { $set: false }
        }
      });
    case 'FAILURE_GET_PUBLIC_PROFILE_ACTIVITIES':
      return update(state, {
        activities: {
          fetched: { $set: true },
          error: { $set: true }
        }
      });
    default:
      return state;
  }
}
