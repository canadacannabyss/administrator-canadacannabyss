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
} from '../../../../styles/Components/UI/List/Banners/BannerList';

const BannerList = (props) => {
  const { banners, handleGetElement } = props;

  const dateFormatter = new DateFormatter();

  const handleSelectProduct = (e) => {
    const getter = handleGetElement;
    getter(e.currentTarget);
  };

  return (
    <List>
      <SpansDiv>
        <div className='promotionName'>
          <span>Banner Name</span>
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
        <ListLiContent id={banner._id}>
          <div className='promotionName'>
            <a href={`${process.env.SECURED_MAIN_DOMAIN}/banner/${banner.slug}`}>
              {banner.bannerName}
            </a>
          </div>
          <div className='createdOn'>
            <p>
              {dateFormatter.formatDateFullDate(banner.createdOn)}
            </p>
          </div>
          <div className='updatedOn'>
            <p>
              {banner.updatedOn ? (
                <>
                  {dateFormatter.formatDateFullDate(banner.updatedOn)}
                </>
              ) : ('Not updated')}
            </p>
          </div>
          <div className='featured'>
            {banner.featured ? <input type='checkbox' checked /> : <input type='checkbox' />}
          </div>
          <div className='buttons'>
            <Link
              href='/edit/banner/[slug]'
              as={`/edit/banner/${banner.slug}`}
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

BannerList.propTypes = {
  banners: PropTypes.shape().isRequired
};

export default BannerList;
