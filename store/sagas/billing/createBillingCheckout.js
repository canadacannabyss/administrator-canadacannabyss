import { call, put } from 'redux-saga/effects';

async function createBillingCheckout(billingAddressInfo) {
  const bearerToken = `Bearer ${localStorage.getItem('user_token')}`;
  const res = await fetch(
    `${process.env.MAIN_API_ENDPOINT}/customers/billing/create`,
    {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
        Authorization: bearerToken
      },
      body: JSON.stringify(billingAddressInfo)
    }
  );
  const data = await res.json();
  return data;
}

async function updateOrderBillingAddress(orderId, billingAddressId) {
  // const bearerToken = `Bearer ${localStorage.getItem('user_token')}`;
  console.log('billingAddressId:', billingAddressId);
  const res = await fetch(
    `${process.env.MAIN_API_ENDPOINT}/customers/order/update/billing`,
    {
      method: 'PUT',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ orderId, billingAddressId })
    }
  );
  const data = await res.json();
  return data;
}

export default function* asyncCreateBillingCheckout(action) {
  try {
    const response = yield call(
      createBillingCheckout,
      action.payload.billingAddressInfo
    );

    console.log('create billing response:', response);
    const responseUpdateOrder = yield call(
      updateOrderBillingAddress,
      action.payload.orderId,
      response._id
    );

    yield put({
      type: 'SUCCESS_CREATE_BILLING_CHECKOUT',
      payload: { data: responseUpdateOrder }
    });
  } catch (err) {
    console.log(err);
    yield put({ type: 'FAILURE_CREATE_BILLING_CHECKOUT' });
  }
}
