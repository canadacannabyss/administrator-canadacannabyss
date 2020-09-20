import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FaSortAmountDownAlt } from 'react-icons/fa';
import _ from 'lodash';
import { Background } from '../../styles/Components/UI/DefaultSidebarPage/DefaultSidebarPage';
import {
  Wrapper,
  Container,
  ContentContainer,
  SearchBarAddButtonDiv,
  TitleSearchBarAddButtonDiv,
  SearchBar,
  TitleDiv,
  Content,
} from '../../styles/Pages/Orders/Orders';
import {
  StickyDiv,
  MainGrid,
  SubmitButton,
  LoadingSpinner,
  Loading,
  Warning,
  Label,
  Input,
  HalfGrid,
  P,
  GroupSpan,
  Select,
  PlusIconSign,
} from '../../styles/Pages/Add/Product';
import { getOrder } from '../../store/actions/order/order';
import OrderedItemsList from '../../components/UI/List/Order/OrderedItemsList';
import DateFormatter from '../../utils/dateFormatter';
import WithAuth from '../../components/UI/withAuth/withAuth';

const mapStateToProps = (state) => {
  const { order } = state;
  return { order };
};

const Order = (props) => {
  const { order } = props;

  const [items, setItems] = useState([]);

  const [orderId, setOrderId] = useState({});

  const [shippingGeolocation, setShippinggeolocation] = useState({});

  const dateFormatter = new DateFormatter();

  const fetchShippingGeolocation = async (orderID) => {
    console.log('orderID:', orderID);
    const response = await fetch(
      `${process.env.MAIN_API_ENDPOINT}/admin/orders/${orderID}/coordinates`,
      {
        method: 'GET',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    const data = await response.json();
    setShippinggeolocation(data);
  };

  useEffect(() => {
    if (
      !_.isEmpty(order.data) &&
      order.fetched &&
      !order.loading &&
      !order.error
    ) {
      setOrderId(order.data._id);
      // fetchShippingGeolocation(order.data._id);
    }
  }, [order]);

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
    <WithAuth>
      <Head>
        <title>{`Order: ${orderId} | Administrator - Canada Cannabyss`}</title>
      </Head>
      <Background>
        <Wrapper>
          <MainGrid>
            <Container>
              <ContentContainer>
                <Content>
                  <TitleSearchBarAddButtonDiv>
                    <TitleDiv>
                      <PlusIconSign>
                        <FaSortAmountDownAlt className='mainIcon' />
                      </PlusIconSign>
                      <h1>Order</h1>
                    </TitleDiv>
                  </TitleSearchBarAddButtonDiv>

                  <HalfGrid>
                    <div>
                      <Label for='orderId'>Order ID</Label>
                      {!_.isEmpty(order.data) &&
                        order.fetched &&
                        !order.loading &&
                        !order.error && <P>{order.data._id}</P>}
                    </div>
                    <div>
                      <Label>Purchased At</Label>
                      <P>
                        {!_.isEmpty(order.data) &&
                          order.fetched &&
                          !order.loading &&
                          !order.error && (
                            <>
                              {dateFormatter.formatDateFullDate(
                                order.data.purchasedAt
                              )}
                            </>
                          )}
                      </P>
                    </div>
                  </HalfGrid>
                  <br />
                  <br />
                  <GroupSpan>Shipping information</GroupSpan>
                  <HalfGrid>
                    <div>
                      <Label>Shipping Status</Label>
                      <P>
                        {!_.isEmpty(order.data) &&
                          order.fetched &&
                          !order.loading &&
                          !order.error && (
                            <>
                              {order.data.shipping.status.shipped
                                ? 'Shipping'
                                : 'Processing order'}
                            </>
                          )}
                      </P>
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
                      <Label>Shipped at</Label>
                      <P>
                        {!_.isEmpty(order.data) &&
                          order.fetched &&
                          !order.loading &&
                          !order.error && (
                            <>
                              {order.data.shipping.status.when ? (
                                <>
                                  {dateFormatter.formatDateFullDate(
                                    order.data.shipping.status.when
                                  )}
                                </>
                              ) : (
                                'Not Shipped yet'
                              )}
                            </>
                          )}
                      </P>
                    </div>
                  </HalfGrid>
                  <br />
                  <br />
                  <GroupSpan>Billing information</GroupSpan>
                  <Label>Billing Address</Label>
                  <P id='shippingAddress'>
                    {!_.isEmpty(order.data) &&
                      order.fetched &&
                      !order.loading &&
                      !order.error && (
                        <>
                          {`${order.data.billingAddress.addressLine1}, ${order.data.billingAddress.city}, ${order.data.billingAddress.provinceState}, ${order.data.billingAddress.country}`}
                        </>
                      )}
                  </P>
                  <br />
                  <br />
                  <GroupSpan>Payment information</GroupSpan>
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
                              order.data.paymentMethod.cryptocurrency
                                .address !== null && <P>Cryptocurrency</P>}
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
                              order.data.paymentMethod.cryptocurrency
                                .address !== null && (
                                <>
                                  <Label>
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
                              <>
                                <Label>Customer Email</Label>
                                <P>{order.data.customer.email}</P>
                              </>
                            )}
                          </>
                        )}
                    </div>
                  </HalfGrid>
                  <br />
                  <HalfGrid>
                    <div>
                      <Label>Payment Status</Label>
                      {!_.isEmpty(order.data) &&
                        order.fetched &&
                        !order.loading &&
                        !order.error && (
                          <P>{order.data.paid ? 'Paid' : 'Pending'}</P>
                        )}
                    </div>
                    <div>
                      <Label>Total</Label>
                      {!_.isEmpty(order.data) &&
                        order.fetched &&
                        !order.loading &&
                        !order.error && <P>C$ {order.data.total}</P>}
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
        </Wrapper>
      </Background>
    </WithAuth>
  );
};

Order.propTypes = {
  order: PropTypes.string.isRequired,
};

Order.getInitialProps = async ({ ctx }) => {
  const { asPath, store } = ctx;

  const orderId = asPath.substring(7, asPath.length);

  store.dispatch(getOrder(orderId));
};

export default connect(mapStateToProps)(Order);
