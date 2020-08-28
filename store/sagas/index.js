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
    takeLatest('REQUEST_REFRESH_USER_DATA', RefreshUserData)
  ]);
}
