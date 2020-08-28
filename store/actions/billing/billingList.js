/* eslint-disable import/prefer-default-export */
export function getBillingAddresses(userId) {
  return {
    type: 'REQUEST_GET_BILLING_ADDRESSES',
    payload: {
      userId
    }
  };
}
