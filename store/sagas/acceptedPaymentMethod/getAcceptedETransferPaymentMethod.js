import { call, put } from 'redux-saga/effects';

async function getETransfer(email) {
  const res = await fetch(
    `${process.env.MAIN_API_ENDPOINT}/admin/e-transfer/${email}`,
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

export default function* asyncGetAcceptedPaymentMethod(action) {
  try {
    const response = yield call(getETransfer, action.payload.email);

    yield put({ type: 'SUCCESS_GET_E_TRANSFER_PAYMENT_METHOD', payload: { data: response } });
  } catch (err) {
    console.log(err);
    yield put({ type: 'FAILURE_GET_E_TRANSFER_PAYMENT_METHOD' });
  }
}
