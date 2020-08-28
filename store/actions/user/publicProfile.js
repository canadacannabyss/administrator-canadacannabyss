/* eslint-disable import/prefer-default-export */
export function getPublicProfile(user) {
  return {
    type: 'REQUEST_GET_PUBLIC_PROFILE',
    payload: {
      user
    }
  };
}

export function getPublicProfileActivities(activities) {
  return {
    type: 'REQUEST_GET_PUBLIC_PROFILE_ACTIVITIES',
    payload: {
      activities
    }
  };
}
