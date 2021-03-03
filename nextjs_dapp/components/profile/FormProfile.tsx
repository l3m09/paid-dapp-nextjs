import React, { FC } from 'react'
import { useForm } from 'react-hook-form'
import { ErrorMessage } from '@hookform/error-message'
import StackedInput from '../reusable/StackedInput'
import StackedTextarea from '../reusable/StackedTextarea'

interface FormProfileProps {
  onSubmit: any;
}

const FormProfile: FC<FormProfileProps> = ({ onSubmit }: FormProfileProps) => {
  const { register, errors, handleSubmit } = useForm()

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <StackedInput
        label="Name:"
        name="firstName"
        type="text"
        placeholder="Jhon"
        innerRef={register({
          required: 'Name is required',
        })}
        errorComponent={
          (
            <ErrorMessage
              className=""
              name="firstName"
              as="div"
              errors={errors}
            />
          )
        }
      />
      <StackedInput
        label="Last name:"
        name="lastName"
        type="text"
        placeholder="Doe"
        innerRef={register({
          required: 'Last name is required',
        })}
        errorComponent={
          (
            <ErrorMessage
              className=""
              name="lastName"
              as="div"
              errors={errors}
            />
          )
        }
      />
      <StackedInput
        label="Email:"
        name="email"
        type="text"
        placeholder="jhon.doe@example.com"
        innerRef={register({
          required: 'Email is required',
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
            message: 'Invalid email address format',
          },
        })}
        errorComponent={
          (
            <ErrorMessage
              className=""
              name="email"
              as="div"
              errors={errors}
            />
          )
        }
      />
      <StackedTextarea
        label="Address:"
        name="address"
        placeholder={'Suite 5A-1204\n799 E Dragram\nTucson AZ 85705\nUSA'}
        rows={4}
      />
      <StackedInput
        label="Phone Number:"
        name="phone"
        type="text"
        placeholder="+1 556 985 6859"
        groupClassNames="stacked-group-last"
      />
      <button className="btn btn-primary btn-block" type="submit">Submit</button>
    </form>
  )
}

export default FormProfile
