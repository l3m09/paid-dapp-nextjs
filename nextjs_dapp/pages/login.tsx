import React from 'react';
import Head from 'next/head';

import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
} from 'reactstrap';

const Login: React.FC = () => (
  <div className="container">
    <Head>
      <title>Master Ventures</title>
      <link rel="icon" href="/assets/icon/.ico" />
    </Head>
    <Card>
      <CardImg
        top
        src="https://master.ventures/wp-content/uploads/2020/09/MasterVenturesHorizontal.png"
        alt="Card image cap"
      />
      <CardBody>
        <CardTitle tag="h5">Card title</CardTitle>
        <CardSubtitle tag="h6" className="mb-2 text-muted">
          Card subtitle
        </CardSubtitle>
        <CardText>
          Some quick example text to build on the card title and make up the
        </CardText>
        <Button>Login</Button>
      </CardBody>
    </Card>
  </div>
);

export default Login;
