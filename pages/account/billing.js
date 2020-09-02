import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import { useDispatch, connect } from 'react-redux';
import Head from 'next/head';
import { FaPlus } from 'react-icons/fa';
import { withAdminAuth } from '../../utils/withAdminAuth';
import ListLocation from '../../utils/listLocation';
import { getBillingAddresses } from '../../store/actions/billing/billingList';
import {
  Content,
  ContentContainer,
  ContainerBilling,
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
} from '../../styles/Pages/Account/Billing';
import { BackgroundAdd } from '../../styles/Components/UI/DefaultSidebarPage/DefaultSidebarPage';

const mapStateToProps = (state) => {
  const { user, billingList } = state;
  return {
    user,
    billingList
  };
};

const Billing = (props) => {
  const { user, billingList } = props;
  const dispatch = useDispatch();

  const listLocation = new ListLocation();

  const [toggleAdd, setToggleAdd] = useState(false);
  const [toggleEdit, setToggleEdit] = useState(false);
  const [warning, setWarning] = useState(false);
  const [warningText, setWarningText] = useState('');
  const [allFieldsFilled, setAllFieldsFilled] = useState(false);

  const [billingId, setBillingId] = useState('');
  const [billingFirstName, setBillingFirstName] = useState('');
  const [billingLastName, setBillingLastName] = useState('');
  const [billingCountry, setBillingCountry] = useState('');
  const [
    billingProvincesStatesList,
    setBillingProvincesStatesList
  ] = useState([]);
  const [billingProvinceState, setBillingProvinceState] = useState('');
  const [billingCitiesList, setBillingCitiesList] = useState([]);
  const [billingCity, setBillingCity] = useState('');
  const [billingAddressLine1, setBillingAddressLine1] = useState('');
  const [billingAddressLine2, setBillingAddressLine2] = useState('');
  const [billingPostalCode, setBillingPostalCode] = useState('');

  const emptyFields = () => {
    setBillingId('');
    setBillingFirstName('');
    setBillingLastName('');
    setBillingCountry('');
    setBillingProvinceState('');
    setBillingCity('');
    setBillingAddressLine1('');
    setBillingAddressLine2('');
    setBillingPostalCode('');
  };

  useEffect(() => {
    dispatch(getBillingAddresses(user.data._id));
  }, []);

  const disabledSubmitButton = () => {
    if (
      billingFirstName.length > 0 &&
      billingLastName.length > 0 &&
      billingCountry.length > 0 &&
      billingProvinceState.length > 0 &&
      billingCity.length > 0 &&
      billingAddressLine1.length > 0 &&
      billingAddressLine2.length > 0 &&
      billingPostalCode.length > 0
    ) {
      setAllFieldsFilled(true);
    } else {
      setAllFieldsFilled(false);
    }
  };

  useEffect(() => {
    disabledSubmitButton();
  }, [
    billingFirstName,
    billingLastName,
    billingCountry,
    billingProvinceState,
    billingCity,
    billingAddressLine1,
    billingAddressLine2,
    billingPostalCode
  ]);

  const onToggleAddBilling = () => {
    setToggleAdd(!toggleAdd);
    setToggleEdit(false);
    emptyFields();
  };

  const onToggleEditBilling = () => {
    setToggleEdit(!toggleEdit);
    setToggleAdd(false);
    emptyFields();
  };

  const handleBillingCountrySelect = async (e) => {
    if (e.target.value === 'CA') {
      setBillingCountry(e.target.value);
      setBillingProvincesStatesList(
        await listLocation.mapThroughtCanadaProvinces()
      );
    } else if (e.target.value === 'US') {
      setBillingCountry(e.target.value);
      // mapThroughtUnitedStateStates();
    } else if (e.target.value === '-') {
      setBillingCountry(e.target.value);
    }
  };

  const handleBillingProvinceStateSelect = async (e) => {
    setBillingProvinceState(e.target.value);
    if (e.target.value !== '-') {
      setBillingCitiesList(
        await listLocation.mapThroughtCanadaCities(e.target.value)
      );
    }
  };

  const handleBillingCitySelect = (e) => {
    setBillingCity(e.target.value);
  };

  const onEditBilling = (billing) => {
    setBillingId(billing._id);
    setBillingFirstName(billing.name.first);
    setBillingLastName(billing.name.last);
    setBillingAddressLine1(billing.addressLine1);
    setBillingAddressLine2(billing.addressLine2);
    setBillingPostalCode(billing.postalCode);
  };

  const onChangeFirstName = (e) => {
    setBillingFirstName(e.target.value);
  };

  const onChangeLastName = (e) => {
    setBillingLastName(e.target.value);
  };

  const onChangeAddressLine1 = (e) => {
    setBillingAddressLine1(e.target.value);
  };

  const onChangeAddressLine2 = (e) => {
    setBillingAddressLine2(e.target.value);
  };

  const onChangePostalCode = (e) => {
    setBillingPostalCode(e.target.value);
  };

  const fetchEditBilling = async (billingObj) => {
    const response = await fetch(
      `${process.env.MAIN_API_ENDPOINT}/customers/billing/edit/${billingObj._id}`,
      {
        method: 'PUT',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(billingObj)
      }
    );
    const data = await response.json();
    return data;
  };

  const fetchAddBilling = async (billingObj) => {
    const response = await fetch(
      `${process.env.MAIN_API_ENDPOINT}/customers/billing/create`,
      {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(billingObj)
      }
    );
    const data = await response.json();
    return data;
  };

  const fetchDeleteBilling = async (id) => {
    const response = await fetch(
      `${process.env.MAIN_API_ENDPOINT}/customers/billing/delete/${id}`,
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
      const billingObj = {
        id: billingId,
        name: {
          first: billingFirstName.toUpperCase(),
          last: billingLastName.toUpperCase()
        },
        country: billingCountry.toUpperCase(),
        provinceState: billingProvinceState.toUpperCase(),
        city: billingCity.toUpperCase(),
        addressLine1: billingAddressLine1.toUpperCase(),
        addressLine2: billingAddressLine2.toUpperCase(),
        postalCode: billingPostalCode.toUpperCase()
      };
      const edited = await fetchEditBilling(billingObj);
      if (edited.ok) {
        emptyFields();
        dispatch(getBillingAddresses(user.data._id));
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
      const billingObj = {
        user: user.data._id,
        id: billingId,
        name: {
          first: billingFirstName.toUpperCase(),
          last: billingLastName.toUpperCase()
        },
        country: billingCountry.toUpperCase(),
        provinceState: billingProvinceState.toUpperCase(),
        city: billingCity.toUpperCase(),
        addressLine1: billingAddressLine1.toUpperCase(),
        addressLine2: billingAddressLine2.toUpperCase(),
        postalCode: billingPostalCode.toUpperCase()
      };
      const added = await fetchAddBilling(billingObj);
      if (!_.isEmpty(added)) {
        emptyFields();
        dispatch(getBillingAddresses(user.data._id));
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

  const onDeleteBillingAddress = async (id) => {
    const deleted = await fetchDeleteBilling(id);
    if (deleted.ok) {
      dispatch(getBillingAddresses(user.data._id));
    }
  };

  return (
    <BackgroundAdd>
      <Head>
        <title>Billing | Account - Canada Cannabyss</title>
      </Head>
      <ContainerBilling>
        <ContentContainer>
          <Content>
            {toggleEdit ? (
              <Title>Edit Billing Address</Title>
            ) : (
              <>
                {toggleAdd ? (
                  <Title>Billing Addresses</Title>
                ) : (
                  <TitleAddDiv>
                    <Title>Billing Addresses</Title>
                    <AddBtn
                      onClick={() => {
                        onToggleAddBilling();
                      }}
                    >
                      Add Billing Address
                    </AddBtn>
                  </TitleAddDiv>
                )}
              </>
            )}
            {!_.isEmpty(billingList.data) &&
          !billingList.loading &&
          !billingList.errors &&
          billingList.fetched && (
            <>
              {toggleEdit && (
                <ContainerEdit>
                  <FirstNameDeleteBtnDiv>
                    <label>First Name</label>
                    <DeleteBtn
                      onClick={() => {
                        onToggleEditBilling();
                      }}
                    >
                      <FaPlus />
                    </DeleteBtn>
                  </FirstNameDeleteBtnDiv>
                  <InputEdit
                    onChange={onChangeFirstName}
                    value={billingFirstName}
                  />
                  <label>Last Name</label>
                  <InputEdit
                    onChange={onChangeLastName}
                    value={billingLastName}
                  />
                  <label>Country</label>
                  <SelectEdit
                    onChange={handleBillingCountrySelect}
                    value={billingCountry}
                    id='billing_country'
                  >
                    <option value='-'>CHOOSE COUNTRY</option>
                    <option value='CA'>CANADA</option>

                  </SelectEdit>
                  <label>Province / State</label>
                  <SelectEdit
                    onChange={handleBillingProvinceStateSelect}
                    value={billingProvinceState}
                    id='billing_province_state'
                  >
                    <option value='-'>PROVINCE/STATE</option>
                    {billingProvincesStatesList.map((province) => (
                      <option key={province.abbr} value={province.abbr}>
                        {province.name}
                      </option>
                    ))}
                  </SelectEdit>
                  <label>City</label>
                  <SelectEdit
                    onChange={handleBillingCitySelect}
                    value={billingCity}
                    id='billing_city'
                  >
                    <option value='-'>CITY</option>
                    {billingCitiesList.map((city) => (
                      <option key={city} value={city}>
                        {city}
                      </option>
                    ))}
                  </SelectEdit>
                  <label>Address Line 1</label>
                  <InputEdit
                    onChange={onChangeAddressLine1}
                    value={billingAddressLine1}
                  />
                  <label>Address Line 2</label>
                  <InputEdit
                    onChange={onChangeAddressLine2}
                    value={billingAddressLine2}
                  />
                  <label>Postal Code</label>
                  <InputEdit
                    onChange={onChangePostalCode}
                    value={billingPostalCode}
                  />
                  <SubmitButton
                    onClick={() => {
                      onSubmitEdit();
                      onToggleEditBilling();
                    }}
                  >
                    Done
                  </SubmitButton>
                </ContainerEdit>
              )}
            </>
            )}
            {!_.isEmpty(billingList.data) &&
          !billingList.loading &&
          !billingList.errors &&
          billingList.fetched &&
          !toggleEdit &&
          !toggleAdd && (
            <Grid>
              {billingList.data.map((billing) => (
                <Container>
                  <FirstNameDeleteBtnDiv>
                    <label>First Name</label>
                    <DeleteBtn
                      onClick={() => {
                        onDeleteBillingAddress(billing._id);
                      }}
                    >
                      <FaPlus />
                    </DeleteBtn>
                  </FirstNameDeleteBtnDiv>
                  <p>{billing.name.first}</p>
                  <label>Last Name</label>
                  <p>{billing.name.last}</p>
                  <label>Country</label>
                  <p>{billing.country}</p>
                  <label>Province / State</label>
                  <p>{billing.provinceState}</p>
                  <label>City</label>
                  <p>{billing.city}</p>
                  <label>Address Line 1</label>
                  <p>{billing.addressLine1}</p>
                  <label>Address Line 2</label>
                  <p>{billing.addressLine2}</p>
                  <label>Postal Code</label>
                  <p>{billing.postalCode}</p>
                  <SubmitButton
                    onClick={() => {
                      onToggleEditBilling();
                      onEditBilling(billing);
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
                    onToggleAddBilling();
                  }}
                >
                  <FaPlus />
                </DeleteBtn>
              </FirstNameDeleteBtnDiv>
              <InputEdit onChange={onChangeFirstName} value={billingFirstName} />
              <label>Last Name</label>
              <InputEdit onChange={onChangeLastName} value={billingLastName} />
              <label>Country</label>
              <SelectEdit
                onChange={handleBillingCountrySelect}
                value={billingCountry}
                id='billing_country'
              >
                <option value='-'>CHOOSE COUNTRY</option>
                <option value='CA'>CANADA</option>
              </SelectEdit>
              <label>Province / State</label>
              <SelectEdit
                onChange={handleBillingProvinceStateSelect}
                value={billingProvinceState}
                id='billing_province_state'
              >
                <option value='-'>PROVINCE/STATE</option>
                {billingProvincesStatesList.map((province) => (
                  <option key={province.abbr} value={province.abbr}>
                    {province.name}
                  </option>
                ))}
              </SelectEdit>
              <label>City</label>
              <SelectEdit
                onChange={handleBillingCitySelect}
                value={billingCity}
                id='billing_city'
              >
                <option value='-'>CITY</option>
                {billingCitiesList.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </SelectEdit>
              <label>Address Line 1</label>
              <InputEdit
                onChange={onChangeAddressLine1}
                value={billingAddressLine1}
              />
              <label>Address Line 2</label>
              <InputEdit
                onChange={onChangeAddressLine2}
                value={billingAddressLine2}
              />
              <label>Postal Code</label>
              <InputEdit
                onChange={onChangePostalCode}
                value={billingPostalCode}
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
      </ContainerBilling>
    </BackgroundAdd>
  );
};

export default withAdminAuth(connect(mapStateToProps)(Billing));
