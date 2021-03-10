import React, { FC } from "react";
import PropTypes from "prop-types";
import { Card, Button } from "reactstrap";
import StackedInput from "../reusable/StackedInput";
import SmartAgreementForm from "./SmartAgreementForm";

interface SmartAgreementsFormPanelProps {
  jsonSchema: Object;
  uiSchema: Object;
  dataName: string;
  type: string;
  onClose: any;
}

const SmartAgreementsFormPanel: FC<SmartAgreementsFormPanelProps> = ({
  type,
  dataName,
  jsonSchema,
  uiSchema,
  onClose,
}: SmartAgreementsFormPanelProps) => (
  <Card className="card-fields border-0 p-3">
    <div className="title d-flex">
      <span className="mr-auto p-2 mb-4"> Fields</span>
      <Button className="btn-transparent" color="primary">
        <img src="/assets/icon/3dot.svg" alt="" />
      </Button>
    </div>
    <span className="secondary-title mb-1 px-2">Counterparty</span>
    <StackedInput
      label="Email or Username:"
      name="Type Name"
      type="text"
      placeholder="Type email or username"
      errorComponent={null}
      groupClassNames="mt-1 px-2 my-1"
    />

    <StackedInput
      label="Name:"
      name="name"
      type="text"
      placeholder="Type email or username"
      errorComponent={null}
      groupClassNames="px-2 py-1"
    />

    <span className="secondary-title mb-1 px-2">Settings</span>
    <SmartAgreementForm
      type={type}
      dataName={dataName}
      jsonSchema={jsonSchema}
      uiSchema={uiSchema}
      onClose={() => console.log("TEST")}
    />
  </Card>
);

// SmartAgreementsFormPanel.propTypes = {
//   data: PropTypes.oneOfType([PropTypes.any]),
// };

// SmartAgreementsFormPanel.defaultProps = {
//   data: [],
// };

export default SmartAgreementsFormPanel;
