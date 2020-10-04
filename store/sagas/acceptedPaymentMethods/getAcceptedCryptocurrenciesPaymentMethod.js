import { call, put } from 'redux-saga/effects';

async function getCryptocurrencies() {
  const res = await fetch(
    `${process.env.MAIN_API_ENDPOINT}/admin/cryptocurrencies`,
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
    const response = yield call(getCryptocurrencies);

    yield put({ type: 'SUCCESS_GET_CRYPTOCURRECIES_PAYMENT_METHODS', payload: { data: response } });
  } catch (err) {
    console.log(err);
    yield put({ type: 'FAILURE_GET_CRYPTOCURRECIES_PAYMENT_METHODS' });
  }
}
