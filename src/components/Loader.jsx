import React from "react";
import { Grid } from "react-loader-spinner";

const Loader = () => {
  return (
    <Grid
      height="80"
      width="80"
      color="#fffed4"
      ariaLabel="grid-loading"
      radius="12.5"
      wrapperStyle={{}}
      wrapperClass=""
      visible={true}
    />
  );
};

export default Loader;
