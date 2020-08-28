import React from 'react';
import Link from 'next/link';
import {
  Container,
  AuthorName,
  AuthorPicture,
  CommentsTitle,
  CommentsWrapper,
  Content,
  LinkToProfile,
  LoadingComments,
  NoCommentsP,
  PostedOn,
  UserInfoWrapper,
  CommentedOn,
  Wrapper,
  NotVerified
} from '../../../../../styles/Components/UI/List/Account/InvitedFriendsList/InvitedFriendsList';
import DateFormatter from '../../../../../utils/dateFormatter';

const InvitedFriendsList = (props) => {
  const { invitedFriends } = props;
  const formatter = new DateFormatter();

  return (
    <Container>
      {invitedFriends.length > 0 && (
        <>
          {invitedFriends.map((user) => (
            <Wrapper key={user._id}>
              <UserInfoWrapper>
                <ul>
                  <li className='img-li'>
                    <LinkToProfile>
                      <AuthorPicture src={user.profileImage.url} />
                    </LinkToProfile>
                  </li>
                  <li className='user-info'>
                    <LinkToProfile>
                      <AuthorName>
                        {user.names.firstName}
                        {' '}
                        {user.names.lastName}
                      </AuthorName>
                    </LinkToProfile>

                    <PostedOn>
                      {formatter.formatDateFullDate(user.createdOn)}
                    </PostedOn>
                    {!user.isVerified && (
                      <NotVerified>Not verified</NotVerified>
                    )}
                  </li>
                </ul>
              </UserInfoWrapper>
            </Wrapper>
          ))}
        </>
      )}
    </Container>
  );
};

export default InvitedFriendsList;
