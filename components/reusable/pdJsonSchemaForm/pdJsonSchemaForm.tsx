// eslint-disable-next-line import/no-unresolved
import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Form from '@rjsf/core';
import {
  Button,
} from 'reactstrap';
import { doSetSmartAgreementData } from '../../../redux/actions/smartAgreement';
import styles from './PdJsonSchemaForm.module.scss';

interface pdJsonSchemaFormProps {
  type: string;
  dataName: string;
  jsonSchema: Object;
  uiSchema?: Object;
  className?: string;
  onSave: any;
}

const PdJsonSchemaForm: FC<pdJsonSchemaFormProps> = ({
  type,
  dataName,
  jsonSchema,
  uiSchema,
  className,
  onSave,
}) => {
  const dispatch = useDispatch();
  const smartAgreementsState = useSelector(
    (state: { smartAgreementsReducer: any }) => state.smartAgreementsReducer,
  );

  const onChange = ({ formData }) => {
    dispatch(doSetSmartAgreementData({ type, formData }));
  };

  const widgets = {};

  return (
    <div className={`${styles.pdForm} ${className}`}>
      <Form
        schema={jsonSchema}
        uiSchema={uiSchema}
        widgets={widgets}
        formData={smartAgreementsState[dataName]}
        onSubmit={onSave}
        onChange={onChange}
        showErrorList={false}
      >
        <Button className="w-100 text-center" color="danger">Review </Button>
      </Form>
    </div>
  );
};

export default PdJsonSchemaForm;
