import React from 'react';
import PropTypes from 'prop-types';
import { Editor } from '@tinymce/tinymce-react';
import {
  Container,
  ContentContainer,
  TitleSearchBarAddButtonDiv,
  TitleDiv,
  Content,
  PlusIconSign,
  Label,
  Input,
  HalfGrid
} from '../../../../styles/Pages/Add/Product';
import FeaturedCheckbox from '../../Buttons/Checkbox/Featured';

const ResellerDetails = (props) => {
  const {
    MainIcon,
    PlusIcon,
    title,
    resellerFirstName,
    onChangeResellerFirstName,
    resellerLastName,
    onChangeResellerLastName,
    resellerUsername,
    onChangeResellerUsername,
    resellerEmail,
    onChangeResellerEmail,
    resellerPhone,
    onChangeResellerPhone
  } = props;

  return (
    <Container>
      <ContentContainer>
        <Content>
          <TitleSearchBarAddButtonDiv>
            <TitleDiv>
              <PlusIconSign>
                {MainIcon}
                {PlusIcon}
              </PlusIconSign>
              <h1>{title}</h1>
            </TitleDiv>
          </TitleSearchBarAddButtonDiv>
          <HalfGrid>
            <div>
              <Label htmlFor='firstName'>First Name</Label>
              <Input
                id='firstName'
                type='text'
                autoComplete='off'
                onChange={onChangeResellerFirstName}
                value={resellerFirstName}
              />
            </div>
            <div>
              <Label htmlFor='lastName'>Last Name</Label>
              <Input
                id='lastName'
                type='text'
                autoComplete='off'
                onChange={onChangeResellerLastName}
                value={resellerLastName}
              />
            </div>
          </HalfGrid>
          <br />
          <HalfGrid>
            <div>
              <Label htmlFor='username'>Username</Label>
              <Input
                id='username'
                type='text'
                autoComplete='off'
                onChange={onChangeResellerUsername}
                value={resellerUsername}
              />
            </div>
            <div>
              <Label htmlFor='email'>Email</Label>
              <Input
                id='email'
                type='email'
                autoComplete='off'
                onChange={onChangeResellerEmail}
                value={resellerEmail}
              />
            </div>
          </HalfGrid>
          <br />
          <HalfGrid>
            <div>
              <Label htmlFor='phone'>Phone</Label>
              <Input
                id='phone'
                type='text'
                autoComplete='off'
                onChange={onChangeResellerPhone}
                value={resellerPhone}
              />
            </div>
            <div />
          </HalfGrid>
        </Content>
      </ContentContainer>
    </Container>
  );
};

ResellerDetails.propTypes = {
  MainIcon: PropTypes.element.isRequired,
  PlusIcon: PropTypes.element.isRequired,
  title: PropTypes.string.isRequired,
  resellerFirstName: PropTypes.string.isRequired
};

export default ResellerDetails;
