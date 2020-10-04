import update from 'immutability-helper';

const initialState = {
  data: {
    cryptocurrency: {},
    eTransfer: {}
  },
  loading: false,
  fetched: false,
  error: false
};

export default function acceptedPaymentMethod(state = initialState, action) {
  switch (action.type) {
    case 'REQUEST_GET_CRYPTOCURRECY_PAYMENT_METHOD':
      return update(state, {
        loading: { $set: true }
      });
    case 'SUCCESS_GET_CRYPTOCURRECY_PAYMENT_METHOD':
      return update(state, {
        data: { cryptocurrency: { $set: action.payload.data } },
        loading: { $set: false },
        fetched: { $set: true },
        error: { $set: false }
      });
    case 'FAILURE_GET_CRYPTOCURRECY_PAYMENT_METHOD':
      return update(state, {
        fetched: { $set: true },
        error: { $set: true }
      });
    case 'REQUEST_GET_E_TRANSFER_PAYMENT_METHOD':
      return update(state, {
        loading: { $set: true }
      });
    case 'SUCCESS_GET_E_TRANSFER_PAYMENT_METHOD':
      return update(state, {
        data: { eTransfer: { $set: action.payload.data } },
        loading: { $set: false },
        fetched: { $set: true },
        error: { $set: false }
      });
    case 'FAILURE_GET_E_TRANSFER_PAYMENT_METHOD':
      return update(state, {
        fetched: { $set: true },
        error: { $set: true }
      });
    default:
      return state;
  }
}
