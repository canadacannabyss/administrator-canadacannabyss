import { combineReducers } from 'redux';

import billing from './billing/billing';
import billingList from './billing/billingList';

import bundle from './bundle/bundle';
import bundles from './bundles/bundles';

import category from './category/category';
import categories from './categories/categories';

import coupon from './coupon/coupon';
import coupons from './coupons/coupons';

import order from './order/order';
import orders from './orders/orders';

import product from './product/product';
import products from './products/products';

import promotion from './promotion/promotion';
import promotions from './promotions/promotions';

import reseller from './reseller/reseller';
import resellers from './resellers/resellers';

import user from './user/user';

import shipping from './shipping/shipping';
import shippingList from './shipping/shippingList';

import banner from './banner/banner';
import banners from './banners/banners';

export default combineReducers({
  banner,
  banners,
  billing,
  billingList,
  bundle,
  bundles,
  category,
  categories,
  coupon,
  coupons,
  order,
  orders,
  product,
  products,
  promotion,
  promotions,
  reseller,
  resellers,
  user,
  shipping,
  shippingList
});
