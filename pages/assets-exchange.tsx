import React, { useState } from "react";
import Head from "next/head";
import Image from "next/image";
import InsufficientTokensModal from "../components/assets-exchange/InsufficientTokensModal";
import {
  Card,
  CardBody,
  CardTitle,
  Col,
  Container,
  Row,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Badge,
} from "reactstrap";
import styles from '@/pages/assets-exchange.module.scss';

const AssetsExchange: React.FC = () => {
  const [open, setOpen] = useState(true);

  return (
    <>
      <Head>
        <title>Paid-Dapp Asset Exchange</title>
        <link rel="icon" href="/assets/icon/.ico" />
      </Head>
      <div className={`m-0 p-0 px-4 container-fluid ${styles.assetsExchange}`}>
        <div className="row m-0 p-0 h-100">
          <div className="col-12 py-4 d-flex">
            <h3 className="d-flex mr-auto">Create Cross-chain Asset</h3>
          </div>
          <div className="col-12">
            <Card className="border-0 content">
              <CardBody>
                <CardTitle>Action</CardTitle>
                <Form>
                  <Container>
                    <Row>
                      <Col md={5}>
                        <span>From</span>
                        <br />
                        <div className={styles.blockButton}>
                          <Image
                            src="/assets/images/metamask.svg"
                            width={50}
                            height={50}
                          />
                          <h4>Connect to Metamask</h4>
                        </div>
                      </Col>
                      <Col md={2}>
                        <Image
                          src="/assets/icon/arrowRight.svg"
                          width={30}
                          height={25}
                        />
                      </Col>
                      <Col md={5}>
                        <span>To</span>
                        <br />
                        <div>
                          <Image
                            src="/assets/icon/paidToken.svg"
                            width={50}
                            height={50}
                          />
                          <Badge color="warning">BEP20</Badge>
                          <Badge color="success">Connected</Badge>
                          <small>0x9e81...0dd1df</small>
                          <h4>Binance Smart Chain</h4>
                        </div>
                      </Col>
                    </Row>
                    <FormGroup>
                      <Label>Amount</Label>
                      <Row>
                        <Col md={10}>
                          <Input type="number" />
                        </Col>
                        <Col md={2}>
                          <Button color="primary">MAX Amount</Button>
                        </Col>
                      </Row>
                    </FormGroup>
                    <FormGroup>
                      <Input
                        type="number"
                        placeholder="Transfer PAID Tokens from your Metamask Wallet:"
                      />
                    </FormGroup>
                    <Row>
                      <Col md={12}>
                        <span>Transit Record</span>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={9}>
                        <Row>
                          <Col md={3}>REDEEM</Col>
                          <Col md={9}>
                            <Row>
                              <Col md={5}>
                                FROM
                                <Image
                                  src="/assets/icon/paidToken.svg"
                                  width={50}
                                  height={50}
                                />
                                <small>0x9e81...9ffd540dd1df</small>
                                <br></br>
                                <span>1000 PAID</span>
                              </Col>
                              <Col md={5}>
                                TO{" "}
                                <Image
                                  src="/assets/icon/paidToken.svg"
                                  width={50}
                                  height={50}
                                />
                                <Badge color="warning">BEP20</Badge>
                                <small>0x9e81...9ffd540dd1df</small>
                              </Col>
                              <Col md={2}>10 min</Col>
                            </Row>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={9}>
                        <Row>
                          <Col md={3}>
                            {" "}
                            <Image
                              src="/assets/icon/check.svg"
                              width={50}
                              height={50}
                            />
                          </Col>
                          <Col md={9}>
                            <Row>
                              <Col md={5}>
                                FROM
                                <Image
                                  src="/assets/icon/paidToken.svg"
                                  width={50}
                                  height={50}
                                />
                                <small>0x9e81...9ffd540dd1df</small>
                                <br></br>
                                <span>1 PAID</span>
                              </Col>
                              <Col md={5}>
                                TO
                                <Image
                                  src="/assets/icon/paidToken.svg"
                                  width={50}
                                  height={50}
                                />
                                <Badge color="warning">BEP20</Badge>
                                <small>0x9e81...9ffd540dd1df</small>
                              </Col>
                              <Col md={2}>1 hour ago</Col>
                            </Row>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  </Container>
                </Form>
              </CardBody>
            </Card>
          </div>
        </div>
        <InsufficientTokensModal
          open={open}
          neededTokens={14}
          walletAddress="0x2sd3...34df4"
          currentPaidTokens={1}
          onClose={async () => setOpen(false)}
        />
      </div>
    </>
  );
};

export default AssetsExchange;
