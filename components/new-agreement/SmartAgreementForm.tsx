import React, { FC } from 'react';
import PdJsonSchemaForm from '../reusable/pdJsonSchemaForm/pdJsonSchemaForm';

interface SmartAgreementsFormProps {
  jsonSchema: Object;
  uiSchema: Object;
  dataName: string;
  type: string;
  onSaveFields: any;
}

const SmartAgreementsForm: FC<SmartAgreementsFormProps> = ({
  type,
  dataName,
  jsonSchema,
  uiSchema,
  onSaveFields,
}) => {
  const mapTypeToComponent = new Map([
    [
      'nda',
      <PdJsonSchemaForm
        dataName={dataName}
        jsonSchema={jsonSchema}
        uiSchema={uiSchema}
        type={type}
        onSave={onSaveFields}
      />,
    ],
    [
      'advisor',
      <PdJsonSchemaForm
        dataName={dataName}
        jsonSchema={jsonSchema}
        uiSchema={uiSchema}
        type={type}
        onSave={onSaveFields}
      />,
    ],
    [
      'ciia',
      <PdJsonSchemaForm
        dataName={dataName}
        jsonSchema={jsonSchema}
        type={type}
        onSave={onSaveFields}
      />,
    ],
    [
      'consulting',
      <PdJsonSchemaForm
        dataName={dataName}
        jsonSchema={jsonSchema}
        uiSchema={uiSchema}
        type={type}
        onSave={onSaveFields}
      />,
    ],
    [
      'referral',
      <PdJsonSchemaForm
        dataName={dataName}
        jsonSchema={jsonSchema}
        uiSchema={uiSchema}
        type={type}
        onSave={onSaveFields}
      />,
    ],
    [
      'saft',
      <PdJsonSchemaForm
        dataName={dataName}
        jsonSchema={jsonSchema}
        type={type}
        onSave={onSaveFields}
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
