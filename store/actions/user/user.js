/* eslint-disable import/prefer-default-export */
export function loginUser(userInfo) {
  return {
    type: 'REQUEST_LOGIN_USER',
    payload: {
      userInfo
    }
  };
}

export function loginAdminUser(username, password) {
  return {
    type: 'REQUEST_LOGIN_ADMIN_USER',
    payload: {
      username,
      password
    }
  };
}

export function loginResellerUser(username, password) {
  return {
    type: 'REQUEST_LOGIN_RESELLER_USER',
    payload: {
      username,
      password
    }
  };
}

export function fetchLoginUser(userInfo) {
  return {
    type: 'REQUEST_FETCH_LOGIN_USER',
    payload: {
      userInfo
    }
  };
}

export function fetchLoginAdminUser(userInfo) {
  return {
    type: 'REQUEST_FETCH_LOGIN_ADMIN_USER',
    payload: {
      userInfo
    }
  };
}

export function fetchLoginResellerUser(userInfo) {
  return {
    type: 'REQUEST_FETCH_LOGIN_RESELLER_USER',
    payload: {
      userInfo
    }
  };
}

export function refreshUserData(id) {
  return {
    type: 'REQUEST_REFRESH_USER_DATA',
    payload: {
      id
    }
  };
}

export function logoutUser() {
  return {
    type: 'REQUEST_LOGOUT_USER'
  };
}

export function loginUserProvider(endpoint) {
  return {
    type: 'REQUEST_LOGIN_USER_PROVIDER',
    payload: {
      endpoint
    }
  };
}

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

export function setFollowAuthor(userId, authorId) {
  return {
    type: 'REQUEST_SET_FOLLOW_AUTHOR',
    payload: {
      userId,
      authorId
    }
  };
}

export function setUnfollowAuthor(userId, authorId) {
  return {
    type: 'REQUEST_SET_UNFOLLOW_AUTHOR',
    payload: {
      userId,
      authorId
    }
  };
}

export function registerAdminUser(adminRegisterInfo) {
  return {
    type: 'REQUEST_REGISTER_ADMIN_USER',
    payload: {
      adminRegisterInfo
    }
  };
}
