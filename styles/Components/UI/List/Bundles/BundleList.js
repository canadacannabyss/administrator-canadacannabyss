import styled from 'styled-components';

const List = styled.div`
  width: 100%;
  display: grid;
  grid-gap: 5px;
  border-radius: 4px;
  overflow-x: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const ListLiContent = styled.div`
  background: #efefef;
  border-radius: 4px;
  padding: 7px 10px;
  height: 35px;
  align-items: center;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  p {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .bundleName {
    width: 400px;
    @media (max-width: 1190px) {
      width: 300px;
    }
    @media (max-width: 991px) {
      width: 400px;
    }
    a {
      color: #18840f;
      font-weight: 900;
      text-decoration: none;
    }
  }
  .featured {
    display: flex;
    flex-direction: row;
    justify-self: center;
  } 
  .buttons {
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
  @media (max-width: 991px) {
    .price,
    .compareTo {
      width: 100px;
    }
    .createdOn,
    .updatedOn {
      width: 220px;
    }
    .featured {
      width: 100px;
    }
  }
  &::-webkit-scrollbar {
    display: none;
  }
`;

const EditLink = styled.a`
  background: #d1e6cf;
  padding: 6px 8px;
  border-radius: 4px;
  cursor: pointer;
  svg {
    color: #18840f;
  }
`;

const SpansDiv = styled.div`
  padding: 7px 10px;
  align-items: center;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  span {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 13px;
    color: #18840f;
    font-weight: 900;
  }
  .productName {
    width: 400px;
    @media (max-width: 1190px) {
      width: 300px;
    }
    @media (max-width: 991px) {
      width: 400px;
    }
    a {
      color: #18840f;
      font-weight: 900;
      text-decoration: none;
    }
  }
  .featured {
    display: flex;
    flex-direction: row;
    justify-self: center;
  } 
  .buttons {
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
  @media (max-width: 991px) {
    .price,
    .compareTo {
      width: 100px;
    }
    .createdOn,
    .updatedOn {
      width: 220px;
    }
    .featured {
      width: 100px;
    }
  }
  &::-webkit-scrollbar {
    display: none;
  }
`;

const DeleteButton = styled.button`
  background: #ffafaf;
  border-radius: 4px;
  border: none;
  padding: 6px 8px;
  cursor: pointer;
  &:focus {
    outline: none;
  }
  svg {
    color: #ec0000;
  }
`;

export {
  List,
  ListLiContent,
  EditLink,
  DeleteButton,
  SpansDiv
};
