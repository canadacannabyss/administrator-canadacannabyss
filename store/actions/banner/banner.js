export function getBanner(slug) {
  return {
    type: 'REQUEST_GET_BANNER',
    payload: {
      slug
    }
  };
}
