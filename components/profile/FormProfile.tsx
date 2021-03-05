import React, { FC } from 'react'
import { useForm } from 'react-hook-form'
import { ErrorMessage } from '@hookform/error-message'
import classNames from 'classnames'
import StackedInput from '../reusable/StackedInput'
import StackedTextarea from '../reusable/StackedTextarea'
import ProfileModel from '../../models/profileModel'

interface FormProfileProps {
  profile: ProfileModel;
  edit: boolean;
  onEdit: any;
  onSubmit: any;
  onCancel: any;
}

const FormProfile: FC<FormProfileProps> = ({
  profile,
  edit,
  onEdit,
  onSubmit,
  onCancel,
}: FormProfileProps) => {
  const {
    register,
    errors,
    handleSubmit,
    reset,
  } = useForm<ProfileModel>({
    defaultValues: {
      ...profile,
    },
  })

  const setCancel = () => {
    reset(profile)
    onCancel()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <StackedInput
        label="Name:"
        name="firstName"
        type="text"
        placeholder="Jhon"
        inputClassNames={classNames({ 'is-invalid': errors.firstName })}
        innerRef={register({
          required: 'Name is required',
        })}
        errorComponent={
          (
            <ErrorMessage
              className="error-message"
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
        inputClassNames={classNames({ 'is-invalid': errors.lastName })}
        innerRef={register({
          required: 'Last name is required',
        })}
        errorComponent={
          (
            <ErrorMessage
              className="error-message"
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
        inputClassNames={classNames({ 'is-invalid': errors.lastName })}
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
              className="error-message"
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
        innerRef={register}
      />
      <StackedInput
        label="Phone Number:"
        name="phone"
        type="text"
        placeholder="+1 556 985 6859"
        groupClassNames="stacked-group-last"
        innerRef={register}
      />
      <div className="d-flex justify-content-end">
        {
          edit ? (
            <>
              <button
                className="btn btn-link btn-link-form-cancel mr-5"
                type="button"
                onClick={setCancel}
              >
                Cancel
              </button>
              <button
                className="btn btn-primary btn-form-save"
                type="submit"
              >
                Save
              </button>
            </>
          ) : (
            <button
              className="btn btn-primary btn-form-img-text-primary"
              type="button"
              onClick={() => onEdit()}
            >
              <img className="mr-1" src="/assets/icon/edit.svg" alt="" />
              {' '}
              Edit Profile
            </button>
          )
        }
      </div>
    </form>
  )
}

export default FormProfile
