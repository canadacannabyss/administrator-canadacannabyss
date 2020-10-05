import _ from 'lodash';
import Head from 'next/head';
import Router from 'next/router';
import React, { useEffect, useState, useRef } from 'react';
import { FaBox, FaPen, FaSpinner, FaUser } from 'react-icons/fa';
import { connect } from 'react-redux';
import slugify from 'slugify';
import PropTypes from 'prop-types';
import {
  categoriesArrayToString,
  tagsArrayToString,
} from '../../../utils/arrayMethods';
import {
  slugifyString,
  categoriesToArray,
  tagsToArray,
  editCategoriesToArray,
  editTagsToArray,
} from '../../../utils/stringMethods';
import {
  Container,
  ContentContainer,
  TitleSearchBarAddButtonDiv,
  TitleDiv,
  Content,
  PlusIconSign,
  Label,
  Input,
  Wrapper,
  MainGrid,
  AddProductLink,
  HalfGrid,
  SubmitButton,
  Warning,
  Required,
  RequiredDescription,
} from '../../../styles/Pages/Add/Product';
import { getReseller } from '../../../store/actions/reseller/reseller';
import Media from '../../../components/UI/Edit/Media/Media';
import ItemNameDescription from '../../../components/UI/Edit/ItemNameDescription/ItemNameDescription';
import Pricing from '../../../components/UI/Edit/Pricing/Pricing';
import ExtraInfo from '../../../components/UI/Edit/ExtraInfo/ExtraInfo';
import Inventory from '../../../components/UI/Edit/Inventory/Inventory';
import Organization from '../../../components/UI/Edit/Organization/Organization';
import SEO from '../../../components/UI/Edit/SEO/SEO';
import Shipping from '../../../components/UI/Edit/Shipping/Shipping';
import Variants from '../../../components/UI/Edit/Variants/Variants';
import { BackgroundAdd } from '../../../styles/Components/UI/DefaultSidebarPage/DefaultSidebarPage';
import ResellerDetails from '../../../components/UI/Edit/ResellerDetails/ResellerDetails';
import WithAuth from '../../../components/UI/withAuth/withAuth';

const mapStateToProps = (state) => {
  const { reseller } = state;

  return {
    reseller,
  };
};

const EditReseller = (props) => {
  const { reseller } = props;

  const [allFieldsFilled, setAllFieldsFilled] = useState(false);
  const [warning, setWarning] = useState(false);

  const [id, setId] = useState('');

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  useEffect(() => {
    if (
      !_.isEmpty(reseller.data) &&
      reseller.fetched &&
      !reseller.loading &&
      !reseller.error
    ) {
      setId(reseller.data._id);
      setFirstName(reseller.data.names.firstName);
      setLastName(reseller.data.names.lastName);
      setUsername(reseller.data.username);
      setEmail(reseller.data.email);
      setPhone(reseller.data.phone);
    }
  }, [reseller]);

  const onChangeResellerFirstName = (e) => {
    setFirstName(e.target.value);
  };

  const onChangeResellerLastName = (e) => {
    setLastName(e.target.value);
  };

  const onChangeResellerUsername = (e) => {
    setUsername(e.target.value);
  };

  const onChangeResellerEmail = (e) => {
    setEmail(e.target.value);
  };

  const editReseller = async (resellerObj) => {
    const response = await fetch(
      `${process.env.USER_API_ENDPOINT}/admin/resellers/update/${id}`,
      {
        method: 'PUT',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(resellerObj),
      }
    );
    const data = await response.json();
    return data;
  };

  const onChangeResellerPhone = (e) => {
    setPhone(e.target.value);
  };

  const disabledSubmitButton = () => {
    if (
      id.length > 0 &&
      firstName.length > 0 &&
      lastName.length > 0 &&
      username.length > 0 &&
      email.length > 0
    ) {
      setAllFieldsFilled(true);
    } else {
      setAllFieldsFilled(false);
    }
  };

  useEffect(() => {
    disabledSubmitButton();
  }, [id, firstName, lastName, username, email, phone]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (allFieldsFilled) {
      const resellerObj = {
        names: {
          firstName,
          lastName,
        },
        username,
        email,
        phone,
      };
      const res = await editReseller(resellerObj);
      console.log('res:', res);
      if (res.ok) {
        await Router.push('/resellers');
      }
    } else {
      setWarning(true);
    }
  };

  return (
    <WithAuth>
      <Head>
        <title>Reseller | Administrator - Canada Cannabyss</title>
      </Head>
      <BackgroundAdd>
        <Wrapper>
          <MainGrid className='main'>
            <ResellerDetails
              MainIcon={<FaUser className='mainIcon' />}
              PlusIcon={<FaPen className='plus' />}
              title='Edit Reseller'
              itemName='Banner Name'
              resellerFirstName={firstName}
              onChangeResellerFirstName={onChangeResellerFirstName}
              resellerLastName={lastName}
              onChangeResellerLastName={onChangeResellerLastName}
              resellerUsername={username}
              onChangeResellerUsername={onChangeResellerUsername}
              resellerEmail={email}
              onChangeResellerEmail={onChangeResellerEmail}
              resellerPhone={phone}
              onChangeResellerPhone={onChangeResellerPhone}
            />
          </MainGrid>
        </Wrapper>
        {warning && <Warning>Fill all fields before submit</Warning>}
        <SubmitButton type='button' onClick={handleSubmit}>
          Update Product
        </SubmitButton>
      </BackgroundAdd>
    </WithAuth>
  );
};

EditReseller.getInitialProps = async ({ ctx }) => {
  const { asPath, store, isServer } = ctx;

  const username = asPath.substring(15, asPath.length);
  console.log('username:', username);
  store.dispatch(getReseller(username));
  return { isServer };
};

EditReseller.propTypes = {
  reseller: PropTypes.shape().isRequired,
};

export default connect(mapStateToProps)(EditReseller);
