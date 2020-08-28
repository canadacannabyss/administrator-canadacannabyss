import 'isomorphic-fetch';
import { call, put } from 'redux-saga/effects';

async function setFollowAuthorApi(userId, authorId) {
  const res = await fetch(
    `${process.env.USER_API_ENDPOINT}/users/update/follow/author`,
    {
      method: 'PUT',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        userId,
        authorId
      })
    }
  );
  const data = await res.json();
  return data;
}

export default function* asyncSetFollowAuthorApi(action) {
  try {
    const response = yield call(
      setFollowAuthorApi,
      action.payload.userId,
      action.payload.authorId
    );
    yield put({
      type: 'SUCCESS_SET_FOLLOW_AUTHOR',
      payload: { data: response }
    });
  } catch (err) {
    yield put({ type: 'FAILURE_SET_FOLLOW_AUTHOR' });
  }
}
