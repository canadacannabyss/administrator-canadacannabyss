export function getProduct(slug) {
  return {
    type: 'REQUEST_GET_PRODUCT',
    payload: {
      slug
    }
  };
}
