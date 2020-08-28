import 'isomorphic-fetch';
import _ from 'lodash';
import { call, put } from 'redux-saga/effects';

async function loginAdminUserApi(adminUser, adminPassword) {
  const response = await fetch(
    `${process.env.USER_API_ENDPOINT}/admin/auth/login/admin`,
    {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        adminUser,
        adminPassword
      })
    }
  );
  const data = await response.json();
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

export default function* asyncLoginAdminUserApi(action) {
  localStorage.removeItem('user_token');
  try {
    if (localStorage.getItem('user_token') === null) {
      const response = yield call(
        loginAdminUserApi,
        action.payload.username,
        action.payload.password
      );
      if (!_.isEmpty(response)) {
        localStorage.setItem('user_token', response.token);
        const resLocalStorage = yield call(getLoginLocalStorageApi);
        yield put({
          type: 'SUCCESS_REGISTER_ADMIN_USER',
          payload: { data: resLocalStorage.authData.userInfo }
        });
      }
    } else {
      const responseLocalStorage = yield call(getLoginLocalStorageApi);
      yield put({
        type: 'SUCCESS_LOGIN_USER',
        payload: { data: responseLocalStorage.authData.userInfo }
      });
    }
  } catch (err) {
    yield put({ type: 'FAILURE_REGISTER_ADMIN_USER' });
  }
}
