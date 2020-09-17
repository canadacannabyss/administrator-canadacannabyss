import _ from 'lodash';
import Head from 'next/head';
import Router from 'next/router';
import React, { useEffect, useState, useRef } from 'react';
import { connect } from 'react-redux';
import { FaSortAmountDownAlt, FaPen } from 'react-icons/fa';
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
  Container,
  Content,
  ContentContainer,
  TitleSearchBarAddButtonDiv,
  TitleDiv,
  PlusIconSign,
  Label,
  Input,
  HalfGrid,
  P,
  Select,
} from '../../../styles/Pages/Add/Product';
import { BackgroundAdd } from '../../../styles/Components/UI/DefaultSidebarPage/DefaultSidebarPage';
import { getOrder } from '../../../store/actions/order/order';
import OrderedItemsList from '../../../components/UI/List/Order/OrderedItemsList';

const mapStateToProps = (state) => {
  const { order } = state;

  return {
    order,
  };
};

const EditOrder = (props) => {
  const { order } = props;

  const [items, setItems] = useState([]);

  const [shipped, setShipped] = useState(false);
  const [paid, setPaid] = useState(false);

  const editOrder = async (product) => {
    const response = await fetch(
      `${process.env.MAIN_API_ENDPOINT}/admin/orders/update/${id}`,
      {
        method: 'PUT',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
      }
    );
    const data = await response.json();
    return data;
  };

  useEffect(() => {
    if (
      !_.isEmpty(order.data) &&
      order.fetched &&
      !order.loading &&
      !order.error
    ) {
      setShipped(order.data.shipping.status.shipped);
      setPaid(order.data.paid);
    }
  }, [order]);

  const onChangeShipped = (e) => {
    if (e.target.value === 'true') {
      setShipped(true);
    } else if (e.target.value === 'false') {
      setShipped(false);
    }
  };

  const onChangePaid = (e) => {
    if (e.target.value === 'true') {
      setPaid(true);
    } else if (e.target.value === 'false') {
      setPaid(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const orderObj = {
      shipped,
      paid,
    };
    const res = await editOrder(orderObj);
    if (res.ok) {
      Router.push('/orders');
    }
  };

  const removeElementFromArray = (arr, element) => {
    const index = arr.indexOf(element);
    if (index > -1) {
      arr.splice(index, 1);
    }
    return arr;
  };

  const handleGetElement = (el) => {
    const element = el;
    if (!items.includes(element.id)) {
      setItems((pOnBundle) => pOnBundle.concat(element.id));
      element.style.backgroundColor = '#18840f';
      element.style.border = '1px solid #18840f';
      element.querySelector('.name').style.color = '#fff';
      element.querySelector('.items-detail').style.display = 'block';
      element.querySelector('.empty').style.display = 'block';
    } else {
      setItems(removeElementFromArray(items, element.id));
      element.style.backgroundColor = '#efefef';
      element.style.border = '1px solid #efefef';
      element.querySelector('.name').style.color = '#18840f';
      element.querySelector('.items-detail').style.display = 'none';
      element.querySelector('.empty').style.display = 'none';
    }
  };

  return (
    <>
      <Head>
        <title>Edit Order | Administrator - Canada Cannabyss</title>
      </Head>
      <BackgroundAdd>
        {/* <Wrapper> */}
        <MainGrid>
          <Container>
            <ContentContainer>
              <Content>
                <TitleSearchBarAddButtonDiv>
                  <TitleDiv>
                    <PlusIconSign>
                      <FaSortAmountDownAlt className='mainIcon' />
                      <FaPen className='plus' />
                    </PlusIconSign>
                    <h1>Edit Order</h1>
                  </TitleDiv>
                </TitleSearchBarAddButtonDiv>
                <Label for='orderId'>Order ID</Label>
                <P>{order.data._id}</P>
                <br />
                <HalfGrid>
                  <div>
                    <Label>Shipping Status</Label>
                    <Select onChange={onChangeShipped}>
                      {!_.isEmpty(order.data) &&
                        order.fetched &&
                        !order.loading &&
                        !order.error && (
                          <>
                            {order.data.shipping.shipped ? (
                              <>
                                <option value={true}>Shipped</option>
                                <option value={false}>Processing order</option>
                              </>
                            ) : (
                              <>
                                <option value={false}>Processing order</option>
                                <option value={true}>Shipped</option>
                              </>
                            )}
                          </>
                        )}
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor='shippingAddress'>Shipping Address</Label>
                    {!_.isEmpty(order.data) &&
                      order.fetched &&
                      !order.loading &&
                      !order.error && (
                        <P id='shippingAddress'>
                          {`${order.data.shippingAddress.addressLine1}, ${order.data.shippingAddress.city}, ${order.data.shippingAddress.provinceState}, ${order.data.shippingAddress.country}`}
                        </P>
                      )}
                  </div>
                </HalfGrid>
                <br />
                <HalfGrid>
                  <div>
                    <Label>Payment Method</Label>
                    {!_.isEmpty(order.data) &&
                      order.fetched &&
                      !order.loading &&
                      !order.error && (
                        <>
                          {order.data.paymentMethod.cryptocurrency.symbol !==
                            null &&
                            order.data.paymentMethod.cryptocurrency.address !==
                              null && <P>Cryptocurrency</P>}
                          {order.data.paymentMethod.eTransfer && (
                            <P>e-Transfer</P>
                          )}
                        </>
                      )}
                  </div>
                  <div>
                    {!_.isEmpty(order.data) &&
                      order.fetched &&
                      !order.loading &&
                      !order.error && (
                        <>
                          {order.data.paymentMethod.cryptocurrency.symbol !==
                            null &&
                            order.data.paymentMethod.cryptocurrency.address !==
                              null && (
                              <>
                                <Label>
                                  Crytocurrency{' '}
                                  {order.data.paymentMethod.cryptocurrency
                                    .symbol && 'Ethereum'}{' '}
                                  Wallet
                                </Label>
                                <P>
                                  {
                                    order.data.paymentMethod.cryptocurrency
                                      .address
                                  }
                                </P>
                              </>
                            )}
                          {order.data.paymentMethod.eTransfer && (
                            <P>e-Transfer</P>
                          )}
                        </>
                      )}
                  </div>
                </HalfGrid>
                <br />
                <HalfGrid>
                  <div>
                    <Label>Payment Status</Label>
                    <Select onChange={onChangePaid}>
                      {!_.isEmpty(order.data) &&
                        order.fetched &&
                        !order.loading &&
                        !order.error && (
                          <>
                            {order.data.paymentMethod.paid ? (
                              <>
                                <option value={true}>Paid</option>
                                <option value={false}>Pending</option>
                              </>
                            ) : (
                              <>
                                <option value={false}>Pending</option>
                                <option value={true}>Paid</option>
                              </>
                            )}
                          </>
                        )}
                    </Select>
                  </div>
                  <div>
                    <Label>Total</Label>
                    <P>{order.data.total}</P>
                  </div>
                </HalfGrid>
              </Content>
            </ContentContainer>
          </Container>
          {!_.isEmpty(order.data) &&
            order.fetched &&
            !order.loading &&
            !order.error && (
              <OrderedItemsList
                title='Purchased Items'
                products={order.data.cart.items}
                handleGetElement={handleGetElement}
              />
            )}
        </MainGrid>
        {/* </Wrapper> */}
        <SubmitButton type='button' onClick={handleSubmit}>
          Update Product
        </SubmitButton>
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
