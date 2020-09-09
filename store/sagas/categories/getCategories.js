import { call, put } from 'redux-saga/effects';

async function getCategories() {
  const res = await fetch(
    `${process.env.MAIN_API_ENDPOINT}/admin/categories`,
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

export default function* asyncGetCategories() {
  try {
    const response = yield call(getCategories);

    yield put({ type: 'SUCCESS_GET_CATEGORIES', payload: { data: response } });
  } catch (err) {
    console.log(err);
    yield put({ type: 'FAILURE_GET_CATEGORIES' });
  }
}
