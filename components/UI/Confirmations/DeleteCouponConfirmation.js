import React from 'react';
import { FaFacebookF, FaGoogle } from 'react-icons/fa';
import {
  Background,
  Statement,
  Wrapper,
  BtnsDiv,
  BtnNo,
  BtnYes,
} from '../../../styles/Components/UI/Confirmations/DeleteConfirmation';

const DeleteConfirmationModal = (props) => {
  const {
    couponId,
    couponName,
    handleCloseDeleteConfirmation,
    handleGetNewCouponsListOnDeletion,
  } = props;

  const handleDeleteConfirmationClose = () => {
    const close = handleCloseDeleteConfirmation;
    close();
  };

  const handleDeleteCoupon = async () => {
    console.log('clicked');
    const res = await fetch(
      `${process.env.MAIN_API_ENDPOINT}/admin/coupons/delete/coupon/${couponId}`,
      {
        method: 'DELETE',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    const data = await res.json();
    handleGetNewCouponsListOnDeletion(data);
    handleDeleteConfirmationClose();
  };

  return (
    <>
      <Background onClick={handleDeleteConfirmationClose} />
      <Wrapper>
        <Statement>
          Are sure do you want to permanetly delete <span>{couponName}</span>?
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
                handleDeleteCoupon();
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
