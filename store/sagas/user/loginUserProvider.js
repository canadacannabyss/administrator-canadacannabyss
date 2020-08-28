import 'isomorphic-fetch';
import { call, put } from 'redux-saga/effects';

async function getLoginProviderApi(endpoint) {
  const res = await fetch(endpoint, {
    method: 'GET',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    }
  });
  const data = await res.json();
  return data;
}

export default function* asyncLoginUserProviderApi(action) {
  try {
    const response = yield call(getLoginProviderApi, action.payload.endpoint);

    yield put({
      type: 'SUCCESS_LOGIN_USER_PROVIDER',
      payload: { data: response }
    });
  } catch (err) {
    yield put({ type: 'FAILURE_LOGIN_USER_PROVIDER' });
  }
}
