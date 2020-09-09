import { call, put } from 'redux-saga/effects';

async function getPromotions() {
  const res = await fetch(
    `${process.env.MAIN_API_ENDPOINT}/admin/promotions`,
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

export default function* asyncGetPromotions() {
  try {
    const response = yield call(getPromotions);

    yield put({ type: 'SUCCESS_GET_PROMOTIONS', payload: { data: response } });
  } catch (err) {
    console.log(err);
    yield put({ type: 'FAILURE_GET_PROMOTIONS' });
  }
}
