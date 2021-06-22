import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import { Layout } from "antd";

import Invoices from "./components/invoices";
import Customers from "./components/customers";

import { loadCustomers } from "./redux/modules/best-customers-module";
import { loadCategories } from "./redux/modules/best-categories-module";
import { loadMonthlyRevenues } from "./redux/modules/monthly-revenues-module";
import { loadWeeklyRevenues } from "./redux/modules/weekly-revenues-module";
import DashboardHeader from "./components/dashboard-header";

const { Header, Footer, Content } = Layout;

function App(): JSX.Element {
  return (
    <div className="App">
      <Layout>
        <Header>
          <DashboardHeader />
        </Header>

        <Content>
          <Invoices />
          <Customers />
        </Content>
        <Footer>Footer</Footer>
      </Layout>
    </div>
  );
}

export default App;
