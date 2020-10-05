import { call, put } from 'redux-saga/effects';

async function getPostalServices() {
  const res = await fetch(
    `${process.env.MAIN_API_ENDPOINT}/admin/postal-services`,
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

export default function* asyncGetOrders() {
  try {
    const response = yield call(getPostalServices);

    yield put({ type: 'SUCCESS_GET_POSTAL_SERVICES', payload: { data: response } });
  } catch (err) {
    console.log(err);
    yield put({ type: 'FAILURE_GET_POSTAL_SERVICES' });
  }
}
