import React, { FC, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import classNames from 'classnames';
import StackedInput from '../reusable/StackedInput';
import ProfileModel from '../../models/profileModel';
import PdAlert from '../reusable/pdAlert';

interface FormProfileProps {
  profile: ProfileModel;
  emptyProfile: boolean;
  onSubmit: any;
}

const FormProfile: FC<FormProfileProps> = ({
  profile,
  emptyProfile,
  onSubmit,
}: FormProfileProps) => {
  const {
    register,
    errors,
    handleSubmit,
    watch,
  } = useForm<ProfileModel>({
    defaultValues: {
      ...profile,
    },
  });

  const passPharse = useRef({});
  passPharse.current = watch('passPharse', '');

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <StackedInput
        label="Name:"
        readOnly={!emptyProfile}
        name="name"
        type="text"
        placeholder="Enter your Name"
        inputClassNames={classNames({ 'is-invalid': errors.name })}
        innerRef={register({
          required: 'Name is required',
        })}
        errorComponent={(
          <ErrorMessage
            className="error-message"
            name="name"
            as="div"
            errors={errors}
          />
        )}
      />
      {!emptyProfile && (
        <>
          <StackedInput
            label="DID:"
            readOnly
            name="did"
            type="text"
            value={profile.did}
          />
          <StackedInput
            readOnly
            label="Address: "
            name="address"
            type="text"
            value={profile.address}
          />
          <StackedInput
            readOnly
            label="Created: "
            name="created"
            type="text"
            value={profile.created}
          />
        </>
      )}

      {emptyProfile && (
        <>
          <StackedInput
            label="PassPhrase:"
            name="passPharse"
            type="password"
            placeholder="Enter your PassPharse"
            inputClassNames={classNames({ 'is-invalid': errors.passPharse })}
            innerRef={register({
              required: 'PassPharse is required',
              minLength: {
                value: 7,
                message: 'PassPharse must have 7 characters',
              },
            })}
            errorComponent={(
              <ErrorMessage
                className="error-message"
                name="passPharse"
                as="div"
                errors={errors}
              />
            )}
          />
          <StackedInput
            label="Confirm PassPhrase:"
            name="confirmPassPharse"
            type="password"
            placeholder="Enter your Confim PassPharse"
            inputClassNames={classNames({
              'is-invalid': errors.confirmPassPharse,
            })}
            innerRef={register({
              validate: (value) => value === passPharse.current || 'The passwords do not match',
            })}
            errorComponent={(
              <ErrorMessage
                className="error-message"
                name="confirmPassPharse"
                as="div"
                errors={errors}
              />
            )}
          />
        </>
      )}

      {emptyProfile && (
        <PdAlert
          className="my-5"
          color="danger"
          message="Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet."
        />
      )}
      <div className="d-flex justify-content-end">
        {emptyProfile ? (
          <>
            {/* <button
              className="btn btn-link btn-link-form-cancel mr-5"
              type="button"
              onClick={setCancel}
            >
              Cancel
            </button> */}
            <button className="btn btn-primary btn-form-save" type="submit">
              Save
            </button>
          </>
        ) : (
          <button
            className="btn btn-secondary btn-form-img-text-primary"
            type="button"
          >
            Export Wallet
          </button>
        )}
      </div>
    </form>
  );
};

export default FormProfile;
