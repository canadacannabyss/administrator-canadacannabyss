import { call, put } from 'redux-saga/effects';

async function updateShipping(shippingId, newShipping) {
  const bearerToken = `Bearer ${localStorage.getItem('user_token')}`;
  const res = await fetch(
    `${process.env.MAIN_API_ENDPOINT}/customers/order/update/subtotal`,
    {
      method: 'PUT',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
        Authorization: bearerToken,
      },
      body: JSON.stringify({ shippingId, newShipping }),
    }
  );
  const data = await res.json();
  return data;
}

export default function* asyncUpdateShipping(action) {
  try {
    const response = yield call(
      updateShipping,
      action.payload.shippingId,
      action.payload.newShipping
    );
    yield put({
      type: 'SUCCESS_UPDATE_SHIPPING',
      payload: { data: response },
    });
  } catch (err) {
    console.log(err);
    yield put({ type: 'FAILURE_UPDATE_SHIPPING' });
  }
}
