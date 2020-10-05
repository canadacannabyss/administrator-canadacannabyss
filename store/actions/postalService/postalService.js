export function getPostalService(slug) {
  return {
    type: 'REQUEST_GET_POSTAL_SERVICE',
    payload: {
      slug
    }
  };
}
