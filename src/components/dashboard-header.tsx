import React, { useState, useEffect } from "react";
import { PageHeader, Button } from "antd";

// interface HeaderProps {}

const Header = () => {
  return (
    <PageHeader
      className="site-page-header"
      onBack={() => null}
      title="Title"
      subTitle="This is a subtitle"
      extra={[
        <Button key="3">Operation</Button>,
        <Button key="2">Operation</Button>,
        <Button key="1" type="primary">
          Primary
        </Button>,
      ]}
    />
  );
};

export default Header;
