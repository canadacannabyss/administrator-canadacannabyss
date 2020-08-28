import { call, put } from 'redux-saga/effects';

async function createShipping(shipping) {
  const bearerToken = `Bearer ${localStorage.getItem('user_token')}`;
  const res = await fetch(
    `${process.env.MAIN_API_ENDPOINT}/customers/order/get/order/user/${userId}`,
    {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
        Authorization: bearerToken
      },
      body: JSON.stringify({ shipping })
    }
  );
  const data = await res.json();
  return data;
}

export default function* asyncCreateShipping(action) {
  try {
    const response = yield call(createShipping, action.payload.shipping);

    yield put({ type: 'SUCCESS_CREATE_SHIPPING', payload: { data: response } });
  } catch (err) {
    console.log(err);
    yield put({ type: 'FAILURE_CREATE_SHIPPING' });
  }
}
