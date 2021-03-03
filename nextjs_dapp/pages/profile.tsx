import React, { FC, useState } from 'react'
import { useSelector } from 'react-redux'
import Head from 'next/head'
import { Card } from 'reactstrap'
import { useForm } from 'react-hook-form'
import { ErrorMessage } from '@hookform/error-message'
import ProfileStateModel from '../models/profileStateModel'
import FormProfile from '../components/profile/FormProfile'
import StackedInput from '../components/reusable/StackedInput'
import StackedTextarea from '../components/reusable/StackedTextarea'

const Profile: FC = () => {
  const profileState: ProfileStateModel = useSelector((state: any) => state.profileReducer)
  const { profile } = profileState
  const {
    firstName,
    lastName,
    email,
    address,
    phone,
  } = profile
  const emptyProfile = !(firstName && lastName && email && address && phone)
  const [edit, setEdit] = useState(emptyProfile)
  const { register, errors, handleSubmit } = useForm()

  const onSubmit = (values) => {
    console.log('form', values)
  }
  return (
    <>
      <Head>
        <title>PAID - Profile</title>
        <link rel="icon" href="/assets/icon/.ico" />
      </Head>
      <div className="profile m-0 p-0 px-4 container-fluid">
        <div className="row m-0 p-0 h-100">
          <div className="col-12 py-4">
            <h3>My Profile</h3>
          </div>
          <div className="col-12">
            <Card className="border-0">
              <div className="form-wrapper">
                <FormProfile onSubmit={onSubmit} />
              </div>
            </Card>
          </div>
        </div>
      </div>
    </>
  )
}

export default Profile
