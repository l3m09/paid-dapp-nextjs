import React from "react";
import Head from "next/head";
import { useDispatch, useSelector } from "react-redux";

import { Card, Button } from "reactstrap";
import { useTable } from "react-table";

import Table from "../components/agreements/Table";

import setOpenMenu from "../redux/actions/menu";

const Agreements: React.FC = () => {
  const columns = React.useMemo(
    () => [
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "Title",
        accessor: "title",
      },
      {
        Header: "Last Modified",
        accessor: "lastModified",
      },
      {
        Header: "Created",
        accessor: "createdDate",
      },
      {
        Header: "SignedOn",
        accessor: "signedon",
      },
    ],
    []
  );

  const data = React.useMemo(
    () => [
      {
        name: "Jacob Jones",
        title: "Consulting",
        lastModified: "12/21/2020 18:16:53",
        createdDate: "12/21/2020 18:16:53",
        signedon: "12/21/2020 18:16:53",
      },
      {
        name: "Theresa Webb",
        title: "Mutual NDA",
        lastModified: "12/21/2020 18:16:53",
        createdDate: "12/21/2020 18:16:53",
        signedon: "12/21/2020 18:16:53",
      },
      {
        name: "Kathryn Murphy",
        title: "Consulting",
        lastModified: "12/21/2020 18:16:53",
        createdDate: "12/21/2020 18:16:53",
        signedon: "12/21/2020 18:16:53",
      },
      {
        name: "Jane Cooper",
        title: "Mutual NDA",
        lastModified: "12/21/2020 18:16:53",
        createdDate: "12/21/2020 18:16:53",
        signedon: "12/21/2020 18:16:53",
      },
      {
        name: "Albert Flores",
        title: "Consulting",
        lastModified: "12/21/2020 18:16:53",
        createdDate: "12/21/2020 18:16:53",
        signedon: "12/21/2020 18:16:53",
      },
      {
        name: "Eleanor Pena",
        title: "Mutual NDA",
        lastModified: "12/21/2020 18:16:53",
        createdDate: "12/21/2020 18:16:53",
        signedon: "12/21/2020 18:16:53",
      },
      {
        name: "Courtney Henry",
        title: "Consulting",
        lastModified: "12/21/2020 18:16:53",
        createdDate: "12/21/2020 18:16:53",
        signedon: "12/21/2020 18:16:53",
      },
      {
        name: "Ronald Richards",
        title: "Mutual NDA",
        lastModified: "12/21/2020 18:16:53",
        createdDate: "12/21/2020 18:16:53",
        signedon: "12/21/2020 18:16:53",
      },
      {
        name: "Jerome Bell",
        title: "Consulting",
        lastModified: "12/21/2020 18:16:53",
        createdDate: "12/21/2020 18:16:53",
        signedon: "12/21/2020 18:16:53",
      },

      {
        name: "Darlene Robertson",
        title: "Mutual NDA",
        lastModified: "12/21/2020 18:16:53",
        createdDate: "12/21/2020 18:16:53",
        signedon: "12/21/2020 18:16:53",
      },

      {
        name: "Robert Fox",
        title: "Consulting",
        lastModified: "12/21/2020 18:16:53",
        createdDate: "12/21/2020 18:16:53",
        signedon: "12/21/2020 18:16:53",
      },
      {
        name: "Jenny Wilson",
        title: "Mutual NDA",
        lastModified: "12/21/2020 18:16:53",
        createdDate: "12/21/2020 18:16:53",
        signedon: "12/21/2020 18:16:53",
      },
      {
        name: "Savannah Nguyen",
        title: "Consulting",
        lastModified: "12/21/2020 18:16:53",
        createdDate: "12/21/2020 18:16:53",
        signedon: "12/21/2020 18:16:53",
      },
      {
        name: "Wade Warren",
        title: "Mutual NDA",
        lastModified: "12/21/2020 18:16:53",
        createdDate: "12/21/2020 18:16:53",
        signedon: "12/21/2020 18:16:53",
      },
      {
        name: "Leslie Alexander",
        title: "Consulting",
        lastModified: "12/21/2020 18:16:53",
        createdDate: "12/21/2020 18:16:53",
        signedon: "12/21/2020 18:16:53",
      },
    ],
    []
  );

  const isOpen = useSelector((state: any) => state.menuReducer.isOpen);
  const dispatch = useDispatch();

  return (
    <>
      <Head>
        <title>Paid-Dapp Agreeements</title>
        <link rel="icon" href="/assets/icon/.ico" />
      </Head>

      <div className="agreements m-0 p-0 px-4 container-fluid">
        <div className="row m-0 p-0 h-100">
          <div className="col-12 py-4 d-flex">
            <span
              tabIndex={0}
              className="d-flex"
              role="button"
              onClick={() => dispatch(setOpenMenu(!isOpen))}
              onKeyDown={() => dispatch(setOpenMenu(!isOpen))}
            >
              <img
                className="d-inline mr-5 hambunguer"
                src="/assets/icon/hamburguer.svg"
                alt=""
              />
            </span>
            <h3 className="d-flex mr-auto">Agreements</h3>
            <div className="d-flex">
              <Button className="btn-white mr-2" color="primary">
                Send
              </Button>
              <Button className="btn-white mr-2" color="primary">
                Received
              </Button>
              <Button className="btn-white mr-2" color="primary">
                <img src="/assets/icon/filter.svg" alt="" />
              </Button>
              <div className="form-group has-search">
                <img
                  className="search-icon"
                  src="/assets/icon/search.svg"
                  alt=""
                />
                <input
                  type="text"
                  className="form-control input-white"
                  placeholder="Search"
                />
              </div>
            </div>
          </div>
          <div className="col-12">
            <Card className="border-0 content">
              <Table columns={columns} data={data} />
              <Button className="new-agreement-button" color="primary">
                <img className="mr-1" src="/assets/icon/plus.svg" alt="" />
                New agreement
              </Button>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default Agreements;
