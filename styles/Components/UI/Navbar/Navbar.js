import styled from 'styled-components';

const Navbar = styled.nav`
  height: 64px;
  width: 100%;
  background: #fff;
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.25);
`;

const NavbarWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-content: center;
  height: 100%;
  align-items: center;
  justify-content: space-between;
`;

const Brand = styled.a`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-left: 5px;
  cursor: pointer;
  img {
    height: 45px;
    width: 45px;
  }
  p {
    color: rgb(24, 132, 15);
    line-height: 15px;
    span {
      color: #b01129;
      font-weight: 900;
    }
  }
  .sep {
    content: '';
    background-color: #b01129;
    width: 2px;
    height: 18px;
    display: block;
    position: relative;
    margin: 0 6px 0 12px;
  }
  h1 {
    font-size: 20px;
    color: #b01129;
  }
  @media (max-width: 578px) {
    p {
      display: none;
    }
  }
`;
const UserDiv = styled.div`
  margin-right: 5px;
  display: flex;
  height: 100%;
  align-items: center;
`;

const User = styled.div`
  cursor: pointer;
  width: 40px;
  height: 40px;
  background-image: ${(props) => `url('${props.img}')`};
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
  border-radius: 50px;
`;

const LoginLink = styled.a`
  color: #18840f;
  background: #18840f33;
  border: 1px solid #18840f66;
  padding: 7px 12px;
  margin-right: 5px;
  border-radius: 4px;
  cursor: pointer;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 4px, rgba(0, 0, 0, 0.15) 0px 0px 2px;
`;

export { Navbar, NavbarWrapper, Brand, UserDiv, User, LoginLink };
