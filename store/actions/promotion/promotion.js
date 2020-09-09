export function getPromotion(slug) {
  return {
    type: 'REQUEST_GET_PROMOTION',
    payload: {
      slug
    }
  };
}
