import styled from 'styled-components';

const Container = styled.div`
  background: #fff;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 4px, rgba(0, 0, 0, 0.15) 0px 0px 2px;
  padding: 15px 20px;
  border-radius: 4px;
  @media (max-width: 991px) {
    margin: 20px 0;
    border-radius: 0px;
  }
`;

const Title = styled.h1`
  font-size: 18px;
  color: #18840f;
`;

const UserFlex = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 1rem; 
  @media (max-width: 460px) {
    flex-direction: column;
    margin-bottom: 0;
  }
`;

const UserDiv = styled.div`
  margin: 15px 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  @media (max-width: 460px) {
    margin: 2rem 0 1rem 0;
    flex-direction: column;
  }
`;

const User = styled.div`
  height: 80px;
  width: 80px;
  background-image: ${(props) => `url('${props.img}')`};
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  border-radius: 50px;
`;

const ResellerInfo = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: center;
  margin-left: 10px;
`;

const ResellerName = styled.h2`
  font-size: 20px;
  margin-bottom: 0.5rem;
`;

const JoinDate = styled.p`
  font-size: 15px;
  color: #777777;
`;

const CreditDiv = styled.div`
  display: flex;
  align-items: center;
`;

const Credit = styled.p`
  font-size: 16px;
  font-weight: 900;
  span {
    color: #18840f;
    margin-left: 5px;
    font-size: 20px;
  }
  @media (max-width: 460px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    margin: 0 auto;
    #colon {
      display: none;
    }
    span {
      margin: 0;
    }
  }
`;

const MenusGrid = styled.div`
  display: grid;
  grid-gap: 25px;
  grid-template-columns: repeat(5, 1fr);
  @media (max-width: 1199px) {
    grid-template-columns: repeat(4, 1fr);
  }
  @media (max-width: 991px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media (max-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 460px) {
    margin-top: 2.5rem;
    grid-gap: 15px;
    grid-template-columns: repeat(1, 1fr);
  }
`;

const Menu = styled.div`
  border-radius: 2px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.15), 0px 0px 2px rgba(0, 0, 0, 0.15);
  padding: 22px 26px;
  height: 200px;
  @media (max-width: 460px) {
    height: unset;
  }
  h3 {
    font-size: 18px;
    color: #000;
    font-weight: 900;
    margin-bottom: 1rem;
  }
  ul {
    li {
      list-style: none;
      margin-bottom: 0.7rem;
      .disabled {
        padding: 4px 0px;
        text-decoration: none;
        color: #5a5a5a;
      }
      a {
        padding: 4px 0px;
        text-decoration: none;
        color: #18840f;
        font-size: 16px;
      }
    }
  }
`;

export {
  Container,
  Title,
  UserFlex,
  UserDiv,
  User,
  ResellerInfo,
  ResellerName,
  JoinDate,
  CreditDiv,
  Credit,
  MenusGrid,
  Menu,
};
