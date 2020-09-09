import { call, put } from 'redux-saga/effects';

async function getBanners() {
  const res = await fetch(
    `${process.env.MAIN_API_ENDPOINT}/admin/panel/get/all/banners`,
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

export default function* asyncGetBanners() {
  try {
    const response = yield call(getBanners);

    yield put({ type: 'SUCCESS_GET_BANNERS', payload: { data: response } });
  } catch (err) {
    console.log(err);
    yield put({ type: 'FAILURE_GET_BANNERS' });
  }
}
