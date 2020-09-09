import { call, put } from 'redux-saga/effects';

async function getCoupon(slug) {
  const res = await fetch(
    `${process.env.MAIN_API_ENDPOINT}/admin/coupons/get/coupon/${slug}`,
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

export default function* asyncGetCoupon(action) {
  try {
    const response = yield call(getCoupon, action.payload.slug);

    yield put({ type: 'SUCCESS_GET_COUPON', payload: { data: response } });
  } catch (err) {
    console.log(err);
    yield put({ type: 'FAILURE_GET_COUPON' });
  }
}
