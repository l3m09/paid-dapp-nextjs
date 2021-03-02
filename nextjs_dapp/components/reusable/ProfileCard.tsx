import React from 'react';

const ProfileCard: React.FC = () => (
  <div className="profile-component mt-4 mx-auto">
    <img src="/assets/images/marty.jpg" alt="" />
    <div className="info d-inline-block ml-1">
      <span className="name d-block"> Dan Smith</span>
      <p className="network">PAID Network</p>
    </div>
  </div>
);

export default ProfileCard;
