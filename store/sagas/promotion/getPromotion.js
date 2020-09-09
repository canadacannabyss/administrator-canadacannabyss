import { call, put } from 'redux-saga/effects';

async function getPromotion(slug) {
  const res = await fetch(
    `${process.env.MAIN_API_ENDPOINT}/admin/promotions/${slug}`,
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

export default function* asyncGetPromotion(action) {
  try {
    const response = yield call(getPromotion, action.payload.slug);

    yield put({ type: 'SUCCESS_GET_PROMOTION', payload: { data: response } });
  } catch (err) {
    console.log(err);
    console.log('err:', err);
    yield put({ type: 'FAILURE_GET_PROMOTION' });
  }
}
