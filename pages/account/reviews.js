import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Head from 'next/head';
import _ from 'lodash';
import { FaSpinner, FaSadTear } from 'react-icons/fa';
import {
  Wrapper, Title, Container, ContentContainer, Content
} from '../../styles/Pages/Account/Reviews';
import { BackgroundAdd } from '../../styles/Components/UI/DefaultSidebarPage/DefaultSidebarPage';

import ReviewsList from '../../components/UI/List/Account/Reviews/ReviewsList';
import WithAuth from '../../components/UI/withAuth/withAuth';

const mapStateToProps = (state) => {
  const { user } = state;
  return {
    user
  };
};

const Reviews = (props) => {
  const { user } = props;

  const [reviews, setReviews] = useState([]);

  const fetchAllUserReviews = async () => {
    const response = await fetch(
      `${process.env.MAIN_API_ENDPOINT}/customers/comments/user/${user.data._id}`,
      {
        method: 'GET',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
    const data = await response.json();
    setReviews(data);
  };

  useEffect(() => {
    fetchAllUserReviews();
  }, []);

  return (
    <WithAuth>
      <BackgroundAdd>
        <Head>
          <title>Reviews | Reseller - Canada Cannabyss</title>
        </Head>
        <Container>
          <ContentContainer>
            <Content>
              <Title>Reviews</Title>
              {!_.isEmpty(reviews) && <ReviewsList reviews={reviews} />}
            </Content>
          </ContentContainer>
        </Container>
      </BackgroundAdd>
    </WithAuth>
  );
};

export default connect(mapStateToProps)(Reviews);
