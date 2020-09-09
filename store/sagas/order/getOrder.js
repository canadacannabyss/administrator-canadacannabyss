import { call, put } from 'redux-saga/effects';

async function getOrder(id) {
  const res = await fetch(
    `${process.env.MAIN_API_ENDPOINT}/admin/orders/${id}`,
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

export default function* asyncGetOrder(action) {
  try {
    const response = yield call(getOrder, action.payload.id);

    yield put({ type: 'SUCCESS_GET_ORDER', payload: { data: response } });
  } catch (err) {
    console.log(err);
    yield put({ type: 'FAILURE_GET_ORDER' });
  }
}
