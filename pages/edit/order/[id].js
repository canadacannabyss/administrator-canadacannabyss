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
import { getOrder } from '../../../store/actions/order/getOrder';

const mapStateToProps = (state) => {
  const { order } = state;

  return {
    order,
  };
};

const EditOrder = (props) => {
  const { order } = props;

  return (
    <>
      <Head>
        <title>Edit Order | Administrator - Canada Cannabyss</title>
      </Head>
      <BackgroundAdd>
        <Wrapper>
          <MainGrid className='main'>
            {!_.isEmpty(order.data) &&
              order.fetched &&
              !order.loading &&
              !order.error && <h1>Order ID:{order.data._id}</h1>}
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
