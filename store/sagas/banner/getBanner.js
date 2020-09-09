import { call, put } from 'redux-saga/effects';

async function getBanner(slug) {
  const res = await fetch(
    `${process.env.MAIN_API_ENDPOINT}/admin/promotions/banners/${slug}`,
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

export default function* asyncGetBanner(action) {
  try {
    const response = yield call(getBanner, action.payload.slug);

    yield put({ type: 'SUCCESS_GET_BANNER', payload: { data: response } });
  } catch (err) {
    console.log(err);
    console.log('err:', err);
    yield put({ type: 'FAILURE_GET_BANNER' });
  }
}
