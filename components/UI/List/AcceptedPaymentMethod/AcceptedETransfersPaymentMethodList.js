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
  const { eTransfers, handleGetElement } = props;

  const dateFormatter = new DateFormatter();

  const handleSelectProduct = (e) => {
    const getter = handleGetElement;
    getter(e.currentTarget);
  };

  return (
    <List>
      <SpansDiv>
        <div className='productName'>
          <span>Email</span>
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
      {eTransfers.map((eTransfer) => (
        <ListLiContent id={eTransfer._id}>
          <div className='productName'>
            <a>
              {eTransfer.eTransfer.recipient}
            </a>
          </div>
          <div className='createdOn'>
            <p>
              {dateFormatter.formatDateFullDate(eTransfer.createdOn)}
            </p>
          </div>
          <div className='updatedOn'>
            <p>
              {eTransfer.updatedOn ? (
                <>
                  {dateFormatter.formatDateFullDate(eTransfer.updatedOn)}
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
  eTransfers: PropTypes.shape().isRequired
};

export default AcceptedPaymentMethodList;
