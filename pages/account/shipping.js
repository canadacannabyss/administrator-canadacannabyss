import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import { useDispatch, connect } from 'react-redux';
import Head from 'next/head';
import { FaPlus } from 'react-icons/fa';
import { withAdminAuth } from '../../utils/withAdminAuth';
import ListLocation from '../../utils/listLocation';
import { getShippingAddresses } from '../../store/actions/shipping/shippingList';
import {
  Content,
  ContentContainer,
  ContainerShipping,
  Wrapper,
  Grid,
  Container,
  SubmitButton,
  ContainerEdit,
  InputEdit,
  SelectEdit,
  Title,
  FlexDivBtns,
  CloseBtn,
  AddBtn,
  TitleAddDiv,
  FirstNameDeleteBtnDiv,
  DeleteBtn,
  Warning
} from '../../styles/Pages/Account/Shipping';
import { BackgroundAdd } from '../../styles/Components/UI/DefaultSidebarPage/DefaultSidebarPage';

const mapStateToProps = (state) => {
  const { user, shippingList } = state;
  return {
    user,
    shippingList
  };
};

const Shipping = (props) => {
  const { user, shippingList } = props;
  const dispatch = useDispatch();

  const listLocation = new ListLocation();

  const [toggleAdd, setToggleAdd] = useState(false);
  const [toggleEdit, setToggleEdit] = useState(false);
  const [warning, setWarning] = useState(false);
  const [warningText, setWarningText] = useState('');
  const [allFieldsFilled, setAllFieldsFilled] = useState(false);

  const [shippingId, setShippingId] = useState('');
  const [shippingFirstName, setShippingFirstName] = useState('');
  const [shippingLastName, setShippingLastName] = useState('');
  const [shippingCountry, setShippingCountry] = useState('');
  const [
    shippingProvincesStatesList,
    setShippingProvincesStatesList
  ] = useState([]);
  const [shippingProvinceState, setShippingProvinceState] = useState('');
  const [shippingCitiesList, setShippingCitiesList] = useState([]);
  const [shippingCity, setShippingCity] = useState('');
  const [shippingAddressLine1, setShippingAddressLine1] = useState('');
  const [shippingAddressLine2, setShippingAddressLine2] = useState('');
  const [shippingPostalCode, setShippingPostalCode] = useState('');

  const emptyFields = () => {
    setShippingId('');
    setShippingFirstName('');
    setShippingLastName('');
    setShippingCountry('');
    setShippingProvinceState('');
    setShippingCity('');
    setShippingAddressLine1('');
    setShippingAddressLine2('');
    setShippingPostalCode('');
  };

  useEffect(() => {
    dispatch(getShippingAddresses(user.data._id));
  }, []);

  const disabledSubmitButton = () => {
    if (
      shippingFirstName.length > 0 &&
      shippingLastName.length > 0 &&
      shippingCountry.length > 0 &&
      shippingProvinceState.length > 0 &&
      shippingCity.length > 0 &&
      shippingAddressLine1.length > 0 &&
      shippingAddressLine2.length > 0 &&
      shippingPostalCode.length > 0
    ) {
      setAllFieldsFilled(true);
    } else {
      setAllFieldsFilled(false);
    }
  };

  useEffect(() => {
    disabledSubmitButton();
  }, [
    shippingFirstName,
    shippingLastName,
    shippingCountry,
    shippingProvinceState,
    shippingCity,
    shippingAddressLine1,
    shippingAddressLine2,
    shippingPostalCode
  ]);

  const onToggleAddShipping = () => {
    setToggleAdd(!toggleAdd);
    setToggleEdit(false);
    emptyFields();
  };

  const onToggleEditShipping = () => {
    setToggleEdit(!toggleEdit);
    setToggleAdd(false);
    emptyFields();
  };

  const handleShippingCountrySelect = async (e) => {
    if (e.target.value === 'CA') {
      setShippingCountry(e.target.value);
      setShippingProvincesStatesList(
        await listLocation.mapThroughtCanadaProvinces()
      );
    } else if (e.target.value === 'US') {
      setShippingCountry(e.target.value);
      // mapThroughtUnitedStateStates();
    } else if (e.target.value === '-') {
      setShippingCountry(e.target.value);
    }
  };

  const handleShippingProvinceStateSelect = async (e) => {
    setShippingProvinceState(e.target.value);
    if (e.target.value !== '-') {
      setShippingCitiesList(
        await listLocation.mapThroughtCanadaCities(e.target.value)
      );
    }
  };

  const handleShippingCitySelect = (e) => {
    setShippingCity(e.target.value);
  };

  const onEditShipping = (shipping) => {
    setShippingId(shipping._id);
    setShippingFirstName(shipping.name.first);
    setShippingLastName(shipping.name.last);
    setShippingAddressLine1(shipping.addressLine1);
    setShippingAddressLine2(shipping.addressLine2);
    setShippingPostalCode(shipping.postalCode);
  };

  const onChangeFirstName = (e) => {
    setShippingFirstName(e.target.value);
  };

  const onChangeLastName = (e) => {
    setShippingLastName(e.target.value);
  };

  const onChangeAddressLine1 = (e) => {
    setShippingAddressLine1(e.target.value);
  };

  const onChangeAddressLine2 = (e) => {
    setShippingAddressLine2(e.target.value);
  };

  const onChangePostalCode = (e) => {
    setShippingPostalCode(e.target.value);
  };

  const fetchEditShipping = async (shippingObj) => {
    const response = await fetch(
      `${process.env.MAIN_API_ENDPOINT}/customers/shipping/edit/${shippingObj._id}`,
      {
        method: 'PUT',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(shippingObj)
      }
    );
    const data = await response.json();
    return data;
  };

  const fetchAddShipping = async (shippingObj) => {
    const response = await fetch(
      `${process.env.MAIN_API_ENDPOINT}/customers/shipping/create`,
      {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(shippingObj)
      }
    );
    const data = await response.json();
    return data;
  };

  const fetchDeleteShipping = async (id) => {
    const response = await fetch(
      `${process.env.MAIN_API_ENDPOINT}/customers/shipping/delete/${id}`,
      {
        method: 'DELETE',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
    const data = await response.json();
    return data;
  };

  const onSubmitEdit = async () => {
    disabledSubmitButton();
    if (allFieldsFilled) {
      const shippingObj = {
        id: shippingId,
        name: {
          first: shippingFirstName.toUpperCase(),
          last: shippingLastName.toUpperCase()
        },
        country: shippingCountry.toUpperCase(),
        provinceState: shippingProvinceState.toUpperCase(),
        city: shippingCity.toUpperCase(),
        addressLine1: shippingAddressLine1.toUpperCase(),
        addressLine2: shippingAddressLine2.toUpperCase(),
        postalCode: shippingPostalCode.toUpperCase()
      };
      const edited = await fetchEditShipping(shippingObj);
      if (edited.ok) {
        emptyFields();
        dispatch(getShippingAddresses(user.data._id));
        setWarning(false);
        setWarningText('');
        setToggleEdit(false);
      } else {
        setWarning(true);
        setWarningText(edited.errors);
      }
    } else {
      setWarning(true);
      setWarningText('All fields must be filled');
    }
  };

  const onSubmitAdd = async () => {
    disabledSubmitButton();
    if (allFieldsFilled) {
      const shippingObj = {
        user: user.data._id,
        id: shippingId,
        name: {
          first: shippingFirstName.toUpperCase(),
          last: shippingLastName.toUpperCase()
        },
        country: shippingCountry.toUpperCase(),
        provinceState: shippingProvinceState.toUpperCase(),
        city: shippingCity.toUpperCase(),
        addressLine1: shippingAddressLine1.toUpperCase(),
        addressLine2: shippingAddressLine2.toUpperCase(),
        postalCode: shippingPostalCode.toUpperCase()
      };
      const added = await fetchAddShipping(shippingObj);
      console.log('added:', added);
      if (!_.isEmpty(added)) {
        emptyFields();
        dispatch(getShippingAddresses(user.data._id));
        setWarning(false);
        setWarningText('');
        setToggleAdd(false);
      } else {
        setWarning(true);
        setWarningText(added.errors);
      }
    } else {
      setWarning(true);
      setWarningText('All fields must be filled');
    }
  };

  const onDeleteShippingAddress = async (id) => {
    const deleted = await fetchDeleteShipping(id);
    if (deleted.ok) {
      dispatch(getShippingAddresses(user.data._id));
    }
  };

  return (
    <BackgroundAdd>
      <Head>
        <title>Shipping | Account - Canada Cannabyss</title>
      </Head>
      <ContainerShipping>
        <ContentContainer>
          <Content>
            {toggleEdit ? (
              <Title>Edit Shipping Address</Title>
            ) : (
              <>
                {toggleAdd ? (
                  <Title>Shipping Addresses</Title>
                ) : (
                  <TitleAddDiv>
                    <Title>Shipping Addresses</Title>
                    <AddBtn
                      onClick={() => {
                        onToggleAddShipping();
                      }}
                    >
                      Add Shipping Address
                    </AddBtn>
                  </TitleAddDiv>
                )}
              </>
            )}
            {!_.isEmpty(shippingList.data) &&
          !shippingList.loading &&
          !shippingList.errors &&
          shippingList.fetched && (
            <>
              {toggleEdit && (
                <ContainerEdit>
                  <FirstNameDeleteBtnDiv>
                    <label>First Name</label>
                    <DeleteBtn
                      onClick={() => {
                        onToggleEditShipping();
                      }}
                    >
                      <FaPlus />
                    </DeleteBtn>
                  </FirstNameDeleteBtnDiv>
                  <InputEdit
                    onChange={onChangeFirstName}
                    value={shippingFirstName}
                  />
                  <label>Last Name</label>
                  <InputEdit
                    onChange={onChangeLastName}
                    value={shippingLastName}
                  />
                  <label>Country</label>
                  <SelectEdit
                    onChange={handleShippingCountrySelect}
                    value={shippingCountry}
                    id='shipping_country'
                  >
                    <option value='-'>CHOOSE COUNTRY</option>
                    <option value='CA'>CANADA</option>
                    {/* <option value="US">UNITED STATES</option> */}
                  </SelectEdit>
                  <label>Province / State</label>
                  <SelectEdit
                    onChange={handleShippingProvinceStateSelect}
                    value={shippingProvinceState}
                    id='shipping_province_state'
                  >
                    <option value='-'>PROVINCE/STATE</option>
                    {shippingProvincesStatesList.map((province) => (
                      <option key={province.abbr} value={province.abbr}>
                        {province.name}
                      </option>
                    ))}
                  </SelectEdit>
                  <label>City</label>
                  <SelectEdit
                    onChange={handleShippingCitySelect}
                    value={shippingCity}
                    id='shipping_city'
                  >
                    <option value='-'>CITY</option>
                    {shippingCitiesList.map((city) => (
                      <option key={city} value={city}>
                        {city}
                      </option>
                    ))}
                  </SelectEdit>
                  <label>Address Line 1</label>
                  <InputEdit
                    onChange={onChangeAddressLine1}
                    value={shippingAddressLine1}
                  />
                  <label>Address Line 2</label>
                  <InputEdit
                    onChange={onChangeAddressLine2}
                    value={shippingAddressLine2}
                  />
                  <label>Postal Code</label>
                  <InputEdit
                    onChange={onChangePostalCode}
                    value={shippingPostalCode}
                  />
                  <SubmitButton
                    onClick={() => {
                      onSubmitEdit();
                      onToggleEditShipping();
                    }}
                  >
                    Done
                  </SubmitButton>
                </ContainerEdit>
              )}
            </>
            )}
            {!_.isEmpty(shippingList.data) &&
          !shippingList.loading &&
          !shippingList.errors &&
          shippingList.fetched &&
          !toggleEdit &&
          !toggleAdd && (
            <Grid>
              {shippingList.data.map((shipping) => (
                <Container>
                  <FirstNameDeleteBtnDiv>
                    <label>First Name</label>
                    <DeleteBtn
                      onClick={() => {
                        onDeleteShippingAddress(shipping._id);
                      }}
                    >
                      <FaPlus />
                    </DeleteBtn>
                  </FirstNameDeleteBtnDiv>
                  <p>{shipping.name.first}</p>
                  <label>Last Name</label>
                  <p>{shipping.name.last}</p>
                  <label>Country</label>
                  <p>{shipping.country}</p>
                  <label>Province / State</label>
                  <p>{shipping.provinceState}</p>
                  <label>City</label>
                  <p>{shipping.city}</p>
                  <label>Address Line 1</label>
                  <p>{shipping.addressLine1}</p>
                  <label>Address Line 2</label>
                  <p>{shipping.addressLine2}</p>
                  <label>Postal Code</label>
                  <p>{shipping.postalCode}</p>
                  <SubmitButton
                    onClick={() => {
                      onToggleEditShipping();
                      onEditShipping(shipping);
                    }}
                  >
                    Edit
                  </SubmitButton>
                </Container>
              ))}
            </Grid>
            )}
            {toggleAdd && (
            <ContainerEdit>
              <FirstNameDeleteBtnDiv>
                <label>First Name</label>
                <DeleteBtn
                  onClick={() => {
                    onToggleAddShipping();
                  }}
                >
                  <FaPlus />
                </DeleteBtn>
              </FirstNameDeleteBtnDiv>
              <InputEdit onChange={onChangeFirstName} value={shippingFirstName} />
              <label>Last Name</label>
              <InputEdit onChange={onChangeLastName} value={shippingLastName} />
              <label>Country</label>
              <SelectEdit
                onChange={handleShippingCountrySelect}
                value={shippingCountry}
                id='shipping_country'
              >
                <option value='-'>CHOOSE COUNTRY</option>
                <option value='CA'>CANADA</option>
                {/* <option value="US">UNITED STATES</option> */}
              </SelectEdit>
              <label>Province / State</label>
              <SelectEdit
                onChange={handleShippingProvinceStateSelect}
                value={shippingProvinceState}
                id='shipping_province_state'
              >
                <option value='-'>PROVINCE/STATE</option>
                {shippingProvincesStatesList.map((province) => (
                  <option key={province.abbr} value={province.abbr}>
                    {province.name}
                  </option>
                ))}
              </SelectEdit>
              <label>City</label>
              <SelectEdit
                onChange={handleShippingCitySelect}
                value={shippingCity}
                id='shipping_city'
              >
                <option value='-'>CITY</option>
                {shippingCitiesList.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </SelectEdit>
              <label>Address Line 1</label>
              <InputEdit
                onChange={onChangeAddressLine1}
                value={shippingAddressLine1}
              />
              <label>Address Line 2</label>
              <InputEdit
                onChange={onChangeAddressLine2}
                value={shippingAddressLine2}
              />
              <label>Postal Code</label>
              <InputEdit
                onChange={onChangePostalCode}
                value={shippingPostalCode}
              />
              <SubmitButton
                onClick={() => {
                  onSubmitAdd();
                }}
              >
                Add
              </SubmitButton>
              {warning && <Warning>{warningText}</Warning>}
            </ContainerEdit>
            )}
          </Content>
        </ContentContainer>
      </ContainerShipping>
    </BackgroundAdd>
  );
};

export default withAdminAuth(connect(mapStateToProps)(Shipping));
