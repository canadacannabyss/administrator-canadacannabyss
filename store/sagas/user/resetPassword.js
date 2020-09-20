import 'isomorphic-fetch';
import { put, call } from 'redux-saga/effects';

async function resetPassword(email) {
  const response = await fetch(
    `${process.env.USER_API_ENDPOINT}/admin/auth/reset-password/sent`,
    {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email })
    }
  );
  const data = response.json();
  return data;
}

export default function* asyncResetPassword(action) {
  try {
    console.log('resetPassword email:', action.payload.email);
    const response = yield call(resetPassword, action.payload.email);

    if (response.ok) {
      yield put({ type: 'SUCCESS_RESET_PASSWORD' });
    } else {
      yield put({ type: 'FAILURE_RESET_PASSWORD' });
    }
  } catch (err) {
    console.log('err:', err);
    yield put({ type: 'FAILURE_RESET_PASSWORD' });
  }
}
