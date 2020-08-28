/* eslint-disable import/prefer-default-export */
export function getShippingAddresses(userId) {
  return {
    type: 'REQUEST_GET_SHIPPING_ADDRESSES',
    payload: {
      userId
    }
  };
}
