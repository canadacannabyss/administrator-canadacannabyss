import styled from 'styled-components';

export const Container = styled.div`
  margin-bottom: 0.5rem;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 10px;
  width: 100%;
  @media (max-width: 1199px) {
    grid-gap: 5px;
  }
  @media (max-width: 768px) {
    grid-gap: 10px;
    grid-template-columns: repeat(1, 1fr);
  }
`;

export const CommentsWrapper = styled.div`
  margin: 40px 0;
`;

export const Wrapper = styled.a`
  margin-bottom: 0.5rem;
  padding: 10px 15px 10px 0px;
  box-shadow: 0px 1px 3px 1px transparent;
  border: 1px solid transparent;
  border-radius: 4px;
  transition: all 0.2s ease-in-out;
  cursor: pointer;
  &:hover {
    box-shadow: 0px 1px 3px 1px rgba(0, 0, 0, 0.2);
    padding: 10px 15px;
  }
`;

export const UserInfoWrapper = styled.div`
  height: 50px;
  width: 100%;
  ul {
    display: flex;
    flex-direction: row;
    padding-left: 0;
    .img-li {
      width: 35px;
    }
    .user-info {
      margin-left: 10px;
    }
    li {
      list-style: none;
    }
  }
`;

export const LinkToProfile = styled.a`
  &:hover {
    color: #333;
    text-decoration: none;
  }
`;

export const AuthorName = styled.b`
  color: #333;
  font-size: 15px;
`;

export const PostedOn = styled.p`
  color: #999;
  font-size: 13px;
  margin-bottom: 0;
  margin-top: 5px;
  transform: translateY(-5px);
`;

export const AuthorPicture = styled.img`
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  height: 37px;
  width: 37px;
  border-radius: 50px;
`;

export const Content = styled.p`
  font-size: 16px;
  line-height: 22px;
  word-break: break-all;
`;

export const CommentsTitle = styled.h4`
  font-size: 13px;
  text-transform: uppercase;
  color: #333;
  letter-spacing: 1px;
  font-weight: 900;
`;

export const LoadingComments = styled.h2`
  font-size: 16px;
  margin: 15px 0 20px 0;
`;

export const NoCommentsP = styled.p`
  font-size: 16px;
  margin: 20px 0;
`;

export const CommentedOn = styled.div`
  p {
    margin-bottom: 0.5rem;
    strong {
      color: #000;
      font-size: 14px;
    }
    span {
      font-size: 16px;
      color: #18840f;
      font-weight: 900;
    }
  }
`;
