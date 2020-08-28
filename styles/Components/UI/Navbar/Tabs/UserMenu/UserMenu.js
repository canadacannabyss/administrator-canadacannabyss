import styled from 'styled-components';

const Container = styled.div`
  width: 150px;
  border-radius: 4px;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 4px, rgba(0, 0, 0, 0.15) 0px 0px 2px;
  position: absolute;
  right: 10px;
  top: 75px;
  background: #fff;
  overflow: hidden;
`;

const LinkTo = styled.a`
  font-size: 15px;
  padding: 9px 10px;
  display: block;
  background: #fff;
  padding-left: 15px;
  border-left: 4px solid rgba(0, 0, 0, 0.2);
  cursor: pointer;
  transition: all .2s ease-in-out;
  &:hover {
    background: #18840f33;
    border-left: 4px solid #18840f66;
    color: #18840f;
  }
`;

const SignOut = styled.button`
  font-size: 15px;
  padding: 9px 10px;
  display: block;
  background: #fff;
  padding-left: 15px;
  border-left: 4px solid rgba(0, 0, 0, 0.2);
  cursor: pointer;
  transition: all .2s ease-in-out;
  border-right: none;
  border-top: none;
  border-bottom: none;
  width: 100%;
  text-align: left;
  &:focus {
    outline: none;
  }
  &:hover {
    background: #18840f33;
    border-left: 4px solid #18840f66;
    color: #18840f;
  }
`;

export {
  Container,
  LinkTo,
  SignOut,
};
