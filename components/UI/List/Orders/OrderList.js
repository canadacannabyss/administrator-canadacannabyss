import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import DateFormatter from '../../../../utils/dateFormatter';
import {
  List,
  ListLiContent,
  EditLink,
  DeleteButton,
  SpansDiv
} from '../../../../styles/Components/UI/List/Orders/OrderList';

const OrderList = (props) => {
  const { orders } = props;

  const dateFormatter = new DateFormatter();

  return (
    <List>
      <SpansDiv>
        <div className='orderId'>
          <span>Order ID</span>
        </div>
        <div className='price'>
          <span>
            Total
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
        <div className='purchasedAt'>
          <span>
            Purchased At
          </span>
        </div>
        <div className='buttons'>
          <span>Edit</span>
        </div>
      </SpansDiv>
      {orders.map((order) => (
        <ListLiContent>
          <div className='orderId'>
            <Link href='/order/[id]' as={`/order/${order._id}`}>
              <a>
                {order._id}
              </a>
            </Link>
          </div>
          <div className='price'>
            <p>
              {order.total}
            </p>
          </div>
          <div className='createdOn'>
            <p>
              {dateFormatter.formatDateFullDate(order.createdOn)}
            </p>
          </div>
          <div className='updatedOn'>
            <p>
              {order.updatedOn ? (
                <>
                  {dateFormatter.formatDateFullDate(order.updatedOn)}
                </>
              ) : ('Not updated')}
            </p>
          </div>
          <div className='purchasedAt'>
            <p>
              {dateFormatter.formatDateFullDate(order.purchasedAt)}
            </p>
          </div>
          <div className='buttons'>
            <Link
              href='/edit/order/[id]'
              as={`/edit/order/${order._id}`}
            >
              <EditLink>
                <FaEdit />
              </EditLink>
            </Link>
          </div>
        </ListLiContent>
      ))}
    </List>
  );
};

OrderList.propTypes = {
  orders: PropTypes.shape().isRequired
};

export default OrderList;
