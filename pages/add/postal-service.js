import Head from 'next/head';
import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { FaPlus, FaShippingFast } from 'react-icons/fa';
import Router from 'next/router';
import { connect } from 'react-redux';
import _ from 'lodash';

import { BackgroundAdd } from '../../styles/Components/UI/DefaultSidebarPage/DefaultSidebarPage';
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
  Required,
  RequiredDescription
} from '../../styles/Pages/Add/Product';
import {
  Wrapper
} from '../../styles/Pages/Banners/Banners';
import WithAuth from '../../components/UI/withAuth/withAuth';

const mapStateToProps = (state) => {
  const { user } = state;

  return {
    user
  };
};

const AddPostalService = (props) => {
  const { user } = props;

  const [postalService, setPostalService] = useState('');
  const [trackingWebsite, setTrackingWebsite] = useState('');

  const [allFieldsFilled, setAllFieldsFilled] = useState(false);

  const fetchValidatePostalServiceName = async () => {
    const res = await fetch(
      `${process.env.MAIN_API_ENDPOINT}/admin/postal-services/validate/postal-service/${postalService}`,
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
    const data = await res.json();
    return data;
  };

  const fetchCreatePostalService = async (postalServiceObj) => {
    const res = await fetch(
      `${process.env.MAIN_API_ENDPOINT}/admin/postal-services/create`,
      {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(postalServiceObj)
      }
    );
    const data = await res.json();
    return data;
  };

  const disabledSubmitButton = () => {
    if (
      postalService.length > 0 &&
      trackingWebsite.length > 0 &&
      !_.isEmpty(user.data)
    ) {
      setAllFieldsFilled(true);
    } else {
      setAllFieldsFilled(false);
    }
  };

  useEffect(() => {
    disabledSubmitButton();
  }, [
    postalService,
    user,
    trackingWebsite
  ]);

  const handleSubmit = async () => {
    disabledSubmitButton();
    if (allFieldsFilled) {
      const fetchedValidPostalServiceName = await fetchValidatePostalServiceName();
      console.log('fetchedValidPostalServiceName:', fetchedValidPostalServiceName);
      if (fetchedValidPostalServiceName.ok) {
        const postalServiceObj = {
          admin: user.data._id,
          postalServiceName: postalService,
          trackingWebsite
        };
        const fetchedCreatedPostalService = await fetchCreatePostalService(postalServiceObj);
        if (fetchedCreatedPostalService.ok === true) {
          Router.push('/postal-services');
        }
      }
    }
  };

  const handlePostalService = (e) => {
    setPostalService(e.target.value);
  };

  const handleTrackingWebsite = (e) => {
    setTrackingWebsite(e.target.value);
  };

  return (
    <WithAuth>
      <Head>
        <title>Add Postal Service | Administrator - Canada Cannabyss</title>
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
                        <FaPlus className='plus' />
                      </PlusIconSign>
                      <h1>Add Postal Service</h1>
                    </TitleDiv>
                  </TitleSearchBarAddButtonDiv>
                  <RequiredDescription>
                    <span>*</span>
                    {' '}
                    - Required
                  </RequiredDescription>
                  <HalfGrid>
                    <div>
                      <Label>Postal Service</Label>
                      <Required>*</Required>
                      <Input value={postalService} onChange={handlePostalService} />
                    </div>
                    <div>
                      <Label>Tracking Website</Label>
                      <Required>*</Required>
                      <Input value={trackingWebsite} onChange={handleTrackingWebsite} />
                    </div>
                  </HalfGrid>
                </Content>
              </ContentContainer>
            </Container>
          </MainGrid>
          <StickyDiv />
        </Wrapper>
        <SubmitButton type='button' onClick={handleSubmit}>
          Add Postal Service
        </SubmitButton>
      </BackgroundAdd>

    </WithAuth>
  );
};

AddPostalService.propTypes = {
  user: PropTypes.shape().isRequired
};

export default connect(mapStateToProps)(AddPostalService);
