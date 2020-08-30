import styled from 'styled-components';

export const Background = styled.div`
  display: block;
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 999;
`;

export const Wrapper = styled.div`
  position: fixed;
  width: 280px;
  padding: 12px 20px;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  z-index: 99999;
  border-radius: 4px;
  background-color: #fff;
  overflow-y: scroll;
  box-shadow: 0px 0px 7px 3px rgba(0, 0, 0, 0.2);
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const Statement = styled.p`
  color: #000;
  font-size: 14px;
  line-height: 1.15rem;
  margin-bottom: 1.5rem;
  text-align: center;
  span {
    color: #18840f;
    font-weight: 900;
  }
`;

export const BtnsDiv = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-around;
`;

export const BtnNo = styled.button`
  color: #ff0000;
  background: #ff00002b;
  border: none;
  border-radius: 5px;
  padding: 7px 10px;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.15s ease-in-out;
  &:hover {
    background: #ff000040;
  }
  &:active {
    background: #ff000054;
  }
  &:focus {
    outline: none;
  }
`;

export const BtnYes = styled.button`
  color: #18840f;
  background: #18840f33;
  border: none;
  border-radius: 5px;
  padding: 7px 10px;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.15s ease-in-out;
  &:hover {
    background: #18840f40;
  }
  &:active {
    background: #18840f54;
  }
  &:focus {
    outline: none;
  }
`;
