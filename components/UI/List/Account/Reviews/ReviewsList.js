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
  Wrapper
} from '../../../../../styles/Components/UI/List/Account/Reviews/ReviewsList';
import DateFormatter from '../../../../../utils/dateFormatter';

const ReviewsList = (props) => {
  const { reviews } = props;
  const formatter = new DateFormatter();

  return (
    <Container>
      {reviews.commentsProduct.length > 0 && (
        <>
          {reviews.commentsProduct.map((review) => (
            <Link href='/product/[slug]' as={`/product/${review.product.slug}`}>
              <Wrapper key={review._id}>
                <UserInfoWrapper>
                  <ul>
                    <li className='img-li'>
                      <LinkToProfile>
                        <AuthorPicture src={review.user.profileImage.url} />
                      </LinkToProfile>
                    </li>
                    <li className='user-info'>
                      <LinkToProfile>
                        <AuthorName>
                          {review.user.names.firstName}
                          {' '}
                          {review.user.names.lastName}
                        </AuthorName>
                      </LinkToProfile>

                      <PostedOn>
                        {formatter.formatDateFullDate(review.publishedOn)}
                      </PostedOn>
                    </li>
                  </ul>
                </UserInfoWrapper>
                <Content>{review.content}</Content>
                <CommentedOn>
                  <p>
                    <strong>Reviewed on:</strong>
                    {' '}
                    <span>{review.product.productName}</span>
                  </p>
                </CommentedOn>
              </Wrapper>
            </Link>
          ))}
        </>
      )}
      {reviews.commentsBundle.length > 0 && (
        <>
          {reviews.commentsBundle.map((review) => (
            <Link href='/bundle/[slug]' as={`/bundle/${review.bundle.slug}`}>
              <Wrapper key={review._id}>
                <UserInfoWrapper>
                  <ul>
                    <li className='img-li'>
                      <LinkToProfile>
                        <AuthorPicture src={review.user.profileImage.url} />
                      </LinkToProfile>
                    </li>
                    <li className='user-info'>
                      <LinkToProfile>
                        <AuthorName>
                          {review.user.names.firstName}
                          {' '}
                          {review.user.names.lastName}
                        </AuthorName>
                      </LinkToProfile>

                      <PostedOn>
                        {formatter.formatDateFullDate(review.publishedOn)}
                      </PostedOn>
                    </li>
                  </ul>
                </UserInfoWrapper>
                <Content>{review.content}</Content>
                <CommentedOn>
                  <p>
                    <strong>Reviewed on:</strong>
                    {' '}
                    <span>{review.bundle.bundleName}</span>
                  </p>
                </CommentedOn>
              </Wrapper>
            </Link>
          ))}
        </>
      )}
    </Container>
  );
};

export default ReviewsList;
