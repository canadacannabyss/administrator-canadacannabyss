import { put } from 'redux-saga/effects';

export default function* asyncResetBilling() {
  try {
    yield put({ type: 'SUCCESS_RESET_BILLING' });
  } catch (err) {
    console.log(err);
    yield put({ type: 'FAILURE_RESET_BILLING' });
  }
}
