import { call, put } from 'redux-saga/effects';

async function getProduct(slug) {
  const res = await fetch(
    `${process.env.MAIN_API_ENDPOINT}/admin/products/${slug}`,
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

export default function* asyncGetProduct(action) {
  try {
    const response = yield call(getProduct, action.payload.slug);

    yield put({ type: 'SUCCESS_GET_PRODUCT', payload: { data: response } });
  } catch (err) {
    console.log(err);
    yield put({ type: 'FAILURE_GET_PRODUCT' });
  }
}
