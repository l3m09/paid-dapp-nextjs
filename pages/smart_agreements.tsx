import React from 'react';
import Head from 'next/head';
import { useDispatch, useSelector } from 'react-redux';
import setOpenMenu from '../redux/actions/menu';

const SmartAgreements: React.FC = () => {

  const dispatch = useDispatch();
  const isOpen = useSelector((state: any) => state.menuReducer.isOpen);

  return (
    <>
      <Head>
        <title>Paid-Dapp Smart Agreeements</title>
        <link rel="icon" href="/assets/icon/.ico" />
      </Head>
      <div className="agreements m-0 p-0 px-4 container-fluid">
        <div className="row m-0 p-0 h-100">
          <div className="col-12 py-4 d-flex">
            
            <span
              tabIndex={0}
              className="d-flex"
              role="button"
              onClick={() => dispatch(setOpenMenu(!isOpen))}
              onKeyDown={() => dispatch(setOpenMenu(!isOpen))}
            >
              <img
                className="d-inline mr-5 hambunguer"
                src="/assets/icon/hamburguer.svg"
                alt=""
              />
            </span>
            <h3 className="d-flex mr-auto">Coming soon</h3>
          </div>
        </div>
      </div>
    </>
  )
}

export default SmartAgreements;