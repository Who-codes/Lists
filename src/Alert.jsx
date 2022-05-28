import React, { useEffect } from "react";

const Alert = ({ type, msg, removeAlert }) => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      removeAlert();
      return clearInterval(timeout);
    }, 3000);
  }, []);
  return <p className={`alert alert-${type}`}>{msg}</p>;
};

export default Alert;
