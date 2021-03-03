import React, { FC, useState } from 'react'
import { useSelector } from 'react-redux'
import Head from 'next/head'
import ProfileStateModel from '../models/profileStateModel'
import { Card } from 'reactstrap'

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
              <span>text</span>
            </Card>
          </div>
        </div>
      </div>
    </>
  )
}

export default Profile
