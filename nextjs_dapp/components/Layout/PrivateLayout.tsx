import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import SideBar from './SideBar';

import useWindowSize from '../../hooks/useWindowsSize';

const PrivateLayout: React.FC = ({ children }) => {
  const isOpen = useSelector((state: any) => state.menuReducer.isOpen);
  const size = useWindowSize();

  return (
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
