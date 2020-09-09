import { call, put } from 'redux-saga/effects';

async function getBundle(slug) {
  const res = await fetch(
    `${process.env.MAIN_API_ENDPOINT}/admin/bundles/${slug}`,
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

export default function* asyncGetBundle(action) {
  try {
    const response = yield call(getBundle, action.payload.slug);

    yield put({ type: 'SUCCESS_GET_BUNDLE', payload: { data: response } });
  } catch (err) {
    console.log(err);
    console.log('err:', err);
    yield put({ type: 'FAILURE_GET_BUNDLE' });
  }
}
