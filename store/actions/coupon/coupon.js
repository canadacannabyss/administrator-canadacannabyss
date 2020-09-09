export function getCoupon(slug) {
  return {
    type: 'REQUEST_GET_COUPON',
    payload: {
      slug
    }
  };
}
