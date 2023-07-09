import React from "react";
import { ProgressBar } from "react-loader-spinner";

import { Wrapper } from "./loader.styled";

const Loader: React.FC = () => {
  return (
    <Wrapper>
      <ProgressBar
        height="120px"
        width="120px"
        ariaLabel="progress-bar-loading"
        borderColor="#667b68"
        barColor="#a3b899"
      />
    </Wrapper>
  );
};

export default Loader;
