import React, { FC, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Head from 'next/head';
import { Card } from 'reactstrap';
import ProfileStateModel from '../models/profileStateModel';
import FormProfile from '../components/profile/FormProfile';
import ProfileModel from '../models/profileModel';
import doSetProfile from '../redux/actions/profile';

const Profile: FC = () => {
  const dispatch = useDispatch();
  const profileState: ProfileStateModel = useSelector((state: any) => state.profileReducer);
  const { profile } = profileState;
  const {
    firstName,
    lastName,
    email,
  } = profile;
  const emptyProfile = !(firstName && lastName && email);
  const [edit, setEdit] = useState(emptyProfile);

  const onSubmit = (values: ProfileModel) => {
    dispatch(doSetProfile(values));
    setEdit(false);
  };

  const onCancel = () => {
    setEdit(emptyProfile);
  };

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
                <FormProfile
                  profile={profile}
                  edit={edit}
                  onEdit={() => setEdit(true)}
                  onSubmit={onSubmit}
                  onCancel={onCancel}
                />
              </div>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
