import React from 'react';
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
    categoryId,
    categoryName,
    handleCloseDeleteConfirmation,
    handleGetNewCategoryListOnDeletion,
  } = props;

  const handleDeleteConfirmationClose = () => {
    const close = handleCloseDeleteConfirmation;
    close();
  };

  const handleDeleteCategory = async () => {
    console.log('clicked');
    const res = await fetch(
      `${process.env.MAIN_API_ENDPOINT}/admin/category/delete/category/${categoryId}`,
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
    handleGetNewCategoryListOnDeletion(data);
    handleDeleteConfirmationClose();
  };

  return (
    <>
      <Background onClick={handleDeleteConfirmationClose} />
      <Wrapper>
        <Statement>
          Are sure do you want to permanetly delete <span>{categoryName}</span>?
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
                handleDeleteCategory();
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
