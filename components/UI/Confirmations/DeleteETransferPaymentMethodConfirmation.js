import React from 'react';
import { FaFacebookF, FaGoogle } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import {
  Background,
  Statement,
  Wrapper,
  BtnsDiv,
  BtnNo,
  BtnYes
} from '../../../styles/Components/UI/Confirmations/DeleteConfirmation';
import { getETransfersPaymentMethods } from '../../../store/actions/accepted-payment-methods/accepted-payment-methods';

const DeleteConfirmationModal = (props) => {
  const {
    productId,
    productName,
    handleCloseDeleteConfirmation
  } = props;

  const dispatch = useDispatch();

  const handleDeleteConfirmationClose = () => {
    const close = handleCloseDeleteConfirmation;
    close();
  };

  const handleDeleteProduct = async () => {
    const deleteRes = await fetch(
      `${process.env.MAIN_API_ENDPOINT}/admin/e-transfers/delete/e-transfer/${productId}`,
      {
        method: 'PUT',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
    const data = await deleteRes.json();

    if (data.ok) {
      dispatch(getETransfersPaymentMethods());
      handleDeleteConfirmationClose();
    }
  };

  return (
    <>
      <Background onClick={handleDeleteConfirmationClose} />
      <Wrapper>
        <Statement>
          Are sure do you want to permanetly delete
          {' '}
          <span>{productName}</span>
          ?
        </Statement>
        <BtnsDiv>
          <div>
            <BtnNo
              onClick={() => {
                handleDeleteConfirmationClose();
              }}
            >
              No
            </BtnNo>
          </div>
          <div>
            <BtnYes
              onClick={() => {
                handleDeleteProduct();
              }}
            >
              Yes
            </BtnYes>
          </div>
        </BtnsDiv>
      </Wrapper>
    </>
  );
};

export default DeleteConfirmationModal;
