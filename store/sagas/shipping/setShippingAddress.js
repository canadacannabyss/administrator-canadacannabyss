import { call, put } from 'redux-saga/effects';

async function updateOrderShippingAddress(orderId, shippingAddressId) {
  // const bearerToken = `Bearer ${localStorage.getItem('user_token')}`;
  const res = await fetch(
    `${process.env.MAIN_API_ENDPOINT}/customers/order/update/shipping`,
    {
      method: 'PUT',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ orderId, shippingAddressId: shippingAddressId }),
    }
  );
  const data = await res.json();
  return data;
}

export default function* asyncSetShippingAddress(action) {
  try {
    const response = yield call(
      updateOrderShippingAddress,
      action.payload.orderId,
      action.payload.shippingAddressId
    );

    yield put({
      type: 'SUCCESS_SET_SHIPPING_ADDRESS',
      payload: { data: response },
    });
  } catch (err) {
    console.log(err);
    yield put({ type: 'FAILURE_SET_SHIPPING_ADDRESS' });
  }
}
