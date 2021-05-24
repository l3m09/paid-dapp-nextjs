import React, { Children } from 'react';
import { Progress } from 'reactstrap';

const Wizard = ({
  children, activePageIndex, jsonSchemas,
}) => {
  const pages = Children.toArray(children);
  const currentPage = pages[activePageIndex];

  return (
    <>
      <span>
        Step
        {' '}
        {activePageIndex + 1}
        {' '}
        of
        {' '}
        {jsonSchemas.length}
        {' '}
        My Information
      </span>
      <Progress color="danger" value={activePageIndex + 1} max={jsonSchemas.length} />
      <div>{currentPage}</div>
    </>
  );
};

export default Wizard;
