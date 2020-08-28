import { call, put } from 'redux-saga/effects';

async function updateOrderBillingAddress(orderId, billingAddressId) {
  // const bearerToken = `Bearer ${localStorage.getItem('user_token')}`;
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

export default function* asyncSetBilling(action) {
  try {
    const response = yield call(
      updateOrderBillingAddress,
      action.payload.orderId,
      action.payload.billingAddressId
    );

    yield put({
      type: 'SUCCESS_SET_BILLING_ADDRESS',
      payload: { data: response }
    });
  } catch (err) {
    console.log(err);
    yield put({ type: 'FAILURE_SET_BILLING_ADDRESS' });
  }
}
