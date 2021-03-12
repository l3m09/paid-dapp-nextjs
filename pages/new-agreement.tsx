/* eslint-disable import/no-unresolved */
import React, { useState, useEffect, useCallback } from 'react';
import Head from 'next/head';
import { NextPage } from 'next';
import router from 'next/router';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import TemplateComponent from 'react-mustache-template-component';

import { Card } from 'reactstrap';
import PdScrollbar from '../components/reusable/pdScrollbar/PdScrollbar';
import PreviewDocument from '@/components/new-agreement/PreviewDocument';
import SmartAgreementFormPanel from '../components/new-agreement/SmartAgreementFormPanel';

import getContractTemplate from '../redux/actions/template/index';

type NewAgreementProps = {
  templateTypeCode?: string;
};

const NewAgreement: NextPage<NewAgreementProps> = ({ templateTypeCode }) => {
  if (!templateTypeCode) {
    router.push('agreements');
  }

  const smartAgreementsState = useSelector(
    (state: { smartAgreementsReducer: any }) => state.smartAgreementsReducer,
  );
  const [jsonSchema, setJsonSchema] = useState({});
  const [uiSchema, setUISchema] = useState({});
  const [dataName, setDataName] = useState('');
  const [agreementDocument, setAgreementDocument] = useState('');
  const [agreementData] = useState({});

  useEffect(() => {
    const templateData = getContractTemplate(templateTypeCode);

    setDataName(templateData.dataName);
    setAgreementDocument(templateData.template);
    setJsonSchema(templateData.jsonSchema);
    setUISchema(templateData.uiSchema);
    setDataName(templateData.dataName);
  }, [templateTypeCode, smartAgreementsState]);

  const agreementTemplate = useCallback(() => <div style={{ width: '100%' }}><TemplateComponent template={agreementDocument} data={agreementData} /></div>, [agreementDocument, agreementData]);

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
              <div className="col-8">
                <Card className="border-0 content">
                  <PreviewDocument templateName="Mutual NDA" templateHTML={agreementTemplate()} />
                </Card>
              </div>
              <div className="col-4">
                <PdScrollbar noScrollX scrollYHeight={665}>
                  <SmartAgreementFormPanel
                    type={templateTypeCode}
                    dataName={dataName}
                    jsonSchema={jsonSchema}
                    uiSchema={uiSchema}
                  />
                </PdScrollbar>
              </div>
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
