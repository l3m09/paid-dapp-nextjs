import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { NextRouter, useRouter } from 'next/router';
import { Spinner } from 'reactstrap';

import SideBar from './SideBar';

import useWindowSize from '../../hooks/useWindowsSize';

const PrivateLayout: React.FC = ({ children }) => {
  const isOpen = useSelector((state: any) => state.menuReducer.isOpen);
  const size = useWindowSize();
  const router: NextRouter = useRouter();
  const currentWallet = useSelector((state: any) => state.walletReducer.currentWallet)

  useEffect(
    () => {
      if (!currentWallet) {
        router.push('/')
      }
    },
    [],
  )

  return (
    <>
      {
        currentWallet ? (
          <div className="layout d-flex">
            {
              (isOpen || size.width > 1024)
              && (
                <div className="sidebar d-inline-block">
                  <SideBar />
                </div>
              )
            }
            <div className="main-content container-fluid d-inline-block m-0 p-0">
              {children}
            </div>
          </div>
        ) : (
          <div className="layout d-flex justify-content-center align-items-center pt-5">
            <Spinner color="primary" />
          </div>
        )
      }
    </>
  )
};

PrivateLayout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};
PrivateLayout.defaultProps = {
  children: null,
};

export default PrivateLayout;
