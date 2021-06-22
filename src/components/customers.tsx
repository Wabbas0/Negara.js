import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table } from "antd";
import {
  loadCustomers,
  customersSelector,
} from "../redux/modules/best-customers-module";

// interface HeaderProps {}

const Customers = (): JSX.Element | null => {
  const dispatch = useDispatch();
  const { loading, error, data } = useSelector(customersSelector);

  const columns = [
    {
      title: "Name",
      dataIndex: "customer_name",
      key: "customer_name",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Invoices count",
      dataIndex: "invoices_count",
      key: "invoices_count",
    },
    {
      title: "Total Revenue",
      dataIndex: "total_revenue",
      key: "total_revenue",
    },

    {
      title: "Total Margin",
      dataIndex: "total_margin",
      key: "total_margin",
    },
  ];

  useEffect(() => {
    dispatch(loadCustomers());
  }, [dispatch]);

  return data.length > 0 ? <Table dataSource={data} columns={columns} /> : null;
};

export default Customers;
