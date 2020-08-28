/* eslint-disable import/prefer-default-export */
export function createShipping(shipping) {
  return {
    type: 'REQUEST_CREATE_SHIPPING',
    payload: {
      shipping
    }
  };
}

export function createShippingCheckout(
  orderId,
  shippingAddressInfo,
  shippingAddressInfoId
) {
  return {
    type: 'REQUEST_CREATE_SHIPPING_CHECKOUT',
    payload: {
      orderId,
      shippingAddressInfo,
      shippingAddressInfoId
    }
  };
}

export function getShipping(shippingId) {
  return {
    type: 'REQUEST_GET_SHIPPING',
    payload: {
      shippingId
    }
  };
}

export function getShippingAddresses(userId) {
  return {
    type: 'REQUEST_GET_SHIPPING_ADDRESSES',
    payload: {
      userId
    }
  };
}

export function updateShipping(shippingId, newShipping) {
  return {
    type: 'REQUEST_UPDATE_SHIPPING',
    payload: {
      shippingId,
      newShipping
    }
  };
}

export function setShippingAddress(orderId, shippingAddressId) {
  return {
    type: 'REQUEST_SET_SHIPPING_ADDRESS',
    payload: {
      orderId,
      shippingAddressId
    }
  };
}

export function deleteShipping(shippingId) {
  return {
    type: 'REQUEST_DELETE_SHIPPING',
    payload: {
      shippingId
    }
  };
}

export function resetShipping() {
  return {
    type: 'REQUEST_RESET_SHIPPING'
  };
}
