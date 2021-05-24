import React, { FC } from 'react';
import PdJsonSchemaForm from '../reusable/pdJsonSchemaForm/pdJsonSchemaForm';

interface SmartAgreementsFormProps {
  jsonSchemas: Array<Object>;
  uiSchema: Object;
  dataName: string;
  type: string;
  onChangeFields: any;
  activePageIndex: number,
  setActivePageIndex: any,
  onReview: any;
}

const SmartAgreementsForm: FC<SmartAgreementsFormProps> = ({
  type,
  dataName,
  jsonSchemas,
  uiSchema,
  onChangeFields,
  activePageIndex,
  setActivePageIndex,
  onReview,
}) => {
  const mapTypeToComponent = new Map([
    [
      'nda',
      <PdJsonSchemaForm
        dataName={dataName}
        jsonSchemas={jsonSchemas}
        uiSchema={uiSchema}
        type={type}
        onChange={onChangeFields}
        activePageIndex={activePageIndex}
        setActivePageIndex={setActivePageIndex}
        onSubmit={onReview}
      />,
    ],
    [
      'advisor',
      <PdJsonSchemaForm
        dataName={dataName}
        jsonSchemas={jsonSchemas}
        uiSchema={uiSchema}
        type={type}
        onChange={onChangeFields}
        activePageIndex={activePageIndex}
        setActivePageIndex={setActivePageIndex}
        onSubmit={onReview}
      />,
    ],
    [
      'ciia',
      <PdJsonSchemaForm
        dataName={dataName}
        jsonSchemas={jsonSchemas}
        type={type}
        onChange={onChangeFields}
        activePageIndex={activePageIndex}
        setActivePageIndex={setActivePageIndex}
        onSubmit={onReview}
      />,
    ],
    [
      'consulting',
      <PdJsonSchemaForm
        dataName={dataName}
        jsonSchemas={jsonSchemas}
        uiSchema={uiSchema}
        type={type}
        onChange={onChangeFields}
        activePageIndex={activePageIndex}
        setActivePageIndex={setActivePageIndex}
        onSubmit={onReview}
      />,
    ],
    [
      'referral',
      <PdJsonSchemaForm
        dataName={dataName}
        jsonSchemas={jsonSchemas}
        uiSchema={uiSchema}
        type={type}
        onChange={onChangeFields}
        activePageIndex={activePageIndex}
        setActivePageIndex={setActivePageIndex}
        onSubmit={onReview}
      />,
    ],
    [
      'saft',
      <PdJsonSchemaForm
        dataName={dataName}
        jsonSchemas={jsonSchemas}
        type={type}
        onChange={onChangeFields}
        activePageIndex={activePageIndex}
        setActivePageIndex={setActivePageIndex}
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
