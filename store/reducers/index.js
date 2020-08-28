import { combineReducers } from 'redux';

import billing from './billing/billing';
import billingList from './billing/billingList';
import user from './user/user';
import shipping from './shipping/shipping';
import shippingList from './shipping/shippingList';

export default combineReducers({
  billing,
  billingList,
  user,
  shipping,
  shippingList
});
