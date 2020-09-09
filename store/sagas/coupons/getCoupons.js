import { call, put } from 'redux-saga/effects';

async function getCoupons() {
  const res = await fetch(
    `${process.env.MAIN_API_ENDPOINT}/admin/coupons/get/all`,
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

export default function* asyncGetCoupons() {
  try {
    const response = yield call(getCoupons);

    yield put({ type: 'SUCCESS_GET_COUPONS', payload: { data: response } });
  } catch (err) {
    console.log(err);
    yield put({ type: 'FAILURE_GET_COUPONS' });
  }
}
