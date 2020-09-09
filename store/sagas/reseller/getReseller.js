import { call, put } from 'redux-saga/effects';

async function getReseller(username) {
  const res = await fetch(
    `${process.env.USER_API_ENDPOINT}/admin/resellers/${username}`,
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

export default function* asyncGetReseller(action) {
  try {
    const response = yield call(getReseller, action.payload.username);

    yield put({ type: 'SUCCESS_GET_RESELLER', payload: { data: response } });
  } catch (err) {
    console.log(err);
    yield put({ type: 'FAILURE_GET_RESELLER' });
  }
}
