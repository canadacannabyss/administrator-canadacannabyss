import { call, put } from 'redux-saga/effects';

async function getPostalService(slug) {
  const res = await fetch(
    `${process.env.MAIN_API_ENDPOINT}/admin/postal-services/${slug}`,
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

export default function* asyncGetOrders(action) {
  try {
    const response = yield call(getPostalService, action.payload.slug);

    yield put({ type: 'SUCCESS_GET_POSTAL_SERVICE', payload: { data: response } });
  } catch (err) {
    console.log(err);
    yield put({ type: 'FAILURE_GET_POSTAL_SERVICE' });
  }
}
