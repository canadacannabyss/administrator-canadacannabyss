import update from 'immutability-helper';

const initialState = {
  data: [],
  loading: false,
  fetched: false,
  error: false
};

export default function bundle(state = initialState, action) {
  switch (action.type) {
    case 'REQUEST_GET_BUNDLE':
      return update(state, {
        loading: { $set: true }
      });
    case 'SUCCESS_GET_BUNDLE':
      return update(state, {
        data: { $set: action.payload.data },
        loading: { $set: false },
        fetched: { $set: true },
        error: { $set: false }
      });
    case 'FAILURE_GET_BUNDLE':
      return update(state, {
        fetched: { $set: true },
        error: { $set: true }
      });
    default:
      return state;
  }
}
