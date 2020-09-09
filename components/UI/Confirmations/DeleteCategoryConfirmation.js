import React from 'react';
import { useDispatch } from 'react-redux';
import {
  Background,
  Statement,
  Wrapper,
  BtnsDiv,
  BtnNo,
  BtnYes
} from '../../../styles/Components/UI/Confirmations/DeleteConfirmation';
import { getCategories } from '../../../store/actions/categories/categories';

const DeleteConfirmationModal = (props) => {
  const {
    categoryId,
    categoryName,
    handleCloseDeleteConfirmation,
    handleGetNewCategoryListOnDeletion
  } = props;

  const dispatch = useDispatch();

  const handleDeleteConfirmationClose = () => {
    const close = handleCloseDeleteConfirmation;
    close();
  };

  const handleDeleteCategory = async () => {
    const res = await fetch(
      `${process.env.MAIN_API_ENDPOINT}/admin/category/delete/category/${categoryId}`,
      {
        method: 'DELETE',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
    const data = await res.json();

    console.log('category data:', data);

    if (data.ok) {
      dispatch(getCategories());
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
          <span>{categoryName}</span>
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
