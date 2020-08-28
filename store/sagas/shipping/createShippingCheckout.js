import { call, put } from 'redux-saga/effects';

async function createShippingCheckout(shippingAddressInfo) {
  const bearerToken = `Bearer ${localStorage.getItem('user_token')}`;
  const res = await fetch(
    `${process.env.MAIN_API_ENDPOINT}/customers/shipping/create`,
    {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
        Authorization: bearerToken,
      },
      body: JSON.stringify(shippingAddressInfo),
    }
  );
  const data = await res.json();
  return data;
}

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

export default function* asyncCreateShippingCheckout(action) {
  try {
    const response = yield call(
      createShippingCheckout,
      action.payload.shippingAddressInfo
    );

    const responseUpdateOrder = yield call(
      updateOrderShippingAddress,
      action.payload.orderId,
      response._id
    );

    yield put({
      type: 'SUCCESS_CREATE_SHIPPING_CHECKOUT',
      payload: { data: responseUpdateOrder },
    });
  } catch (err) {
    console.log(err);
    yield put({ type: 'FAILURE_CREATE_SHIPPING_CHECKOUT' });
  }
}
