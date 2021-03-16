import React, { FC } from 'react';
import { Navbar } from 'reactstrap';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import classnames from 'classnames';

import ProfileCard from '../reusable/ProfileCard';

type SideBarProps = {
  routerName: string;
};

const SideBar: FC<SideBarProps> = ({ routerName }) => {
  const profile = useSelector((state: any) => state.profileReducer.profile);
  const {
    firstName,
    lastName,
    email,
  } = profile;

  const emptyProfile = !(firstName && lastName && email);

  return (
    <Navbar className="sidebar" color="primary" light>
      <div className="logos mt-2">
        <img
          className="logo d-block mx-auto pb-4"
          src="/assets/images/logo.png"
          alt=""
        />
      </div>
      <hr />
      <div className="profile-card mt-2">
        <ProfileCard profile={profile} />
      </div>
      <div className="menu mt-5">
        <ul className="pl-3">
          <li className={classnames('mb-4', { 'no-cursor': emptyProfile })}>
            <img className="mr-3" src="/assets/icon/home.svg" alt="" />
            {' '}
            Dashboard
          </li>
          <li className={classnames('mb-4', { 'no-cursor': emptyProfile })}>
            <img className="mr-3" src="/assets/icon/referral.svg" alt="" />
            {' '}
            Referrals
          </li>
          <li className={classnames('mb-4', { 'no-cursor': emptyProfile })}>
            <img className="mr-3" src="/assets/icon/account.svg" alt="" />
            {' '}
            Account
          </li>
          <li className={classnames('mb-4', { 'no-cursor': emptyProfile })}>
            <img className="mr-3" src="/assets/icon/audit.svg" alt="" />
            {' '}
            Audit
            &#38; Dispute
          </li>
          <li className={classnames('mb-4', { 'no-cursor': emptyProfile })}>
            <Link href="/profile">
              <span
                className={`${
                  routerName.includes('profile') ? 'selected' : ''
                }`}
              >
                <img className="mr-3" src="/assets/icon/profile.svg" alt="" />
                Profile
              </span>
            </Link>
          </li>
          <li className={classnames('mb-4', { 'no-cursor': emptyProfile })}>
            <img className="mr-3" src="/assets/icon/setting.svg" alt="" />
            Setting
          </li>
        </ul>
      </div>

      <div className="menu mt-5 pt-5">
        <ul className="pl-3">
          <li className={classnames('mb-4', { 'no-cursor': emptyProfile })}>
            <img className="mr-3" src="/assets/icon/paid.svg" alt="" />
            {' '}
            1,458
            PAID
          </li>
          <li className={classnames('mb-4', { 'no-cursor': emptyProfile })}>
            <Link href={emptyProfile ? '/profile' : '/agreements'}>
              <span
                className={`${
                  routerName.includes('agreements') ? 'selected' : ''
                }`}
              >
                <img className="mr-3" src="/assets/icon/list-log.svg" alt="" />
                Smart Agreements Log
              </span>
            </Link>
          </li>
          <li className={classnames('mb-4', { 'no-cursor': emptyProfile })}>
            <img className="mr-3" src="/assets/icon/wallets.svg" alt="" />
            {' '}
            Wallets
          </li>
          <li className="mb-4 no-cursor">
            <img className="mr-3" src="/assets/icon/profile.svg" alt="" />
            Network: RINKEBY
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
