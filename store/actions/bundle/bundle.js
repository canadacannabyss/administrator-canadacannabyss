export function getBundle(slug) {
  return {
    type: 'REQUEST_GET_BUNDLE',
    payload: {
      slug
    }
  };
}
