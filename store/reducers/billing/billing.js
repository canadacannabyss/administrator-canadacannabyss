import update from 'immutability-helper';

const initialState = {
  data: {},
  loading: false,
  fetched: false,
  error: false
};
export default function billing(state = initialState, action) {
  switch (action.type) {
    case 'REQUEST_CREATE_BILLING':
      return update(state, {
        loading: { $set: true }
      });
    case 'SUCCESS_CREATE_BILLING':
      return update(state, {
        data: { $set: action.payload.data },
        loading: { $set: false },
        fetched: { $set: true },
        error: { $set: false }
      });
    case 'FAILURE_CREATE_BILLING':
      return update(state, {
        fetched: { $set: true },
        error: { $set: true }
      });
    case 'REQUEST_CREATE_BILLING_CHECKOUT':
      return update(state, {
        loading: { $set: true }
      });
    case 'SUCCESS_CREATE_BILLING_CHECKOUT':
      return update(state, {
        data: { $set: action.payload.data },
        loading: { $set: false },
        fetched: { $set: true },
        error: { $set: false }
      });
    case 'FAILURE_CREATE_BILLING_CHECKOUT':
      return update(state, {
        fetched: { $set: true },
        error: { $set: true }
      });
    case 'REQUEST_GET_BILLING':
      return update(state, {
        loading: { $set: true }
      });
    case 'SUCCESS_GET_BILLING':
      return update(state, {
        data: { $set: action.payload.data },
        loading: { $set: false },
        fetched: { $set: true },
        error: { $set: false }
      });
    case 'FAILURE_GET_BILLING':
      return update(state, {
        fetched: { $set: true },
        error: { $set: true }
      });
    case 'REQUEST_SET_BILLING_ADDRESS':
      return update(state, {
        loading: { $set: true }
      });
    case 'SUCCESS_SET_BILLING_ADDRESS':
      return update(state, {
        data: { $set: action.payload.data },
        loading: { $set: false },
        fetched: { $set: true },
        error: { $set: false }
      });
    case 'FAILURE_SET_BILLING_ADDRESS':
      return update(state, {
        fetched: { $set: true },
        error: { $set: true }
      });
    case 'REQUEST_UPDATE_BILLING':
      return update(state, {
        loading: { $set: true }
      });
    case 'SUCCESS_UPDATE_BILLING':
      return update(state, {
        data: { $set: action.payload.data },
        loading: { $set: false },
        fetched: { $set: true },
        error: { $set: false }
      });
    case 'FAILURE_UPDATE_BILLING':
      return update(state, {
        fetched: { $set: true },
        error: { $set: true }
      });
    case 'REQUEST_DELETE_BILLING':
      return update(state, {
        loading: { $set: true }
      });
    case 'SUCCESS_DELETE_BILLING':
      return update(state, {
        data: { $set: action.payload.data },
        loading: { $set: false },
        fetched: { $set: true },
        error: { $set: false }
      });
    case 'FAILURE_DELETE_BILLING':
      return update(state, {
        fetched: { $set: true },
        error: { $set: true }
      });
    case 'REQUEST_RESET_BILLING':
      return update(state, {
        loading: { $set: true }
      });
    case 'SUCCESS_RESET_BILLING':
      return update(state, {
        data: { $set: {} },
        loading: { $set: false },
        fetched: { $set: false },
        error: { $set: false }
      });
    case 'FAILURE_RESET_BILLING':
      return update(state, {
        loading: { $set: false },
        fetched: { $set: false },
        error: { $set: true }
      });
    default:
      return state;
  }
}
