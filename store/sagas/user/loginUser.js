import _ from 'lodash';
import { call, put } from 'redux-saga/effects';

async function getLoginApi() {
  const res = await fetch(
    `${process.env.USER_API_ENDPOINT}/auth/decode/token`,
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

async function getLoginLocalStorageApi() {
  const bearerToken = `Bearer ${localStorage.getItem('user_token')}`;
  const res = await fetch(`${process.env.USER_API_ENDPOINT}/auth/user/token`, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
      Authorization: bearerToken
    }
  });
  const data = await res.json();
  return data;
}

export default function* asyncLoginUser() {
  try {
    if (typeof window !== 'undefined') {
      if (localStorage.getItem('accessToken') === null) {
        const response = yield call(getLoginApi);
        if (!_.isEmpty(response)) {
          localStorage.setItem('accessToken', response.token);
          const resLocalStorage = yield call(getLoginLocalStorageApi);

          yield put({
            type: 'SUCCESS_LOGIN_USER',
            payload: { data: resLocalStorage.authData.userinfo }
          });
        } else {
          yield put({
            type: 'SUCCESS_LOGIN_EMPTY_USER'
          });
        }
      } else {
        const responseLocalStorage = yield call(getLoginLocalStorageApi);

        yield put({
          type: 'SUCCESS_LOGIN_USER',
          payload: { data: responseLocalStorage.authData.userinfo }
        });
      }
    }
  } catch (err) {
    console.log(err);
    yield put({ type: 'FAILURE_LOGIN_USER' });
  }
}
