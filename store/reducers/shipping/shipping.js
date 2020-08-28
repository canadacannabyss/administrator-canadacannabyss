import update from 'immutability-helper';

const initialState = {
  data: {},
  loading: false,
  fetched: false,
  error: false
};

export default function shipping(state = initialState, action) {
  switch (action.type) {
    case 'REQUEST_CREATE_SHIPPING':
      return update(state, {
        loading: { $set: true }
      });
    case 'SUCCESS_CREATE_SHIPPING':
      return update(state, {
        data: { $set: action.payload.data },
        loading: { $set: false },
        fetched: { $set: true },
        error: { $set: false }
      });
    case 'FAILURE_CREATE_SHIPPING':
      return update(state, {
        fetched: { $set: true },
        error: { $set: true }
      });
    case 'REQUEST_CREATE_SHIPPING_CHECKOUT':
      return update(state, {
        loading: { $set: true }
      });
    case 'SUCCESS_CREATE_SHIPPING_CHECKOUT':
      return update(state, {
        data: { $set: action.payload.data },
        loading: { $set: false },
        fetched: { $set: true },
        error: { $set: false }
      });
    case 'FAILURE_CREATE_SHIPPING_CHECKOUT':
      return update(state, {
        fetched: { $set: true },
        error: { $set: true }
      });
    case 'REQUEST_GET_SHIPPING':
      return update(state, {
        loading: { $set: true }
      });
    case 'SUCCESS_GET_SHIPPING':
      return update(state, {
        data: { $set: action.payload.data },
        loading: { $set: false },
        fetched: { $set: true },
        error: { $set: false }
      });
    case 'FAILURE_GET_SHIPPING':
      return update(state, {
        fetched: { $set: true },
        error: { $set: true }
      });
    case 'REQUEST_UPDATE_SHIPPING':
      return update(state, {
        loading: { $set: true }
      });
    case 'SUCCESS_UPDATE_SHIPPING':
      return update(state, {
        data: { $set: action.payload.data },
        loading: { $set: false },
        fetched: { $set: true },
        error: { $set: false }
      });
    case 'FAILURE_UPDATE_SHIPPING':
      return update(state, {
        fetched: { $set: true },
        error: { $set: true }
      });
    case 'REQUEST_SET_SHIPPING_ADDRESS':
      return update(state, {
        loading: { $set: true }
      });
    case 'SUCCESS_SET_SHIPPING_ADDRESS':
      return update(state, {
        data: { $set: action.payload.data },
        loading: { $set: false },
        fetched: { $set: true },
        error: { $set: false }
      });
    case 'FAILURE_SET_SHIPPING_ADDRESS':
      return update(state, {
        fetched: { $set: true },
        error: { $set: true }
      });
    case 'REQUEST_DELETE_SHIPPING':
      return update(state, {
        loading: { $set: true }
      });
    case 'SUCCESS_DELETE_SHIPPING':
      return update(state, {
        data: { $set: action.payload.data },
        loading: { $set: false },
        fetched: { $set: true },
        error: { $set: false }
      });
    case 'FAILURE_DELETE_SHIPPING':
      return update(state, {
        fetched: { $set: true },
        error: { $set: true }
      });
    case 'REQUEST_RESET_SHIPPING':
      return update(state, {
        loading: { $set: true }
      });
    case 'SUCCESS_RESET_SHIPPING':
      return update(state, {
        data: { $set: {} },
        loading: { $set: false },
        fetched: { $set: false },
        error: { $set: false }
      });
    case 'FAILURE_RESET_SHIPPING':
      return update(state, {
        loading: { $set: false },
        fetched: { $set: false },
        error: { $set: true }
      });
    default:
      return state;
  }
}
