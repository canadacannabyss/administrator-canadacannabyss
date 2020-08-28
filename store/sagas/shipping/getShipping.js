import { call, put } from 'redux-saga/effects';

async function getShipping(shippingId) {
  const bearerToken = `Bearer ${localStorage.getItem('user_token')}`;
  const res = await fetch(
    `${process.env.MAIN_API_ENDPOINT}/customers/order/get/order/user/${userId}`,
    {
      method: 'GET',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
        Authorization: bearerToken,
      },
    }
  );
  const data = await res.json();
  return data;
}

export default function* asyncGetShipping(action) {
  try {
    const response = yield call(getShipping, action.payload.shippingId);

    yield put({ type: 'SUCCESS_GET_SHIPPING', payload: { data: response } });
  } catch (err) {
    console.log(err);
    yield put({ type: 'FAILURE_GET_SHIPPING' });
  }
}
