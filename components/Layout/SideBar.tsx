import React, { FC } from 'react';
import { Navbar } from 'reactstrap';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import classnames from 'classnames';

import ProfileCard from '../reusable/ProfileCard';
import useWindowSize from 'hooks/useWindowsSize';

type SideBarProps = {
  routerName: string;
};

const SideBar: FC<SideBarProps> = ({ routerName }) => {
  const isOpen = useSelector((state: any) => state.menuReducer.isOpen);
  const profile = useSelector((state: any) => state.profileReducer.profile);
  const {
    name,
    did,
  } = profile;

  const size = useWindowSize();

  const emptyProfile = !(name && did);

  return (
    <Navbar className={isOpen ? "sidebar" : "collapse_sidebar"} color="primary" light>
      
      
        {isOpen ? 
          (
            <div className="logos mt-2">
              <img
                className="logo d-block mx-auto pb-4"
                src="/assets/images/logo.png"
                alt=""
              />
            </div>
          )
          :
          (
            <div className="mt-2">
              <img
                className="logo d-block mx-auto pb-4"
                src="/assets/icon/logoSmall.svg"
                alt="" width={40}
              />
            </div>
          )
        }
      
      <hr />
      <Link href="/profile">
        <a className={routerName === '/profile' ? 'selected' : ''}>
          <div className="profile-card mt-2">
            <ProfileCard profile={profile} />
          </div>
        </a>
      </Link>
      <div className="menu mt-5">
        <ul className="pl-3">
          <Link href="/agreements">
            <li className={classnames('mb-4', { 'no-cursor': emptyProfile })}>
              <a className={routerName === '/agreements' ? 'selected' : ''}>
                <img className="mr-3" src="/assets/icon/list-log.svg" alt="" />
                {' '}
                Standard Agreements
              </a>
            </li>
          </Link>
          <Link href="/smart_agreements">
            <li className={classnames('mb-4', { 'no-cursor': emptyProfile })}>
              <a className={routerName === '/smart_agreements' ? 'selected' : ''}>
                <img className="mr-3" src="/assets/icon/smartAgreement.svg" alt="" />
                {' '}
                Smart Agreements
              </a>
            </li>
          </Link>
          <li className={classnames('mb-4', { 'no-cursor': emptyProfile })}>
            <img className="mr-3" src="/assets/icon/paid.svg" alt="" />
            {' '}
            1,458 PAID
          </li>
          <Link href="/binance_chain">
            <li className={classnames('mb-4', { 'no-cursor': emptyProfile })}>
              <a className={routerName === '/binance_chain' ? 'selected' : ''}>
                <img className="mr-3" src="/assets/icon/binanceSmartChain.svg" alt="" />
                Binance Smart Chain
              </a>
            </li>
          </Link>
        </ul>
      </div>

      <div className="menu-bottom mt-5 pt-5">
        <ul className="pl-3">
          
          <li className="mb-4 no-cursor">
            <a>
              <img className="mr-3" src="/assets/icon/networkBi.svg" alt="" />
              Network: RINKEBY
            </a>
          </li>
        </ul>
      </div>
    </Navbar>
  );
};

SideBar.propTypes = {
  routerName: PropTypes.string.isRequired,
};

export default SideBar;
