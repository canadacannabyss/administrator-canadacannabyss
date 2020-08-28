import { call, put } from 'redux-saga/effects';

async function getBilling(billingId) {
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
        Authorization: bearerToken
      }
    }
  );
  const data = await res.json();
  return data;
}

export default function* asyncGetBilling(action) {
  try {
    const response = yield call(getBilling, action.payload.billingId);

    yield put({ type: 'SUCCESS_GET_BILLING', payload: { data: response } });
  } catch (err) {
    console.log(err);
    yield put({ type: 'FAILURE_GET_BILLING' });
  }
}
