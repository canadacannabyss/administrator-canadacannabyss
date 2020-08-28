import styled from 'styled-components';

export const Wrapper = styled.div`
  margin: 40px auto 20px auto;
  width: 80%;
  @media (max-width: 991px) {
    width: 90%;
  }
`;

export const ExtraInfoDiv = styled.div`
  border: 1px solid #18840f66;
  border-radius: 3px;
  box-shadow: 0px 2px 6px 1px rgba(0, 0, 0, 0.2);
  margin: 25px 0;
  padding: 10px 15px;
`;

export const Input = styled.input`
  height: 40px;
  width: 100%;
  font-size: 16px;
  display: block;
  margin: 5px 0;
  padding-left: 12px;
  box-sizing: border-box;
  -webkit-letter-spacing: 0.04em;
  -moz-letter-spacing: 0.04em;
  -ms-letter-spacing: 0.04em;
  letter-spacing: 0.04em;
  border: 1px solid rgb(184, 196, 194);
  border-image: initial;
  border-radius: 4px;
  background: rgb(255, 255, 255);
  transition: all 0.2s ease-in-out;
  &:focus {
    border-color: #18840f;
    outline: none;
  }
  &::placeholder {
    color: 1px solid rgb(184, 196, 194);
  }
`;

export const ButtonsDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  width: 70px;
  margin: 7px 0;
`;

export const AddFieldButton = styled.button`
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
  svg {
    color: #18840f;
    font-size: 14px;
  }
`;

export const RemoveFieldButton = styled.button`
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
  svg {
    color: #ff0000;
    font-size: 14px;
  }
`;

export const ExtraInfoFieldsDiv = styled.div`
  display: grid;
  /* grid-template-columns: 1fr 1fr;
  grid-gap: 8px; */
  width: 100%;
`;

export const ExtraInfoH2 = styled.h2`
  font-size: 16px;
  font-weight: 900;
  color: #18840f;
  margin-bottom: 0.5rem;
`;
