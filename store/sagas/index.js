import { all, takeLatest } from 'redux-saga/effects';

import CreateBilling from './billing/createBilling';
import CreateBillingCheckout from './billing/createBillingCheckout';
import DeleteBilling from './billing/deleteBilling';
import GetBilling from './billing/getBilling';
import GetBillingAddresses from './billing/getBillingAddresses';
import ResetBilling from './billing/resetBilling';
import SetBillingAddress from './billing/setBillingAddress';
import UpdateBilling from './billing/updateBilling';

import CreateShipping from './shipping/createShipping';
import CreateShippingCheckout from './shipping/createShippingCheckout';
import DeleteShipping from './shipping/deleteShipping';
import GetShipping from './shipping/getShipping';
import GetShippingAddresses from './shipping/getShippingAddresses';
import ResetShipping from './shipping/resetShipping';
import SetShippingAddress from './shipping/setShippingAddress';
import UpdateShipping from './shipping/updateShipping';

import LoginAdminUserApi from './user/loginAdminUser';
import LoginUserApi from './user/loginUser';
import FetchLoginUserApi from './user/fetchLoginUser';
import FetchLoginAdminUserApi from './user/fetchLoginAdminUser';
import FetchLoginResellerUserApi from './user/fetchLoginResellerUser';
import LoginUserProviderApi from './user/loginUserProvider';
import LogoutUserApi from './user/logoutUser';
import RefreshUserData from './user/refreshUserData';
import RegisterAdminUserApi from './user/registerAdminUser';

import GetOrder from './order/getOrder';
import GetOrders from './orders/getOrders';

import GetProduct from './product/getProduct';
import GetProducts from './products/getProducts';

import GetCoupon from './coupon/getCoupon';
import GetCoupons from './coupons/getCoupons';

import GetCategory from './category/getCategory';
import GetCategories from './categories/getCategories';

import GetReseller from './reseller/getReseller';
import GetResellers from './resellers/getResellers';

import GetBundle from './bundle/getBundle';
import GetBundles from './bundles/getBundles';

import GetPromotion from './promotion/getPromotion';
import GetPromotions from './promotions/getPromotions';

import GetBanner from './banner/getBanner';
import GetBanners from './banners/getBanners';

export default function* root() {
  yield all([
    takeLatest('REQUEST_CREATE_BILLING', CreateBilling),
    takeLatest('REQUEST_CREATE_BILLING_CHECKOUT', CreateBillingCheckout),
    takeLatest('REQUEST_UPDATE_BILLING', UpdateBilling),
    takeLatest('REQUEST_DELETE_BILLING', DeleteBilling),
    takeLatest('REQUEST_GET_BILLING', GetBilling),
    takeLatest('REQUEST_GET_BILLING_ADDRESSES', GetBillingAddresses),
    takeLatest('REQUEST_RESET_BILLING', ResetBilling),
    takeLatest('REQUEST_SET_BILLING_ADDRESS', SetBillingAddress),

    takeLatest('REQUEST_CREATE_SHIPPING', CreateShipping),
    takeLatest('REQUEST_CREATE_SHIPPING_CHECKOUT', CreateShippingCheckout),
    takeLatest('REQUEST_UPDATE_SHIPPING', UpdateShipping),
    takeLatest('REQUEST_DELETE_SHIPPING', DeleteShipping),
    takeLatest('REQUEST_GET_SHIPPING', GetShipping),
    takeLatest('REQUEST_GET_SHIPPING_ADDRESSES', GetShippingAddresses),
    takeLatest('REQUEST_RESET_SHIPPING', ResetShipping),
    takeLatest('REQUEST_SET_SHIPPING_ADDRESS', SetShippingAddress),

    takeLatest('REQUEST_REGISTER_ADMIN_USER', RegisterAdminUserApi),
    takeLatest('REQUEST_LOGIN_ADMIN_USER', LoginAdminUserApi),
    takeLatest('REQUEST_LOGIN_USER', LoginUserApi),
    takeLatest('REQUEST_FETCH_LOGIN_USER', FetchLoginUserApi),
    takeLatest('REQUEST_FETCH_LOGIN_ADMIN_USER', FetchLoginAdminUserApi),
    takeLatest('REQUEST_FETCH_LOGIN_RESELLER_USER', FetchLoginResellerUserApi),
    takeLatest('REQUEST_LOGIN_USER_PROVIDER', LoginUserProviderApi),
    takeLatest('REQUEST_LOGOUT_USER', LogoutUserApi),
    takeLatest('REQUEST_REFRESH_USER_DATA', RefreshUserData),

    takeLatest('REQUEST_GET_ORDER', GetOrder),
    takeLatest('REQUEST_GET_ORDERS', GetOrders),

    takeLatest('REQUEST_GET_PRODUCT', GetProduct),
    takeLatest('REQUEST_GET_PRODUCTS', GetProducts),

    takeLatest('REQUEST_GET_COUPON', GetCoupon),
    takeLatest('REQUEST_GET_COUPONS', GetCoupons),

    takeLatest('REQUEST_GET_CATEGORY', GetCategory),
    takeLatest('REQUEST_GET_CATEGORIES', GetCategories),

    takeLatest('REQUEST_GET_RESELLER', GetReseller),
    takeLatest('REQUEST_GET_RESELLERS', GetResellers),

    takeLatest('REQUEST_GET_BUNDLE', GetBundle),
    takeLatest('REQUEST_GET_BUNDLES', GetBundles),

    takeLatest('REQUEST_GET_PROMOTION', GetPromotion),
    takeLatest('REQUEST_GET_PROMOTIONS', GetPromotions),

    takeLatest('REQUEST_GET_BANNER', GetBanner),
    takeLatest('REQUEST_GET_BANNERS', GetBanners)
  ]);
}
