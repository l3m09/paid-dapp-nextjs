import React, { FC } from "react";
import JsonSchemaForm from "../reusable/JsonSchemaForm";

interface SmartAgreementsFormProps {
  jsonSchema: Object;
  uiSchema: Object;
  dataName: string;
  type: string;
  onClose: any;
}

const SmartAgreementsForm: FC<SmartAgreementsFormProps> = ({
  type,
  dataName,
  jsonSchema,
  uiSchema,
  onClose,
}) => {
  const mapTypeToComponent = new Map([
    [
      "advisor",
      <JsonSchemaForm
        dataName={dataName}
        jsonSchema={jsonSchema}
        uiSchema={uiSchema}
        type={type}
        onClose={onClose}
      />,
    ],
    [
      "ciia",
      <JsonSchemaForm
        dataName={dataName}
        jsonSchema={jsonSchema}
        type={type}
        onClose={onClose}
      />,
    ],
    [
      "consulting",
      <JsonSchemaForm
        dataName={dataName}
        jsonSchema={jsonSchema}
        uiSchema={uiSchema}
        type={type}
        onClose={onClose}
      />,
    ],
    [
      "referral",
      <JsonSchemaForm
        dataName={dataName}
        jsonSchema={jsonSchema}
        uiSchema={uiSchema}
        type={type}
        onClose={onClose}
      />,
    ],
    [
      "saft",
      <JsonSchemaForm
        dataName={dataName}
        jsonSchema={jsonSchema}
        type={type}
        onClose={onClose}
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
