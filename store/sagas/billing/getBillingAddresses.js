import { call, put } from 'redux-saga/effects';

async function getBillingAddresses(userId) {
  const bearerToken = `Bearer ${localStorage.getItem('user_token')}`;
  const res = await fetch(
    `${process.env.MAIN_API_ENDPOINT}/customers/billing/get/all/${userId}`,
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
    console.log('user info dispach saga:', action.payload.userId);
    const response = yield call(getBillingAddresses, action.payload.userId);

    yield put({
      type: 'SUCCESS_GET_BILLING_ADDRESSES',
      payload: { data: response }
    });
  } catch (err) {
    console.log(err);
    yield put({ type: 'FAILURE_GET_BILLING_ADDRESSES' });
  }
}
