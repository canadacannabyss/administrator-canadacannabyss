export function getCategory(slug) {
  return {
    type: 'REQUEST_GET_CATEGORY',
    payload: {
      slug
    }
  };
}
