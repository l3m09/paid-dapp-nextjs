import React from 'react';
import PropTypes from 'prop-types';

import SideBar from './SideBar';

const PrivateLayout: React.FC = ({ children }) => (
  <div className="wrapper d-flex">
    <div className="sidebar d-inline-block">
      <SideBar />
    </div>
    <div className="main-content container-fluid d-inline-block">
      {children}
    </div>
  </div>
);

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
