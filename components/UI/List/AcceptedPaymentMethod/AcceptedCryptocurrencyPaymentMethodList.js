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
} from '../../../../styles/Components/UI/List/Products/ProductList';

const AcceptedPaymentMethodList = (props) => {
  const { cryptocurrencies, handleGetElement } = props;

  console.log('cryptocurrencies on list:', cryptocurrencies);

  const dateFormatter = new DateFormatter();

  const handleSelectProduct = (e) => {
    const getter = handleGetElement;
    getter(e.currentTarget);
  };

  return (
    <List>
      <SpansDiv>
        <div className='productName'>
          <span>Symbol - Name</span>
        </div>
        <div className='price'>
          <span>
            Address
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
        <div className='buttons'>
          <span>Delete</span>
        </div>
      </SpansDiv>
      {cryptocurrencies.map((cryptocurrency) => (
        <ListLiContent id={cryptocurrency._id}>
          <div className='productName'>
            <a>
              {`${cryptocurrency.cryptocurrency.symbol} - ${cryptocurrency.cryptocurrency.name}`}
            </a>
          </div>
          <div className='price'>
            <p>
              {cryptocurrency.cryptocurrency.address}
            </p>
          </div>
          <div className='createdOn'>
            <p>
              {dateFormatter.formatDateFullDate(cryptocurrency.createdOn)}
            </p>
          </div>
          <div className='updatedOn'>
            <p>
              {cryptocurrency.updatedOn ? (
                <>
                  {dateFormatter.formatDateFullDate(cryptocurrency.updatedOn)}
                </>
              ) : ('Not updated')}
            </p>
          </div>
          <div className='buttons'>
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

AcceptedPaymentMethodList.propTypes = {
  cryptocurrencies: PropTypes.shape().isRequired
};

export default AcceptedPaymentMethodList;
