import styled from 'styled-components';

const Wrapper = styled.div`
  width: 1200px;
  margin: 0 auto;
  @media (max-width: 1460px) {
    width: 100%;
  }
`;

const Container = styled.div`
  background: #fff;
  width: 100%;
  border-radius: 4px;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 4px, rgba(0, 0, 0, 0.15) 0px 0px 2px;
  @media(max-width: 991px) {
    margin: 20px 0;
    border-radius: 0px;
  }
`;

const ContentContainer = styled.div`
  height: 100%;
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;
  padding: 10px 14px;
  
`;

const Content = styled.div`
  width: 100%;
`;

const TitleSearchBarAddButtonDiv = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 1rem;
  @media (max-width: 576px) {
    flex-direction: column;
    justify-content: flex-end;
  }
`;

const TitleDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  svg {
    margin-right: 10px;
    font-size: 22px;
    color: #18840f;
  }
  h1 {
    font-size: 20px;
    color: #18840f;
  }
  @media (max-width: 576px) {
    margin-bottom: 1rem;
  }
`;

const SearchBarAddButtonDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const SearchBar = styled.div`
  border-radius: 4px;
  border: 1px solid #18440f66;
  width: 100%;
  height: 40px;
  display: flex;
  flex-direction: row;
  -webkit-box-pack: end;
  justify-content: end;
  input {
    background: #fff;
    padding: 11px 4px 11px 16px;
    border: none;
    border-radius: 4px;
    font-size: 16px;
    width: 100%;
    &:focus {
      outline: none;
    }
  }
  button {
    border: none;
    background: #fff;
    padding: 4px 15px;
    color: #18840f;
    height: 100%;
    font-size: 16px;
    border-radius: 4px;
    cursor: pointer;
    &:focus {
      outline: none;
    }
    &:active {
      svg {
        transform: scale(0.9);
      }
    }
    svg {
      transition: all .1s ease-in-out;
    }
  }
`;

const AddProductLink = styled.a`
  background: #18840f;
  color: #fff;
  padding: 10px 10px 8px 10px;
  font-size: 16px;
  margin-left: 10px;
  align-self: center;
  border-radius: 4px;
  cursor: pointer;
  @media (max-width: 450px) {
    font-size: 15px;
  }
`;

const SpansDiv = styled.div`
  border-radius: 4px;
  padding: 7px 10px;
  height: 35px;
  align-items: center;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  span {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: #18840f;
    font-size: 14px;
    font-weight: 900;
  }
  .productNameSpan {
    width: 400px;
    @media (max-width: 1190px) {
      width: 300px;
    }
    @media (max-width: 991px) {
      width: 400px;
    }
  }
  .featuredSpan {
    display: flex;
    flex-direction: row;
    justify-self: center;
  } 
  .buttonsSpan {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 70px;
  }
  @media (max-width: 1199px) {
    display: grid;
    grid-gap: 10px;
    grid-template-columns: repeat(7, 1fr);
  }
  @media (max-width: 1199px) {
    width: 100%;
    display: grid;
    grid-gap: 5px;
    border-radius: 4px;
    overflow-x: scroll;
  }
  &::-webkit-scrollbar {
    display: none;
  }
`;

export {
  Wrapper,
  Container,
  SearchBarAddButtonDiv,
  TitleSearchBarAddButtonDiv,
  SearchBar,
  AddProductLink,
  TitleDiv,
  ContentContainer,
  Content,
  SpansDiv,
};
