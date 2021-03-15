import React, { FC } from 'react';
import { Card, Button } from 'reactstrap';
import SmartAgreementForm from './SmartAgreementForm';

interface SmartAgreementsFormPanelProps {
  jsonSchema: Object;
  uiSchema: Object;
  dataName: string;
  type: string;
  onChangeFields: any;
  onReview: any;
}

const SmartAgreementsFormPanel: FC<SmartAgreementsFormPanelProps> = ({
  type,
  dataName,
  jsonSchema,
  uiSchema,
  onChangeFields,
  onReview,
}: SmartAgreementsFormPanelProps) => (
  <Card className="card-fields border-0 p-3">
    <div className="title d-flex">
      <span className="mr-auto p-2 mb-4"> Fields</span>
      <Button className="btn-transparent" color="primary">
        <img src="/assets/icon/3dot.svg" alt="" />
      </Button>
    </div>
    <SmartAgreementForm
      type={type}
      dataName={dataName}
      jsonSchema={jsonSchema}
      uiSchema={uiSchema}
      onChangeFields={onChangeFields}
      onReview={onReview}
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
