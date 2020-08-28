/* eslint-disable import/prefer-default-export */
export function createBilling(billing) {
  return {
    type: 'REQUEST_CREATE_BILLING',
    payload: {
      billing
    }
  };
}

export function createBillingCheckout(orderId, billingAddressInfo) {
  return {
    type: 'REQUEST_CREATE_BILLING_CHECKOUT',
    payload: {
      orderId,
      billingAddressInfo
    }
  };
}

export function getBilling(billingId) {
  return {
    type: 'REQUEST_GET_BILLING',
    payload: {
      billingId
    }
  };
}

export function getBillingAddresses(userId) {
  return {
    type: 'REQUEST_GET_BILLING_ADDRESSES',
    payload: {
      userId
    }
  };
}

export function setBillingAddress(orderId, billingAddressId) {
  return {
    type: 'REQUEST_SET_BILLING_ADDRESS',
    payload: {
      orderId,
      billingAddressId
    }
  };
}

export function updateBilling(billingId, newBilling) {
  return {
    type: 'REQUEST_UPDATE_BILLING',
    payload: {
      billingId,
      newBilling
    }
  };
}

export function deleteBilling(billingId) {
  return {
    type: 'REQUEST_DELETE_BILLING',
    payload: {
      billingId
    }
  };
}

export function resetBilling() {
  return {
    type: 'REQUEST_RESET_BILLING'
  };
}
