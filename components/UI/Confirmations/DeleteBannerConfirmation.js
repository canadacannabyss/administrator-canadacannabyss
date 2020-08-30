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
    bannerId,
    bannerName,
    handleCloseDeleteConfirmation,
    handleGetNewBannersListOnDeletion,
  } = props;

  const handleDeleteConfirmationClose = () => {
    const close = handleCloseDeleteConfirmation;
    close();
  };

  const handleDeleteBanner = async () => {
    console.log('bannersId:', bannerId);
    const res = await fetch(
      `${process.env.MAIN_API_ENDPOINT}/admin/promotions/banners/delete/banner/${bannerId}`,
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
    handleGetNewBannersListOnDeletion(data);
    handleDeleteConfirmationClose();
  };

  return (
    <>
      <Background onClick={handleDeleteConfirmationClose} />
      <Wrapper>
        <Statement>
          Are sure do you want to permanetly delete <span>{bannerName}</span>?
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
                handleDeleteBanner();
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
