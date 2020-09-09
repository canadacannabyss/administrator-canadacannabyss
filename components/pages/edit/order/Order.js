import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
  const { order } = state;
  return {
    order
  };
};

const Order = (props) => {
  const { order } = props;

  return (
    <div>
      {!_.isEmpty(order.data) && (
        <h1>{order.data._id}</h1>
      )}
    </div>
  );
};

export default connect(mapStateToProps)(Order);
