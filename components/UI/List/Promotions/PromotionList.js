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
} from '../../../../styles/Components/UI/List/Promotions/PromotionList';

const PromotionList = (props) => {
  const { promotions } = props;
  return (
    <List>
      <SpansDiv>
        <div className='promotionName'>
          <span>Promotion Name</span>
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
      {promotions.map((promotion) => (
        <ListLiContent>
          <div className='promotionName'>
            <a href={`${process.env.STORE_MAIN_DOMAIN}/promotion/${promotion.slug}`}>
              {promotion.promotionName}
            </a>
          </div>
          <div className='price'>
            <p>
              {promotion.prices.price}
            </p>
          </div>
          <div className='compareTo'>
            <p>
              {promotion.prices.compareTo}
            </p>
          </div>
          <div className='createdOn'>
            <p>
              {promotion.createdOn}
            </p>
          </div>
          <div className='updatedOn'>
            <p>
              {promotion.updatedOn}
            </p>
          </div>
          <div className='featured'>
            {promotion.featured ? <input type='checkbox' checked /> : <input type='checkbox' />}
          </div>
          <div className='buttons'>
            <Link
              href='/promotions/edit/[slug]'
              as={`/promotions/edit/${promotion.slug}`}
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

PromotionList.propTypes = {
  promotions: PropTypes.shape().isRequired,
};

export default PromotionList;
