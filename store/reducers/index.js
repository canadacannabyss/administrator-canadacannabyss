import { combineReducers } from 'redux';

import billing from './billing/billing';
import billingList from './billing/billingList';

import category from './category/category';
import categories from './categories/categories';

import coupon from './coupon/coupon';
import coupons from './coupons/coupons';

import order from './order/order';
import orders from './orders/orders';

import product from './product/product';
import products from './products/products';

import reseller from './reseller/reseller';
import resellers from './resellers/resellers';

import user from './user/user';

import shipping from './shipping/shipping';
import shippingList from './shipping/shippingList';

export default combineReducers({
  billing,
  billingList,
  category,
  categories,
  coupon,
  coupons,
  order,
  orders,
  product,
  products,
  reseller,
  resellers,
  user,
  shipping,
  shippingList
});
