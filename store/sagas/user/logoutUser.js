import 'isomorphic-fetch';
import { put } from 'redux-saga/effects';

export default function* asyncLogoutUser() {
  try {
    if (
      localStorage.getItem('accessToken') !== null ||
      localStorage.getItem('accessToken') !== undefined ||
      localStorage.getItem('accessToken') !== 'undefined'
    ) {
      localStorage.removeItem('accessToken');
    }
    if (
      localStorage.getItem('refreshToken') !== null ||
      localStorage.getItem('refreshToken') !== undefined ||
      localStorage.getItem('refreshToken') !== 'undefined'
    ) {
      localStorage.removeItem('refreshToken');
    }
    if (
      localStorage.getItem('cartId') !== null ||
      localStorage.getItem('cartId') !== undefined ||
      localStorage.getItem('cartId') !== 'undefined'
    ) {
      localStorage.removeItem('cartId');
    }
    if (
      localStorage.getItem('orderId') !== null ||
      localStorage.getItem('orderId') !== undefined ||
      localStorage.getItem('orderId') !== 'undefined'
    ) {
      localStorage.removeItem('orderId');
    }

    yield put({ type: 'SUCCESS_LOGOUT_USER' });
    yield put({ type: 'SUCCESS_EMPTY_ORDER' });
    yield put({ type: 'SUCCESS_EMPTY_CART' });
  } catch (err) {
    console.log('err:', err);
    yield put({ type: 'FAILURE_LOGOUT_USER' });
  }
}
