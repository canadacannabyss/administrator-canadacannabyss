import styled from 'styled-components';

export const OrderBtn = styled.div`
  background: transparent;
  border: none;
  padding: 7px 10px;
  width: 100%;
  text-align: left;
  transition: all 0.2s ease-in-out;
  border-radius: 6px;
  border: 1px solid #18840f;
  box-shadow: 0px 0px 3px 1px rgba(0, 0, 0, 0.2);
  &:focus {
    outline: none;
  }
  &:hover {
    background: #f2f2f2;
  }
  .show {
    display: block;
  }
`;

export const EditBtn = styled.button`
  color: #18840f;
  font-size: 16px;
  background: transparent;
  border: none;
  border-radius: 3px;
  padding: 5px;
  float: right;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  &:focus {
    outline: none;
  }
  &:hover {
    background: #18840f30;
  }
  div {
    transform: rotate(45deg);
  }
`;

export const OrderDetailsDiv = styled.div`
  background: #fff;
  padding: 5px 7px;
  border-radius: 4px;
  margin-top: 7px;
  display: none;
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  @media (max-width: 768px) {
    grid-template-columns: unset;
  }
`;

export const OrderDetailsDateDiv = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const OrderDetailsUserDiv = styled.div`
  background: ${(props) => `url('${props.userImage}')`};
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  border-radius: 50px;
  height: 30px;
  width: 30px;
`;

export const OrderDetailsUserName = styled.p`
  color: #18840f;
  font-size: 16px;
`;

export const OrderId = styled.div`
  cursor: pointer;
  span {
    color: #000;
    font-size: 14px;
  }
  .id {
    color: #18840f;
    font-size: 18px;
    word-break: break-all;
  }
`;

export const OrderDate = styled.div`
  text-align: right;
  span {
    color: #000;
    font-size: 16px;
  }
`;

export const Label = styled.label`
  color: #18840f;
  font-size: 13px;
  font-weight: 900;
`;

export const OrderTotalPrice = styled.div`
  font-size: 16px;
`;

export const OrdersProducts = styled.div`
  margin-bottom: 0.5rem;
  display: grid;
  grid-template-columns: ${(props) => `repeat(${props.productsLength}, 140px)`};
  overflow-x: scroll;
  a {
    text-decoration: none;
  }
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const OrdersProductImg = styled.img`
  width: 70px;
  height: 70px;
`;

export const VariantName = styled.p`
  color: #18840f;
  font-size: 14px;
  strong {
    color: #18840f;
    font-size: 14px;
  }
`;

export const OrdersProductName = styled.h4`
  color: #18840f;
  font-size: 14px;
  width: 140px;
  word-wrap: break-word;
`;

export const Status = styled.p`
  font-size: 16px;
  margin-bottom: 0.5rem;
`;

export const Select = styled.select`
  font-size: 16px;
  margin-bottom: 0.5rem;
  background: #fff;
  border: none;
  &:focus {
    outline: none;
  }
`;

export const UserDiv = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const UserImageDiv = styled.div`
  border-radius: 50px;
  height: 35px;
  width: 35px;
  display: block;
  background: ${(props) => `url('${props.userImage}')`};
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
`;

export const UserName = styled.p`
  color: #000;
  font-size: 14px;
  margin-left: 7px;
  font-weight: 900;
`;
