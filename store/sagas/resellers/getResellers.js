import { call, put } from 'redux-saga/effects';

async function getResellers() {
  const res = await fetch(
    `${process.env.USER_API_ENDPOINT}/admin/resellers`,
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

export default function* asyncGetResellers() {
  try {
    const response = yield call(getResellers);

    yield put({ type: 'SUCCESS_GET_RESELLERS', payload: { data: response } });
  } catch (err) {
    console.log(err);
    yield put({ type: 'FAILURE_GET_RESELLERS' });
  }
}
