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
import { getBundles } from '../../../store/actions/bundles/bundles';

const DeleteConfirmationModal = (props) => {
  const {
    bundleId,
    bundleName,
    handleCloseDeleteConfirmation
  } = props;

  const dispatch = useDispatch();

  const handleDeleteConfirmationClose = () => {
    const close = handleCloseDeleteConfirmation;
    close();
  };

  const handleDeleteBundle = async () => {
    const deleteRes = await fetch(
      `${process.env.MAIN_API_ENDPOINT}/admin/bundles/delete/bundle/${bundleId}`,
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
    const data = await deleteRes.json();

    if (data.ok) {
      dispatch(getBundles());
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
          <span>{bundleName}</span>
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
                handleDeleteBundle();
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
