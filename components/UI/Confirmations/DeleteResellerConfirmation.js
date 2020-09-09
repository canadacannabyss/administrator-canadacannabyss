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
import { getResellers } from '../../../store/actions/resellers/resellers';

const DeleteConfirmationModal = (props) => {
  const {
    resellerId,
    resellerName,
    handleCloseDeleteConfirmation
  } = props;

  const dispatch = useDispatch();

  const handleDeleteConfirmationClose = () => {
    const close = handleCloseDeleteConfirmation;
    close();
  };

  const handleDeleteReseller = async () => {
    const res = await fetch(
      `${process.env.USER_API_ENDPOINT}/admin/resellers/delete/reseller/${resellerId}`,
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

    console.log('delete reseller res:', data);

    if (data.ok) {
      dispatch(getResellers());
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
          <span>{resellerName}</span>
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
                handleDeleteReseller();
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
