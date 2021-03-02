import React from 'react';
import Head from 'next/head';

import { useDispatch, useSelector } from 'react-redux';

import setOpenMenu from '../redux/actions/menu';

const Agreements: React.FC = () => {
  const isOpen = useSelector((state: any) => state.menuReducer.isOpen);
  const dispatch = useDispatch();

  return (
    <>
      <Head>
        <title>Paid-Dapp Agreeements</title>
        <link rel="icon" href="/assets/icon/.ico" />
      </Head>
      <div className="agreements m-0 p-0 container-fluid p-0 m-0">
        <div className="header">
          <span
            tabIndex={0}
            role="button"
            onClick={() => dispatch(setOpenMenu(!isOpen))}
            onKeyDown={() => dispatch(setOpenMenu(!isOpen))}
          >
            <img
              className="d-inline mr-5"
              src="/assets/icon/hamburguer.svg"
              alt=""
            />
          </span>

          <h5 className="d-inline">Agreements </h5>
        </div>
      </div>
    </>
  );
};

export default Agreements;
