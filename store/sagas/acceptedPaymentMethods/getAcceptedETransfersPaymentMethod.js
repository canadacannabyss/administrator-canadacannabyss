import { call, put } from 'redux-saga/effects';

async function getETransfer() {
  const res = await fetch(
    `${process.env.MAIN_API_ENDPOINT}/admin/e-transfers`,
    {
      method: 'GET',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      }
    }
  );
  const data = await res.json();
  return data;
}

export default function* asyncGetAcceptedPaymentMethods() {
  try {
    const response = yield call(getETransfer);

    yield put({ type: 'SUCCESS_GET_E_TRANSFERS_PAYMENT_METHODS', payload: { data: response } });
  } catch (err) {
    console.log(err);
    yield put({ type: 'FAILURE_GET_E_TRANSFERS_PAYMENT_METHODS' });
  }
}
