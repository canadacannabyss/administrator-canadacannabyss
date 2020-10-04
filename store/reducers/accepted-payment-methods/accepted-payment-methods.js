import update from 'immutability-helper';

const initialState = {
  data: {
    cryptocurrencies: [],
    eTransfers: []
  },
  loading: false,
  fetched: false,
  error: false
};

export default function acceptedPaymentMethods(state = initialState, action) {
  switch (action.type) {
    case 'REQUEST_GET_CRYPTOCURRECIES_PAYMENT_METHODS':
      return update(state, {
        loading: { $set: true }
      });
    case 'SUCCESS_GET_CRYPTOCURRECIES_PAYMENT_METHODS':
      return update(state, {
        data: { cryptocurrencies: { $set: action.payload.data } },
        loading: { $set: false },
        fetched: { $set: true },
        error: { $set: false }
      });
    case 'FAILURE_GET_CRYPTOCURRECIES_PAYMENT_METHODS':
      return update(state, {
        fetched: { $set: true },
        error: { $set: true }
      });
    case 'REQUEST_GET_E_TRANSFERS_PAYMENT_METHODS':
      return update(state, {
        loading: { $set: true }
      });
    case 'SUCCESS_GET_E_TRANSFERS_PAYMENT_METHODS':
      return update(state, {
        data: { eTransfers: { $set: action.payload.data } },
        loading: { $set: false },
        fetched: { $set: true },
        error: { $set: false }
      });
    case 'FAILURE_GET_E_TRANSFERS_PAYMENT_METHODS':
      return update(state, {
        fetched: { $set: true },
        error: { $set: true }
      });
    default:
      return state;
  }
}
