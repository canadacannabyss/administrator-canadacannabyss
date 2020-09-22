import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import OrdersList from '../../../../UI/List/Orders/SalesList';

const SalesList = (props) => {
  const { orders } = props;

  return (
    <>
      {!_.isEmpty(orders.data) && orders.fetched && !orders.loading && !orders.errros && (
        <OrdersList orders={orders.data} />
      )}
    </>
  );
};

SalesList.propTypes = {
  orders: PropTypes.shape().isRequired
};

export default SalesList;
