/* eslint-disable import/no-unresolved */
import React, { useState, useEffect, useCallback } from 'react';
import Head from 'next/head';
import { NextPage } from 'next';
import router from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import TemplateComponent from 'react-mustache-template-component';
import classNames from 'classnames';
import { Card } from 'reactstrap';
import { format } from 'date-fns';

import ProfileStateModel from '@/models/profileStateModel';
import PreviewDocument from '@/components/new-agreement/PreviewDocument';
import { setAgreementExists, setIsEditing } from 'redux/actions';
import PdScrollbar from '../components/reusable/pdScrollbar/PdScrollbar';
import SmartAgreementFormPanel from '../components/new-agreement/SmartAgreementFormPanel';

import getContractTemplate from '../redux/actions/template/index';
import { doSetSmartAgreementData } from '../redux/actions/smartAgreement';
import {
  AGREEMENT_CREATE_DATE_FIELD,
  PARTY_ADDRESS_FIELD,
  PARTY_EMAIL_FIELD,
  PARTY_NAME_FIELD,
  PARTY_WALLET_FIELD,
} from '../utils/agreement';

type NewAgreementProps = {
  templateTypeCode?: string;
};

const NewAgreement: NextPage<NewAgreementProps> = ({ templateTypeCode }) => {
  if (!templateTypeCode) {
    router.push('agreements');
  }

  const dispatch = useDispatch();

  const smartAgreementsState = useSelector(
    (state: { smartAgreementsReducer: any }) => state.smartAgreementsReducer,
  );

  const isEditing = useSelector(
    (state: { agreementReducer: any }) => state.agreementReducer.isEditing,
  );

  const agreementExists = useSelector(
    (state: { agreementReducer: any }) => state.agreementReducer.agreementExists,
  );

  const currentAgreement = useSelector(
    (state: { agreementReducer: any }) => state.agreementReducer.currentAgreement,
  );

  const {
    firstName,
    lastName,
    email,
    address,
  } = useSelector(
    (state: { profileReducer: ProfileStateModel }) => state.profileReducer.profile,
  );

  const currentWallet = useSelector(
    (state: {walletReducer: any}) => state.walletReducer.currentWallet,
  );

  const previewColumn = classNames({
    'col-8': isEditing,
    'col-12': !isEditing,
  });

  const onEditMode = () => {
    dispatch(setIsEditing(true));
  };

  const onSaveFields = ({ formData }) => {
    dispatch(setIsEditing(false));
    dispatch(setAgreementExists(true));
    dispatch(doSetSmartAgreementData({
      type: templateTypeCode,
      formData,
    }));
  };

  const [jsonSchema, setJsonSchema] = useState({});
  const [uiSchema, setUISchema] = useState({});
  const [dataName, setDataName] = useState('');
  const [agreementDocument, setAgreementDocument] = useState('');
  const [agreementData, setAgreementData] = useState(null);

  useEffect(() => {
    const templateData = getContractTemplate(templateTypeCode);

    setDataName(templateData.dataName);
    setAgreementDocument(templateData.template);
    setJsonSchema(templateData.jsonSchema);
    setUISchema(templateData.uiSchema);
  }, [templateTypeCode, smartAgreementsState]);

  useEffect(() => {
    const data = smartAgreementsState[dataName];
    if (data && data[PARTY_NAME_FIELD] === '') {
      data[PARTY_NAME_FIELD] = `${firstName} ${lastName}`;
      data[PARTY_EMAIL_FIELD] = email;
      data[PARTY_ADDRESS_FIELD] = address;
      data[PARTY_WALLET_FIELD] = currentWallet;
      data[AGREEMENT_CREATE_DATE_FIELD] = format(new Date(), 'yyyy/MM/dd');
    }
    setAgreementData(data);
  }, [smartAgreementsState, dataName]);

  const agreementTemplate = useCallback(
    () => (
      <div style={{ width: '100%' }}>
        {
          agreementData
            ? <TemplateComponent template={agreementDocument} data={agreementData} />
            : null
        }
      </div>
    ),
    [agreementDocument, agreementData],
  );

  return (
    <>
      <Head>
        <title>Paid-Dapp New Agreeement</title>
        <link rel="icon" href="/assets/icon/.ico" />
      </Head>
      <div className="new-agreement m-0 p-0 px-4 container-fluid">
        <div className="row m-0 p-0 h-100">
          <div className="col-12 py-4 d-flex">
            <h3 className="d-flex mr-auto">New Agreeement</h3>
          </div>
          <div className="col-12">
            <div className="row">
              <div className={previewColumn}>
                <Card className="border-0 content">
                  <PreviewDocument
                    templateName="Mutual NDA"
                    templateComponent={agreementTemplate()}
                    onEditMode={onEditMode}
                    isEditing={isEditing}
                    agreementExists={agreementExists}
                  />
                </Card>
              </div>
              {isEditing && (
                <div className="col-4">
                  <PdScrollbar noScrollX scrollYHeight={665}>
                    <SmartAgreementFormPanel
                      type={templateTypeCode}
                      dataName={dataName}
                      jsonSchema={jsonSchema}
                      uiSchema={uiSchema}
                      onSaveFields={onSaveFields}
                    />
                  </PdScrollbar>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

NewAgreement.getInitialProps = ({ query }): any => {
  const { templateTypeCode } = query;
  return { templateTypeCode };
};

NewAgreement.propTypes = {
  templateTypeCode: PropTypes.string.isRequired,
};

export default NewAgreement;
