import Head from 'next/head';
import { NextPage } from 'next';
import React, { FC, SFC } from 'react';

const Home = (props) => {
  const { repos } = props;

  return (
    <div>
      <Head>
        <title>Homepage</title>
      </Head>
      <h1>Homepage</h1>
      <h3>Repos:</h3>
      <ul>
        {repos.map((repo) => (
          <li>{repo.name}</li>
        ))}
      </ul>
    </div>
  );
};

Home.getInitialProps = async () => {
  const repos = await fetch('https://api.github.com/users/Davi-Silva/repos');

  const data = await repos.json();
  return {
    repos: data,
  };
};

export default Home;
