import React, { FC } from "react";

import { Card, Button } from "reactstrap";
import StackedInput from "../reusable/StackedInput";

interface DynamicFieldsProps {}

const DynamicFields: FC<DynamicFieldsProps> = ({}: DynamicFieldsProps) => {
  return (
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
    </Card>
  );
};

export default DynamicFields;
