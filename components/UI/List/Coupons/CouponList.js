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
} from '../../../../styles/Components/UI/List/Coupons/CouponList';

const CouponList = (props) => {
  const { coupons, handleGetElement } = props;

  const dateFormatter = new DateFormatter();

  const handleSelectProduct = (e) => {
    const getter = handleGetElement;
    getter(e.currentTarget);
  };

  return (
    <List>
      <SpansDiv>
        <div className='couponName'>
          <span>Coupon Name</span>
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
      {coupons.map((coupon) => (
        <ListLiContent id={coupon._id}>
          <div className='couponName'>
            <a href={`${process.env.SECURED_MAIN_DOMAIN}/coupon/${coupon.slug}`}>
              {coupon.couponName}
            </a>
          </div>
          <div className='createdOn'>
            <p>
              {dateFormatter.formatDateFullDate(coupon.createdOn)}
            </p>
          </div>
          <div className='updatedOn'>
            <p>
              {coupon.updatedOn ? (
                <>
                  {dateFormatter.formatDateFullDate(coupon.updatedOn)}
                </>
              ) : ('Not updated')}
            </p>
          </div>
          <div className='featured'>
            {coupon.featured ? <input type='checkbox' checked /> : <input type='checkbox' />}
          </div>
          <div className='buttons'>
            <Link
              href='/edit/coupon/[slug]'
              as={`/edit/coupon/${coupon.slug}`}
            >
              <EditLink>
                <FaEdit />
              </EditLink>
            </Link>
            <DeleteButton onClick={(e) => {
              handleSelectProduct(e);
            }}
            >
              <FaTrashAlt />
            </DeleteButton>
          </div>
        </ListLiContent>
      ))}
    </List>
  );
};

CouponList.propTypes = {
  coupons: PropTypes.shape().isRequired
};

export default CouponList;
