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
} from '../../../../styles/Components/UI/List/Promotions/PromotionList';

const PromotionList = (props) => {
  const { promotions, handleGetElement } = props;

  const dateFormatter = new DateFormatter();

  const handleSelectProduct = (e) => {
    const getter = handleGetElement;
    getter(e.currentTarget);
  };

  return (
    <List>
      <SpansDiv>
        <div className='promotionName'>
          <span>Promotion Name</span>
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
        <div className='buttons'>
          <span>Edit / Delete</span>
        </div>
      </SpansDiv>
      {promotions.map((promotion) => (
        <ListLiContent id={promotion._id}>
          <div className='promotionName'>
            <a href={`${process.env.SECURED_MAIN_DOMAIN}/promotion/${promotion.slug}`} target='_blank'>
              {promotion.promotionName}
            </a>
          </div>
          <div className='createdOn'>
            <p>
              {dateFormatter.formatDateFullDate(promotion.createdOn)}
            </p>
          </div>
          <div className='updatedOn'>
            <p>
              {promotion.updatedOn ? (
                <>
                  {dateFormatter.formatDateFullDate(promotion.updatedOn)}
                </>
              ) : ('Not updated')}
            </p>
          </div>
          <div className='buttons'>
            <Link
              href='/edit/promotion/[slug]'
              as={`/edit/promotion/${promotion.slug}`}
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

PromotionList.propTypes = {
  promotions: PropTypes.shape().isRequired
};

export default PromotionList;
