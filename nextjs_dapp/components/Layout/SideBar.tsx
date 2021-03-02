import React from 'react';
import {
  Navbar,
} from 'reactstrap';

import ProfileCard from '../reusable/ProfileCard';

const SideBar: React.FC = () => (
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
      <ProfileCard />
    </div>
    <div className="menu mt-5">
      <ul className="pl-3">
        <li className="mb-4 ">
          <img className="mr-3" src="/assets/icon/home.svg" alt="" />
          {' '}
          Dashboard
        </li>
        <li className="mb-4">
          <img className="mr-3" src="/assets/icon/referral.svg" alt="" />
          {' '}
          Referrals
        </li>
        <li className="mb-4">
          <img className="mr-3" src="/assets/icon/account.svg" alt="" />
          {' '}
          Account
        </li>
        <li className="mb-4">
          <img className="mr-3" src="/assets/icon/audit.svg" alt="" />
          {' '}
          Audit
          &#38; Dispute
        </li>
        <li className="mb-4">
          <img className="mr-3" src="/assets/icon/profile.svg" alt="" />
          {' '}
          Profile
        </li>
        <li className="mb-4">
          <img className="mr-3" src="/assets/icon/setting.svg" alt="" />
          Setting
        </li>
      </ul>
    </div>

    <div className="menu mt-5 pt-5">
      <ul className="pl-3">
        <li className="mb-4 ">
          <img className="mr-3" src="/assets/icon/paid.svg" alt="" />
          {' '}
          1,458 PAID
        </li>
        <li className="mb-4">
          <img className="mr-3" src="/assets/icon/list-log.svg" alt="" />
          Smart Agreements Log
        </li>
        <li className="mb-4">
          <img className="mr-3" src="/assets/icon/wallets.svg" alt="" />
          {' '}
          Wallets
        </li>
        <li className="mb-4">
          <img className="mr-3" src="/assets/icon/profile.svg" alt="" />
          Network: RINKEBY
        </li>
      </ul>
    </div>
  </Navbar>
);

export default SideBar;
