import React, { FC, InputHTMLAttributes } from 'react'
import classNames from 'classnames'

// eslint-disable-next-line no-undef
interface InputStackedProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  innerRef?: any;
  labelClassNames?: string;
  inputClassNames?: string;
  errorComponent?: any;
}

const InputStacked: FC<InputStackedProps> = ({
  label,
  name,
  type,
  placeholder,
  innerRef,
  labelClassNames,
  inputClassNames,
  errorComponent,
}: InputStackedProps) => (
  <div className={classNames('form-group stacked-group')}>
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
      className={classNames('form-control stacked-input', inputClassNames)}
      ref={innerRef}
    />
    {
      errorComponent
    }
  </div>
)

InputStacked.defaultProps = {
  innerRef: null,
  labelClassNames: '',
  inputClassNames: '',
  errorComponent: null,
}

export default InputStacked
