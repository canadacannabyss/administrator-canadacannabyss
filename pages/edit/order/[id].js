import _ from 'lodash';
import Head from 'next/head';
import Router from 'next/router';
import React, { useEffect, useState, useRef } from 'react';
import { connect } from 'react-redux';
import { FaBox, FaPen, FaSpinner } from 'react-icons/fa';
import PropTypes from 'prop-types';
import {
  categoriesArrayToString,
  tagsArrayToString,
} from '../../../utils/arrayMethods';
import {
  slugifyString,
  categoriesToArray,
  tagsToArray,
  editCategoriesToArray,
  editTagsToArray,
} from '../../../utils/stringMethods';
import {
  Wrapper,
  StickyDiv,
  MainGrid,
  SubmitButton,
  LoadingSpinner,
  Loading,
  Warning,
} from '../../../styles/Pages/Add/Product';
import { BackgroundAdd } from '../../../styles/Components/UI/DefaultSidebarPage/DefaultSidebarPage';
import { getOrder } from '../../../store/actions/order/order';

const mapStateToProps = (state) => {
  const { order } = state;

  return {
    order,
  };
};

const EditOrder = (props) => {
  const { order } = props;

  const [orderId, setOrderId] = useState({});

  useEffect(() => {
    if (
      !_.isEmpty(order.data) &&
      order.fetched &&
      !order.loading &&
      !order.error
    ) {
      setOrderId(order.data._id);
    }
  }, [order]);

  return (
    <>
      <Head>
        <title>Edit Order | Administrator - Canada Cannabyss</title>
      </Head>
      <BackgroundAdd>
        <Wrapper>
          <MainGrid className='main'>
            <h1>Order ID:{orderId}</h1>
          </MainGrid>
        </Wrapper>
      </BackgroundAdd>
    </>
  );
};

EditOrder.getInitialProps = async ({ ctx }) => {
  const { store, asPath } = ctx;

  const orderId = asPath.substring(12, asPath.length);
  console.log('orderId:', orderId);

  store.dispatch(getOrder(orderId));
};

EditOrder.propTypes = {
  order: PropTypes.shape().isRequired,
};

export default connect(mapStateToProps)(EditOrder);
