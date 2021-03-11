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
}

const PdJsonSchemaForm: FC<pdJsonSchemaFormProps> = ({
  type,
  dataName,
  jsonSchema,
  uiSchema,
  className,
}) => {
  const dispatch = useDispatch();
  const smartAgreementsState = useSelector(
    (state: { smartAgreementsReducer: any }) => state.smartAgreementsReducer,
  );

  const onSubmit = ({ formData }) => {
    dispatch(doSetSmartAgreementData({ type, formData }));
  };

  const CustomCheckbox = function (props) {
    return (
      <div className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          value=""
          name={props.schema.name}
          id="flexCheckDefault"
          onClick={() => props.onChange(!props.value)}
        />
        <label className="form-check-label">{props.schema.title}</label>
      </div>
    );
  };

  const widgets = {
    CheckboxWidget: CustomCheckbox,
  };

  return (
    <div className={`${styles.pdForm} ${className}`}>
      <Form
        schema={jsonSchema}
        uiSchema={uiSchema}
        widgets={widgets}
        formData={smartAgreementsState[dataName]}
        onSubmit={onSubmit}
      >
        <Button className="w-100 text-center" color="danger">Review </Button>
      </Form>
    </div>
  );
};

export default PdJsonSchemaForm;
