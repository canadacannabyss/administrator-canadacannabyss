import { call, put } from 'redux-saga/effects';

async function updateBilling(billingId, newBilling) {
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
        Authorization: bearerToken
      },
      body: JSON.stringify({ billingId, newBilling })
    }
  );
  const data = await res.json();
  return data;
}

export default function* asyncUpdateBilling(action) {
  try {
    const response = yield call(
      updateBilling,
      action.payload.billingId,
      action.payload.newBilling
    );
    yield put({
      type: 'SUCCESS_UPDATE_BILLING',
      payload: { data: response }
    });
  } catch (err) {
    console.log(err);
    yield put({ type: 'FAILURE_UPDATE_BILLING' });
  }
}
