import React from 'react';
import Head from 'next/head';
import { NextRouter, useRouter } from 'next/router';

import { Button } from 'reactstrap';
import { useDispatch } from 'react-redux';
import doConnectToWallet from '../redux/actions/wallet';

const Index: React.FC = () => {
  const router: NextRouter = useRouter();
  const dispatch = useDispatch();

  const onConnect = () => {
    dispatch(doConnectToWallet(router));
  };

  return (
    <>
      <Head>
        <title>Paid-Dapp</title>
        <link rel="icon" href="/assets/icon/.ico" />
      </Head>
      <div className="index m-0 p-0 container-fluid">
        <div className="row h-100  justify-content-center align-items-center">
          <div className="col-12 text-center">
            <img
              className="logo d-block mx-auto pb-4"
              src="/assets/images/logo.png"
              alt=""
            />
            <Button color="danger" onClick={() => onConnect()}>
              Connect to Wallet
            </Button>
            <p className="info mt-4">
              By continuing you agree to our
              {' '}
              <span className="text-danger">T&#38;Cs</span>
              . We use your data to
              offer you a personalized experience.
              {' '}
              <span className="text-danger">Find out more</span>
              .
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Index;
