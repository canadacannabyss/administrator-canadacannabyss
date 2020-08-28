import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';

import {
  List,
  ListLiContent,
  EditLink,
  DeleteButton,
  SpansDiv,
} from '../../../../styles/Components/UI/List/Orders/OrderList';

const OrderList = (props) => {
  const { orders } = props;
  return (
    <List>
      <SpansDiv>
        <div className='orderName'>
          <span>Order Name</span>
        </div>
        <div className='price'>
          <span>
            Price
          </span>
        </div>
        <div className='compareTo'>
          <span>
            Compare To
          </span>
        </div>
        <div className='createdOn'>
          <span>
            Created On
          </span>
        </div>
        <div className='updatedOn'>
          <span>
            Updated On
          </span>
        </div>
        <div className='featured'>
          <span>Featured</span>
        </div>
        <div className='buttons'>
          <span>Edit / Delete</span>
        </div>
      </SpansDiv>
      {orders.map((order) => (
        <ListLiContent>
          <div className='orderName'>
            <a href={`${process.env.STORE_MAIN_DOMAIN}/order/${order.slug}`}>
              {order.orderName}
            </a>
          </div>
          <div className='price'>
            <p>
              {order.prices.price}
            </p>
          </div>
          <div className='compareTo'>
            <p>
              {order.prices.compareTo}
            </p>
          </div>
          <div className='createdOn'>
            <p>
              {order.createdOn}
            </p>
          </div>
          <div className='updatedOn'>
            <p>
              {order.updatedOn}
            </p>
          </div>
          <div className='featured'>
            {order.featured ? <input type='checkbox' checked /> : <input type='checkbox' />}
          </div>
          <div className='buttons'>
            <Link
              href='/orders/edit/[slug]'
              as={`/orders/edit/${order.slug}`}
            >
              <EditLink>
                <FaEdit />
              </EditLink>
            </Link>
            <DeleteButton>
              <FaTrashAlt />
            </DeleteButton>
          </div>
        </ListLiContent>
      ))}
    </List>
  );
};

OrderList.propTypes = {
  orders: PropTypes.shape().isRequired,
};

export default OrderList;
