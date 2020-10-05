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
import { getPostalServices } from '../../../store/actions/postalServices/postalServices';

const DeleteConfirmationModal = (props) => {
  const {
    postalServiceId,
    postalServiceName,
    handleCloseDeleteConfirmation
  } = props;

  const dispatch = useDispatch();

  const handleDeleteConfirmationClose = () => {
    const close = handleCloseDeleteConfirmation;
    close();
  };

  const handleDeleteCoupon = async () => {
    const res = await fetch(
      `${process.env.MAIN_API_ENDPOINT}/admin/postal-services/delete/postal-service/${postalServiceId}`,
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
    const data = await res.json();

    if (data.ok) {
      dispatch(getPostalServices());
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
          <span>{postalServiceName}</span>
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
