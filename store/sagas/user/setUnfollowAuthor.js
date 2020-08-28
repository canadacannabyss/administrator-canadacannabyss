import 'isomorphic-fetch';
import { call, put } from 'redux-saga/effects';

async function setUnfollowAuthorApi(userId, authorId) {
  const res = await fetch(
    `${process.env.USER_API_ENDPOINT}/users/update/unfollow/author`,
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

export default function* asyncSetUnfollowAuthorApi(action) {
  try {
    const response = yield call(
      setUnfollowAuthorApi,
      action.payload.userId,
      action.payload.authorId
    );
    yield put({
      type: 'SUCCESS_SET_UNFOLLOW_AUTHOR',
      payload: { data: response }
    });
  } catch (err) {
    yield put({ type: 'FAILURE_SET_UNFOLLOW_AUTHOR' });
  }
}
