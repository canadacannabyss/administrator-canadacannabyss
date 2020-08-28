import { put } from 'redux-saga/effects';

export default function* asyncResetShipping() {
  try {
    yield put({ type: 'SUCCESS_RESET_SHIPPING' });
  } catch (err) {
    console.log(err);
    yield put({ type: 'FAILURE_RESET_SHIPPING' });
  }
}
