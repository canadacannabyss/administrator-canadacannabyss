import styled from 'styled-components';

export const ContainerBilling = styled.div`
  background: #fff;
  width: 100%;
  border-radius: 4px;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 4px, rgba(0, 0, 0, 0.15) 0px 0px 2px;
  @media(max-width: 991px) {
    margin: 20px 0;
    border-radius: 0px;
  }
`;

export const ContentContainer = styled.div`
  height: 100%;
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;
  padding: 10px 14px;
  
`;

export const Content = styled.div`
  width: 100%;
`;

export const Wrapper = styled.div`
  margin: 20px auto;
  width: 80%;
  @media (max-width: 991px) {
    width: 90%;
  }
`;

export const FirstNameDeleteBtnDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: baseline;
  justify-content: space-between;
`;

export const DeleteBtn = styled.button`
  background: transparent !important;
  border: none;
  padding: 0 !important;
  cursor: pointer;
  svg {
    color: #5a5a5a;
    transform: rotate(45deg);
    font-size: 20px;
  }
  &:hover {
    svg {
      color: #e41111;
    }
  }
  &:focus {
    outline: none;
  }
`;

export const TitleAddDiv = styled.div`
  font-size: 16px;
  margin-bottom: 0.5rem;
`;

export const Title = styled.h1`
  font-size: 16px;
  margin-bottom: 0.5rem;
`;

export const AddBtn = styled.button`
  font-size: 16px;
  padding: 4px 7px;
  color: #fff;
  background: #5a5a5a;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:focus {
    outline: none;
  }
`;

export const FlexDivBtns = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
`;

export const CloseBtn = styled.button`
  border: none;
  transform: rotate(45deg);
  font-size: 22px;
  background: transparent !important;
  cursor: pointer;
  svg {
    color: #5a5a5a;
  }
  &:focus {
    outline: none;
  }
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 15px;
  @media (max-width: 1199px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 540px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

export const Container = styled.div`
  background: #f1f1f1;
  border-radius: 4px;
  padding: 10px 12px;
  color: #5a5a5a;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 4px, rgba(0, 0, 0, 0.15) 0px 0px 2px;
  label {
    font-size: 14px;
    font-weight: 900;
  }
  p {
    margin-bottom: 0.5rem;
    font-size: 16px;
  }
`;

export const ContainerEdit = styled.div`
  background: #f1f1f1;
  border-radius: 4px;
  padding: 10px 12px;
  width: 300px;
  color: #5a5a5a;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 4px, rgba(0, 0, 0, 0.15) 0px 0px 2px;
  @media (max-width: 340px) {
    width: 100%;
  }
  label {
    font-size: 14px;
    font-weight: 900;
  }
  p {
    margin-bottom: 0.5rem;
    font-size: 16px;
  }
`;

export const SubmitButton = styled.button`
  background: #5a5a5a;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 10px;
  font-size: 16px;
  width: 100%;
  cursor: pointer;
  &:focus {
    outline: none;
  }
`;

export const InputEdit = styled.input`
  height: 35px;
  width: 100%;
  font-size: 16px;
  display: block;
  margin-bottom: 5px;
  padding-left: 12px;
  box-sizing: border-box;
  -webkit-letter-spacing: 0.04em;
  -moz-letter-spacing: 0.04em;
  -ms-letter-spacing: 0.04em;
  -webkit-letter-spacing: 0.04em;
  -moz-letter-spacing: 0.04em;
  -ms-letter-spacing: 0.04em;
  letter-spacing: 0.04em;
  border: 1px solid rgb(184, 196, 194);
  border-image: initial;
  border-radius: 4px;
  background: rgb(255, 255, 255);
  -webkit-transition: all 0.2s ease-in-out;
  transition: all 0.2s ease-in-out;
  &:focus {
    border-color: #5a5a5a;
    outline: none;
  }
  &::placeholder {
    color: 1px solid rgb(184, 196, 194);
  }
`;

export const SelectEdit = styled.select`
  height: 35px;
  width: 100%;
  font-size: 16px;
  display: block;
  margin-bottom: 5px;
  padding-left: 12px;
  box-sizing: border-box;
  -webkit-letter-spacing: 0.04em;
  -moz-letter-spacing: 0.04em;
  -ms-letter-spacing: 0.04em;
  -webkit-letter-spacing: 0.04em;
  -moz-letter-spacing: 0.04em;
  -ms-letter-spacing: 0.04em;
  letter-spacing: 0.04em;
  border: 1px solid rgb(184, 196, 194);
  border-image: initial;
  border-radius: 4px;
  background: rgb(255, 255, 255);
  -webkit-transition: all 0.2s ease-in-out;
  transition: all 0.2s ease-in-out;
  &:focus {
    border-color: #5a5a5a;
    outline: none;
  }
  &::placeholder {
    color: 1px solid rgb(184, 196, 194);
  }
`;

export const Warning = styled.div`
  border: 1px solid #d42626;
  border-radius: 3px;
  padding: 5px 10px;
  color: #d42626;
  font-size: 12px;
  margin: 7px auto;
  display: table;
  cursor: default;
  background: #d426260f;
  text-transform: uppercase;
`;
