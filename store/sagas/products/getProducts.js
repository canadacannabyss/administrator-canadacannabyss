import { call, put } from 'redux-saga/effects';

async function getProducts() {
  const res = await fetch(
    `${process.env.MAIN_API_ENDPOINT}/admin/products`,
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

export default function* asyncGetProducts() {
  try {
    const response = yield call(getProducts);

    yield put({ type: 'SUCCESS_GET_PRODUCTS', payload: { data: response } });
  } catch (err) {
    console.log(err);
    yield put({ type: 'FAILURE_GET_PRODUCTS' });
  }
}
