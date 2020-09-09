export function getOrder(id) {
  return {
    type: 'REQUEST_GET_ORDER',
    payload: {
      id
    }
  };
}
