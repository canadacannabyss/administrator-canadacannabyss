import 'isomorphic-fetch';
import { call, put } from 'redux-saga/effects';

async function refreshUserDataApi(id) {
  const res = await fetch(
    `${process.env.USER_API_ENDPOINT}/auth/user/refresh`,
    {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id })
    }
  );
  const data = await res.json();
  return data;
}

export default function* asyncRefreshUserData(action) {
  try {
    const response = yield call(refreshUserDataApi, action.payload.id);
    yield put({
      type: 'SUCCESS_REFRESH_USER_DATA',
      payload: { data: response }
    });
  } catch (err) {
    yield put({ type: 'FAILURE_REFRESH_USER_DATA' });
  }
}
