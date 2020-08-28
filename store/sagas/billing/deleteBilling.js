import { call, put } from 'redux-saga/effects';

async function deleteBilling(billingId) {
  const bearerToken = `Bearer ${localStorage.getItem('user_token')}`;
  const res = await fetch(
    `${process.env.MAIN_API_ENDPOINT}/customers/order/get/order/user/${userId}`,
    {
      method: 'DELETE',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
        Authorization: bearerToken
      },
      body: JSON.stringify({ billingId })
    }
  );
  const data = await res.json();
  return data;
}

export default function* asyncDeleteBilling(action) {
  try {
    const response = yield call(deleteBilling, action.payload.billingId);

    yield put({ type: 'SUCCESS_DELETE_BILLING', payload: { data: response } });
  } catch (err) {
    console.log(err);
    yield put({ type: 'FAILURE_DELETE_BILLING' });
  }
}
