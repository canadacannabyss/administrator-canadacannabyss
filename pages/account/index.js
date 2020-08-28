import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Background } from '../../styles/Components/UI/DefaultSidebarPage/DefaultSidebarPage';
import { withAdminAuth } from '../../utils/withAdminAuth';
import DateFormatter from '../../utils/dateFormatter';
import {
  Container,
  Title,
  UserDiv,
  User,
  ResellerName,
  UserFlex,
  ResellerInfo,
  JoinDate,
  CreditDiv,
  Credit,
  MenusGrid,
  Menu
} from '../../styles/Pages/Account/Account';

const mapStateToProps = (state) => {
  const { user } = state;

  return {
    user
  };
};

const Account = (props) => {
  const { user } = props;

  const dateFormatter = new DateFormatter();

  return (
    <>
      <Head>
        <title>Account | Reseller - Canada Cannabyss</title>
      </Head>
      <Background>
        <Container>
          <Title>Account</Title>
          <UserFlex>
            <UserDiv>
              <User
                img={user.data.profileImage.url}
              />
              <ResellerInfo>
                <ResellerName>{`${user.data.names.firstName} ${user.data.names.lastName}`}</ResellerName>
                <JoinDate>
                  {`Since ${dateFormatter.formatDateFullDate(user.data.createdOn)}`}
                </JoinDate>
              </ResellerInfo>
            </UserDiv>
            <CreditDiv>
              <Credit>
                Credits
                <span id='colon'>:</span>
                <span>{user.data.credits}</span>
              </Credit>
            </CreditDiv>
          </UserFlex>
          <MenusGrid>
            <Menu>
              <h3>Billings & Shipping</h3>
              <ul>
                <li>
                  <Link href='/account/billing' as='/account/billing'>
                    <a>Billing List</a>
                  </Link>
                </li>
                <li>
                  <Link href='/account/shipping' as='/account/shipping'>
                    <a>Shipping List</a>
                  </Link>
                </li>
              </ul>
            </Menu>
            <Menu>
              <h3>Payments</h3>
              <ul>
                <li>
                  {/* <Link
                  href='/account/payment/credit-card'
                  as='/account/credit-card'
                > */}
                  <a className='disabled'>Credit Card</a>
                  {/* </Link> */}
                </li>
                <li>
                  {/* <Link href='/account/payment/cryptocurrency' as='/account/payment/cryptocurrency'> */}
                  <a className='disabled'>Cryptocurrency</a>
                  {/* </Link> */}
                </li>
                <li>
                  {/* <Link href='/account/payment/e-transfer' as='/account/payment/e-transfer'> */}
                  <a className='disabled'>e-Tranfer</a>
                  {/* </Link> */}
                </li>
              </ul>
            </Menu>
            <Menu>
              <h3>Orders</h3>
              <ul>
                <li>
                  <Link href='/account/orders' as='/account/orders'>
                    <a>Orders</a>
                  </Link>
                </li>
                <li>
                  {/* <Link href='/account/returns' as='/account/returns'> */}
                  <a className='disabled'>Returns</a>
                  {/* </Link> */}
                </li>
              </ul>
            </Menu>
            <Menu>
              <h3>Miscellaneous</h3>
              <ul>
                <li>
                  <Link href='/account/reviews' as='/account/reviews'>
                    <a>Reviews</a>
                  </Link>
                </li>
                <li>
                  <Link href='/account/invite' as='/account/invite'>
                    <a>Invite friend</a>
                  </Link>
                </li>
              </ul>
            </Menu>
            <Menu>
              <h3>Support</h3>
              <ul>
                <li>
                  {/* <Link href='/account/orders' as='/account/orders'> */}
                  <a className='disabled'>Message support</a>
                  {/* </Link> */}
                </li>
              </ul>
            </Menu>
          </MenusGrid>
        </Container>
      </Background>
    </>
  );
};

Account.propTypes = {
  user: PropTypes.shape({
    data: PropTypes.shape().isRequired,
    loading: PropTypes.bool.isRequired,
    error: PropTypes.bool.isRequired
  }).isRequired
};

export default withAdminAuth(connect(mapStateToProps)(Account));
