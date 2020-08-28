import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';

import {
  List,
  ListLiContent,
  EditLink,
  DeleteButton,
  SpansDiv
} from '../../../../styles/Components/UI/List/Banners/BannerList';

const BannerList = (props) => {
  const { banners } = props;
  return (
    <List>
      <SpansDiv>
        <div className='promotionName'>
          <span>Banner Name</span>
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
      {banners.map((banner) => (
        <ListLiContent>
          <div className='promotionName'>
            <a href={`${process.env.STORE_MAIN_DOMAIN}/banner/${banner.slug}`}>
              {banner.promotionName}
            </a>
          </div>
          <div className='price'>
            <p>
              {banner.prices.price}
            </p>
          </div>
          <div className='compareTo'>
            <p>
              {banner.prices.compareTo}
            </p>
          </div>
          <div className='createdOn'>
            <p>
              {banner.createdOn}
            </p>
          </div>
          <div className='updatedOn'>
            <p>
              {banner.updatedOn}
            </p>
          </div>
          <div className='featured'>
            {banner.featured ? <input type='checkbox' checked /> : <input type='checkbox' />}
          </div>
          <div className='buttons'>
            <Link
              href='/banners/edit/[slug]'
              as={`/banners/edit/${banner.slug}`}
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

BannerList.propTypes = {
  banners: PropTypes.shape().isRequired
};

export default BannerList;
