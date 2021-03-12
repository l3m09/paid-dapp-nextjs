import React, { FC, InputHTMLAttributes } from 'react';
import classNames from 'classnames';

// eslint-disable-next-line no-undef
interface StackedInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  innerRef?: any;
  groupClassNames?: string;
  labelClassNames?: string;
  inputClassNames?: string;
  errorComponent?: any;
}

const StackedInput: FC<StackedInputProps> = ({
  label,
  name,
  type,
  placeholder,
  innerRef,
  groupClassNames,
  labelClassNames,
  inputClassNames,
  errorComponent,
}: StackedInputProps) => (
  <div className={classNames('form-group stacked-group', groupClassNames)}>
    <label
      htmlFor={name}
      className={classNames('stacked-label', labelClassNames)}
    >
      {label}
    </label>
    <input
      name={name}
      type={type}
      placeholder={placeholder}
      className={classNames('form-control stacked-control', inputClassNames)}
      ref={innerRef}
    />
    {
      errorComponent
    }
  </div>
);

StackedInput.defaultProps = {
  innerRef: null,
  groupClassNames: '',
  labelClassNames: '',
  inputClassNames: '',
  errorComponent: null,
};

export default StackedInput;
