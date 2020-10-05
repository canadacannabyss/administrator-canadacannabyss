import Head from 'next/head';
import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { FaPen, FaShippingFast } from 'react-icons/fa';
import Router from 'next/router';
import { connect } from 'react-redux';
import _ from 'lodash';

import { BackgroundAdd } from '../../../styles/Components/UI/DefaultSidebarPage/DefaultSidebarPage';
import {
  StickyDiv,
  MainGrid,
  SubmitButton,
  Container,
  ContentContainer,
  Content,
  TitleSearchBarAddButtonDiv,
  TitleDiv,
  PlusIconSign,
  HalfGrid,
  Label,
  Input,
} from '../../../styles/Pages/Add/Product';
import { Wrapper } from '../../../styles/Pages/Banners/Banners';
import WithAuth from '../../../components/UI/withAuth/withAuth';

import { getPostalService } from '../../../store/actions/postalService/postalService';

const mapStateToProps = (state) => {
  const { user, postalService } = state;

  return {
    user,
    postalService,
  };
};

const EditPostalService = (props) => {
  const { user, postalService } = props;

  const [postalServiceName, setPostalServiceName] = useState('');

  const [allFieldsFilled, setAllFieldsFilled] = useState(false);

  useEffect(() => {
    if (
      !_.isEmpty(postalService.data) &&
      postalService.fetched &&
      !postalService.loading &&
      !postalService.error
    ) {
      setPostalServiceName(postalService.data.name);
    }
  }, [postalService]);

  const fetchValidatePostalServiceName = async () => {
    const res = await fetch(
      `${process.env.MAIN_API_ENDPOINT}/admin/postal-services/validate/postal-service/${postalServiceName}`,
      {
        method: 'GET',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    const data = await res.json();
    return data;
  };

  const fetchUpdatePostalService = async (postalServiceObj) => {
    const res = await fetch(
      `${process.env.MAIN_API_ENDPOINT}/admin/postal-services/edit`,
      {
        method: 'PUT',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postalServiceObj),
      }
    );
    const data = await res.json();
    return data;
  };

  const disabledSubmitButton = () => {
    if (postalServiceName.length > 0 && !_.isEmpty(user.data)) {
      setAllFieldsFilled(true);
    } else {
      setAllFieldsFilled(false);
    }
  };

  useEffect(() => {
    disabledSubmitButton();
  }, [postalServiceName, user]);

  const handleSubmit = async () => {
    disabledSubmitButton();
    if (allFieldsFilled) {
      const fetchedValidPostalServiceName = await fetchValidatePostalServiceName();
      console.log(
        'fetchedValidPostalServiceName:',
        fetchedValidPostalServiceName
      );
      if (fetchedValidPostalServiceName.ok) {
        const postalServiceObj = {
          id: postalService.data._id,
          postalServiceName,
        };
        const fetchedUpdatePostalService = await fetchUpdatePostalService(
          postalServiceObj
        );
        if (fetchedUpdatePostalService.ok === true) {
          Router.push('/postal-services');
        }
      }
    }
  };

  const handlePostalService = (e) => {
    setPostalServiceName(e.target.value);
  };

  return (
    <WithAuth>
      <Head>
        <title>Edit Postal Service | Administrator - Canada Cannabyss</title>
      </Head>
      <BackgroundAdd>
        <Wrapper>
          <MainGrid className='main'>
            <Container>
              <ContentContainer>
                <Content>
                  <TitleSearchBarAddButtonDiv>
                    <TitleDiv>
                      <PlusIconSign>
                        <FaShippingFast className='mainIcon' />
                        <FaPen className='plus' />
                      </PlusIconSign>
                      <h1>Edit Postal Service</h1>
                    </TitleDiv>
                  </TitleSearchBarAddButtonDiv>
                  <HalfGrid>
                    <div>
                      <Label>Postal Service</Label>
                      {!_.isEmpty(postalService.data) &&
                        postalService.fetched &&
                        !postalService.loading &&
                        !postalService.error && (
                          <Input
                            value={postalServiceName}
                            onChange={handlePostalService}
                          />
                        )}
                    </div>
                    <div />
                  </HalfGrid>
                </Content>
              </ContentContainer>
            </Container>
          </MainGrid>
          <StickyDiv />
        </Wrapper>
        <SubmitButton type='button' onClick={handleSubmit}>
          Update Postal Service
        </SubmitButton>
      </BackgroundAdd>
    </WithAuth>
  );
};

EditPostalService.propTypes = {
  user: PropTypes.shape().isRequired,
  postalService: PropTypes.shape().isRequired,
};

EditPostalService.getInitialProps = async ({ ctx }) => {
  const { store, asPath } = ctx;

  const slug = asPath.substring(21, asPath.length);

  console.log('slug:', slug);

  store.dispatch(getPostalService(slug));
};

export default connect(mapStateToProps)(EditPostalService);
