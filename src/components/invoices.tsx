import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table } from "antd";
import {
  loadInvoices,
  invoicesSelector,
} from "../redux/modules/invoices-module";

// interface HeaderProps {}

const Invoices = (): JSX.Element | null => {
  const dispatch = useDispatch();
  const { loading, error, data } = useSelector(invoicesSelector);

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Costumer Name",
      dataIndex: "customer_name",
      key: "customer_name",
    },
    {
      title: "Region",
      dataIndex: "region",
      key: "region",
    },
    {
      title: "Invoice total",
      dataIndex: "total_invoice",
      key: "total_invoice",
    },

    {
      title: "Total Margin",
      dataIndex: "total_margin",
      key: "total_margin",
    },
  ];

  useEffect(() => {
    dispatch(loadInvoices());
  }, [dispatch]);

  return data.length > 0 ? <Table dataSource={data} columns={columns} /> : null;
};

export default Invoices;
