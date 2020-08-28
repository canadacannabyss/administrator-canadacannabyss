import { call, put } from 'redux-saga/effects';

async function fetchLoginAdminUserApi(userInfo) {
  const response = await fetch(
    `${process.env.USER_API_ENDPOINT}/admin/auth/login`,
    {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userInfo)
    }
  );
  const data = await response.json();
  return data;
}

async function fetchLoginLocalStorageApi() {
  const bearerToken = `Bearer ${localStorage.getItem('accessToken')}`;
  const res = await fetch(
    `${process.env.USER_API_ENDPOINT}/auth/decode/token`,
    {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
        Authorization: bearerToken
      },
      body: JSON.stringify({
        accessToken: localStorage.getItem('accessToken')
      })
    }
  );
  const data = await res.json();
  return data;
}

export default function* asyncLoginAdminUser(action) {
  try {
    if (window !== undefined) {
      let decodedAccessToken = {};
      if (
        localStorage.getItem('accessToken') === null ||
        localStorage.getItem('accessToken') === undefined ||
        localStorage.getItem('accessToken') === 'undefined'
      ) {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        const response = yield call(
          fetchLoginAdminUserApi,
          action.payload.userInfo
        );
        localStorage.setItem('accessToken', response.accessToken);
        localStorage.setItem('refreshToken', response.refreshToken);
        decodedAccessToken = yield call(
          fetchLoginLocalStorageApi,
          localStorage.getItem('accessToken')
        );
      } else {
        decodedAccessToken = yield call(
          fetchLoginLocalStorageApi,
          localStorage.getItem('accessToken')
        );
      }
      yield put({
        type: 'SUCCESS_FETCH_LOGIN_ADMIN_USER',
        payload: { data: decodedAccessToken }
      });
    }
  } catch (err) {
    console.error(err);
    yield put({ type: 'FAILURE_FETCH_LOGIN_ADMIN_USER' });
  }
}
