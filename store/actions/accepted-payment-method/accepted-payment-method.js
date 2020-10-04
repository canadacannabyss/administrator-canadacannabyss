export function getCryptocurrencyPaymentMethod(symbol) {
  return {
    type: 'REQUEST_GET_CRYPTOCURRECY_PAYMENT_METHOD',
    payload: {
      symbol
    }
  };
}

export function getETransferPaymentMethod(email) {
  return {
    type: 'REQUEST_GET_E_TRANSFER_PAYMENT_METHOD',
    payload: {
      email
    }
  };
}
