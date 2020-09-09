import { call, put } from 'redux-saga/effects';

async function getBundles() {
  const res = await fetch(
    `${process.env.MAIN_API_ENDPOINT}/admin/bundles`,
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

export default function* asyncGetBundles() {
  try {
    const response = yield call(getBundles);

    yield put({ type: 'SUCCESS_GET_BUNDLES', payload: { data: response } });
  } catch (err) {
    console.log(err);
    yield put({ type: 'FAILURE_GET_BUNDLES' });
  }
}
