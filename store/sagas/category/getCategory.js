import { call, put } from 'redux-saga/effects';

async function getCategory(slug) {
  const res = await fetch(
    `${process.env.MAIN_API_ENDPOINT}/admin/categories/panel/get/${slug}`,
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

export default function* asyncGetCategory(action) {
  try {
    const response = yield call(getCategory, action.payload.slug);

    yield put({ type: 'SUCCESS_GET_CATEGORY', payload: { data: response } });
  } catch (err) {
    console.log(err);
    yield put({ type: 'FAILURE_GET_CATEGORY' });
  }
}
