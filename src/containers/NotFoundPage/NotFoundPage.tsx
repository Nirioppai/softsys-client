import React, { FC } from "react";
import { Helmet } from "react-helmet-async";
import { Typography } from "@material-ui/core";

const NotFoundPage: FC = () => {
  return (
    <>
      <Helmet title="404" />
      <Typography variant="h1">Page not found</Typography>
    </>
  );
};

export default NotFoundPage;
