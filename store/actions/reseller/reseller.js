export function getReseller(username) {
  return {
    type: 'REQUEST_GET_RESELLER',
    payload: {
      username
    }
  };
}
