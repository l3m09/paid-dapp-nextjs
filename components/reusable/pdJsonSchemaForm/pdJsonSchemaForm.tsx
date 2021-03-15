// eslint-disable-next-line import/no-unresolved
import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import Form from '@rjsf/core';
import {
  Button,
} from 'reactstrap';
import styles from './PdJsonSchemaForm.module.scss';

interface pdJsonSchemaFormProps {
  type?: string;
  dataName: string;
  jsonSchema: Object;
  uiSchema?: Object;
  className?: string;
  onChange: any;
  onSubmit: any;
}

const PdJsonSchemaForm: FC<pdJsonSchemaFormProps> = ({
  dataName,
  jsonSchema,
  uiSchema,
  className,
  onChange,
  onSubmit,
}) => {
  const smartAgreementsState = useSelector(
    (state: { smartAgreementsReducer: any }) => state.smartAgreementsReducer,
  );

  const widgets = {};

  return (
    <div className={`${styles.pdForm} ${className}`}>
      <Form
        schema={jsonSchema}
        uiSchema={uiSchema}
        widgets={widgets}
        formData={smartAgreementsState[dataName]}
        onSubmit={onSubmit}
        onChange={onChange}
        showErrorList={false}
      >
        <Button className="w-100 text-center" color="danger">Review </Button>
      </Form>
    </div>
  );
};

export default PdJsonSchemaForm;
