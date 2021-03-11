import React, {
  FC,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Form from '@rjsf/core';

import { doSetSmartAgreementData } from '../../redux/actions/smartAgreement';

interface JsonSchemaFormProps {
  type: string;
  dataName: string;
  jsonSchema: Object;
  uiSchema?: Object;
  onClose: any;
}

const JsonSchemaForm: FC<JsonSchemaFormProps> = ({
  type,
  dataName,
  jsonSchema,
  uiSchema,
  onClose,
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
    <div className="smart-agreements-form">
      <Form
        schema={jsonSchema}
        uiSchema={uiSchema}
        widgets={widgets}
        formData={smartAgreementsState[dataName]}
        onSubmit={onSubmit}
      />
    </div>
  );
};

export default JsonSchemaForm;
