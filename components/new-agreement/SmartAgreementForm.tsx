import React, { FC } from 'react';
import PdJsonSchemaForm from '../reusable/pdJsonSchemaForm/pdJsonSchemaForm';

interface SmartAgreementsFormProps {
  jsonSchema: Object;
  uiSchema: Object;
  dataName: string;
  type: string;
  onChangeFields: any;
  onReview: any;
}

const SmartAgreementsForm: FC<SmartAgreementsFormProps> = ({
  type,
  dataName,
  jsonSchema,
  uiSchema,
  onChangeFields,
  onReview,
}) => {
  const mapTypeToComponent = new Map([
    [
      'nda',
      <PdJsonSchemaForm
        dataName={dataName}
        jsonSchema={jsonSchema}
        uiSchema={uiSchema}
        type={type}
        onChange={onChangeFields}
        onSubmit={onReview}
      />,
    ],
    [
      'advisor',
      <PdJsonSchemaForm
        dataName={dataName}
        jsonSchema={jsonSchema}
        uiSchema={uiSchema}
        type={type}
        onChange={onChangeFields}
        onSubmit={onReview}
      />,
    ],
    [
      'ciia',
      <PdJsonSchemaForm
        dataName={dataName}
        jsonSchema={jsonSchema}
        type={type}
        onChange={onChangeFields}
        onSubmit={onReview}
      />,
    ],
    [
      'consulting',
      <PdJsonSchemaForm
        dataName={dataName}
        jsonSchema={jsonSchema}
        uiSchema={uiSchema}
        type={type}
        onChange={onChangeFields}
        onSubmit={onReview}
      />,
    ],
    [
      'referral',
      <PdJsonSchemaForm
        dataName={dataName}
        jsonSchema={jsonSchema}
        uiSchema={uiSchema}
        type={type}
        onChange={onChangeFields}
        onSubmit={onReview}
      />,
    ],
    [
      'saft',
      <PdJsonSchemaForm
        dataName={dataName}
        jsonSchema={jsonSchema}
        type={type}
        onChange={onChangeFields}
        onSubmit={onReview}
      />,
    ],
  ]);
  return (
    <>
      {mapTypeToComponent.get(type) ?? (
        <span>Not found Smart Agreement form</span>
      )}
    </>
  );
};

export default SmartAgreementsForm;
