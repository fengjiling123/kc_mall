import React from "react";
import "./index.less";
import { ActivityIndicator } from "antd-mobile";

const AsynLoadingComponent = ({ isLoading, error, pastDelay }) => {
  if (error) {
    window.location.reload();
  } else if (isLoading && pastDelay) {
    return (
        <div
            style={{ display: "flex", justifyContent: "center", marginTop: "30px" }}
        >
          <ActivityIndicator animating />
        </div>
    );
  } else {
    return null;
  }
};

export default AsynLoadingComponent;
