import React, { useState } from 'react';
import Head from 'next/head';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Container,
  BrandDiv,
  Form,
  Label,
  Input,
  Submit,
  BlurredBackground,
  Warning
} from '../../styles/Pages/Login/Login';
import Logo from '../../assets/img/canada-cannabyss-logo.svg';
import BackgroundImg from '../../assets/img/bg-create-reseller.jpg';
import { BackgroundLogin } from '../../styles/Components/UI/DefaultSidebarPage/DefaultSidebarPage';
import IsCanadaCannabyssTeamCheckbox from '../../components/UI/Buttons/Checkbox/IsCanadaCannabyssTeam';
import WithAuth from '../../components/UI/withAuth/withAuth';

const mapStateToProps = (state) => {
  const { user } = state;

  return {
    user
  };
};

const Reseller = (props) => {
  const { user } = props;
  const [email, setEmail] = useState('');
  // const [isCanadaCannabyssTeam, setIsCanadaCannabyssTeam] = useState(false);
  const [isCanadaCannabyssTeam, setIsCanadaCannabyssTeam] = useState(true);
  const [sentTo, setSentTo] = useState('');
  const [data, setData] = useState({});
  const [fetched, setFetched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [warning, setWarning] = useState(false);
  const [warningMsg, setWarningMsg] = useState([]);

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleNewResellerUser = async (resellerUserObj) => {
    console.log('resellerUserObj:', resellerUserObj);
    let response;
    if (isCanadaCannabyssTeam) {
      response = await fetch(
        `${process.env.USER_API_ENDPOINT}/admin/auth/register/main/reseller/start`,
        {
          method: 'POST',
          mode: 'cors',
          cache: 'no-cache',
          credentials: 'same-origin',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(resellerUserObj)
        }
      );
    } else {
      response = await fetch(
        `${process.env.USER_API_ENDPOINT}/admin/auth/register/reseller/start`,
        {
          method: 'POST',
          mode: 'cors',
          cache: 'no-cache',
          credentials: 'same-origin',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(resellerUserObj)
        }
      );
    }
    const data = await response.json();
    console.log('data:', data);
    if (Array.isArray(data)) {
      const msgs = [];
      data.map((msg) => {
        msgs.push(msg.msg);
      });
      setWarningMsg(msgs);
      setWarning(true);
    } else {
      setData(data);
      setFetched(true);
      setWarningMsg('');
      setWarning(false);
      setSentTo(email);
    }
    setLoading(false);
  };

  const handleCheckCanadaCannabyssTeam = () => {
    // setIsCanadaCannabyssTeam(!isCanadaCannabyssTeam);
  };

  const onSubmitNewResellerUser = (e) => {
    setLoading(true);
    setWarning(false);
    setFetched(false);
    e.preventDefault();
    const resellerUserObj = {
      email,
      createdBy: user.data._id
    };
    console.log('resellerUserObj:', resellerUserObj);
    handleNewResellerUser(resellerUserObj);

    setEmail('');
  };

  return (
    <WithAuth>
      <Head>
        <title>Login | Administrator - Canada Cannabyss</title>
      </Head>
      <BackgroundLogin>
        <BlurredBackground bgImg={BackgroundImg}>
          <div />
        </BlurredBackground>
        <Container>
          <Form onSubmit={onSubmitNewResellerUser}>
            <BrandDiv>
              <img src={Logo} alt='Canada Cannabyss' />
              <div className='sep' />
              <h1>Add Reseller</h1>
            </BrandDiv>
            <Label htmlFor='email'>Email</Label>
            <Input type='email' id='email' value={email} onChange={onChangeEmail} />
            <br />
            <IsCanadaCannabyssTeamCheckbox
              handleCheckCanadaCannabyssTeam={handleCheckCanadaCannabyssTeam}
              isCanadaCannabyssTeam={isCanadaCannabyssTeam}
            />
            {warning && <Warning>{warningMsg}</Warning>}
            <Submit type='submit'>Create Reseller</Submit>
          </Form>
        </Container>
      </BackgroundLogin>
    </WithAuth>
  );
};

Reseller.propTypes = {
  user: PropTypes.shape({
    data: PropTypes.shape().isRequired,
    loading: PropTypes.bool.isRequired,
    fetched: PropTypes.bool.isRequired,
    error: PropTypes.bool.isRequired
  }).isRequired
};

export default connect(mapStateToProps)(Reseller);
