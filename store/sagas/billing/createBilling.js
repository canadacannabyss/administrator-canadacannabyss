import { call, put } from 'redux-saga/effects';

async function createBilling(billing) {
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
      body: JSON.stringify({ billing })
    }
  );
  const data = await res.json();
  return data;
}

export default function* asyncCreateBilling(action) {
  try {
    const response = yield call(createBilling, action.payload.billing);

    yield put({ type: 'SUCCESS_CREATE_BILLING', payload: { data: response } });
  } catch (err) {
    console.log(err);
    yield put({ type: 'FAILURE_CREATE_BILLING' });
  }
}
