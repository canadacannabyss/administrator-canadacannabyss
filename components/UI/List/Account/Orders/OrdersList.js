import Link from 'next/link';
import React from 'react';
import {
  Grid,
  Label,
  OrderBtn,
  OrderDate,
  OrderDetailsDateDiv,
  OrderDetailsDiv,
  OrderId,
  OrdersProductImg,
  OrdersProductName,
  OrdersProducts,
  OrderTotalPrice,
  Status,
} from '../../../../../styles/Components/UI/Lists/Account/OrdersList/OrdersList';
import DateFormatter from '../../../../../utils/DateFormatter';

const OrderDetails = (props) => {
  const { order } = props;

  return (
    <OrderDetailsDiv className='details'>
      <Grid>
        <div>
          <Label>Shipping Status</Label>
          <Status>
            {order.shipping.status.shipped ? 'Shipped' : 'Processing order'}
          </Status>
          <Label>Payment Method</Label>
          {order.paymentMethod.card.provider !== null &&
            order.paymentMethod.card.id !== null && (
              <Status>Credit Card</Status>
            )}
          {order.paymentMethod.cryptoCurrency.currency !== null &&
            order.paymentMethod.cryptoCurrency.id && (
              <Status>Crypto Currency</Status>
            )}
          {order.paymentMethod.eTransfer && <Status>e-Transfer</Status>}
          <Label>Payment Status</Label>
          {order.paid ? <Status>Paid</Status> : <Status>Pending</Status>}
        </div>
        <div>
          <Label>Shipping Address</Label>
          {order.shippingAddress !== null ? (
            <Status>{`${order.shippingAddress.addressLine1}, ${order.shippingAddress.city}, ${order.shippingAddress.provinceState}, ${order.shippingAddress.country}`}</Status>
          ) : (
            <Status>Not Applied</Status>
          )}

          <Label>Coupon</Label>
          {order.coupon !== null ? (
            <Status>{order.coupon.couponName}</Status>
          ) : (
            <Status>Not Applied</Status>
          )}
          <Label>Total</Label>
          <OrderTotalPrice>
            <span>C$</span> <span className='price'>{order.total}</span>
          </OrderTotalPrice>
        </div>
      </Grid>
      <Label>Items</Label>
      <OrdersProducts productsLength={order.cart.items.length}>
        {order.cart.items.map((item) => (
          <div key={item._id}>
            {item.type === 'product' && (
              <Link href='/product/[slug]' as={`/product/${item.slug}`}>
                <a>
                  <OrdersProductImg src={item.media.url} />
                  <OrdersProductName>{item.itemName}</OrdersProductName>
                </a>
              </Link>
            )}
            {item.type === 'bundle' && (
              <Link href='/bundle/[slug]' as={`/bundle/${item.slug}`}>
                <a>
                  <OrdersProductImg src={item.media.url} />
                  <OrdersProductName>{item.itemName}</OrdersProductName>
                </a>
              </Link>
            )}
          </div>
        ))}
      </OrdersProducts>
    </OrderDetailsDiv>
  );
};

const OrdersList = (props) => {
  const { orders, handleClickOrderDiv } = props;
  const dateFormatter = new DateFormatter();

  const handleToggle = (e) => {
    const toggle = handleClickOrderDiv;
    toggle(e.currentTarget);
  };

  return (
    <>
      {orders.map((order) => (
        <li key={order._id}>
          <OrderBtn onClick={handleToggle} className='orderDiv' id={order._id}>
            <OrderDetailsDateDiv>
              <OrderId>
                <span>Order ID:</span> <span className='id'>{order._id}</span>
              </OrderId>
              <OrderDate>
                {order.purchasedAt !== null ? (
                  <span>
                    {dateFormatter.formatDateFullDate(order.purchasedAt)}
                  </span>
                ) : (
                  <span>Unavailable date</span>
                )}
              </OrderDate>
            </OrderDetailsDateDiv>
            <OrderDetails order={order} />
          </OrderBtn>
        </li>
      ))}
    </>
  );
};

export default OrdersList;
