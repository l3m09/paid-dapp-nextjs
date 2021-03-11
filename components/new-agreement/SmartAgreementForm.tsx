import React, { FC } from 'react';

import PdJsonSchemaForm from '../reusable/pdJsonSchemaForm/pdJsonSchemaForm';

interface SmartAgreementsFormProps {
  jsonSchema: Object;
  uiSchema: Object;
  dataName: string;
  type: string;
}

const SmartAgreementsForm: FC<SmartAgreementsFormProps> = ({
  type,
  dataName,
  jsonSchema,
  uiSchema,
}) => {
  const mapTypeToComponent = new Map([
    [
      'nda',
      <PdJsonSchemaForm
        dataName={dataName}
        jsonSchema={jsonSchema}
        uiSchema={uiSchema}
        type={type}
      />,
    ],
    [
      'advisor',
      <PdJsonSchemaForm
        dataName={dataName}
        jsonSchema={jsonSchema}
        uiSchema={uiSchema}
        type={type}
      />,
    ],
    [
      'ciia',
      <PdJsonSchemaForm
        dataName={dataName}
        jsonSchema={jsonSchema}
        type={type}
      />,
    ],
    [
      'consulting',
      <PdJsonSchemaForm
        dataName={dataName}
        jsonSchema={jsonSchema}
        uiSchema={uiSchema}
        type={type}
      />,
    ],
    [
      'referral',
      <PdJsonSchemaForm
        dataName={dataName}
        jsonSchema={jsonSchema}
        uiSchema={uiSchema}
        type={type}
      />,
    ],
    [
      'saft',
      <PdJsonSchemaForm
        dataName={dataName}
        jsonSchema={jsonSchema}
        type={type}
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
