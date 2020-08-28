import { call, put } from 'redux-saga/effects';

async function getShippingAddresses(userId) {
  const bearerToken = `Bearer ${localStorage.getItem('user_token')}`;
  const res = await fetch(
    `${process.env.MAIN_API_ENDPOINT}/customers/shipping/get/all/${userId}`,
    {
      method: 'GET',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
        Authorization: bearerToken,
      },
    }
  );
  const data = await res.json();
  return data;
}

export default function* asyncGetShippingAddresses(action) {
  try {
    const response = yield call(getShippingAddresses, action.payload.userId);

    yield put({
      type: 'SUCCESS_GET_SHIPPING_ADDRESSES',
      payload: { data: response },
    });
  } catch (err) {
    console.log(err);
    yield put({ type: 'FAILURE_GET_SHIPPING_ADDRESSES' });
  }
}
