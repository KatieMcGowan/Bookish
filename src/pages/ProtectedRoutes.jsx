import React from "react";
import { Route, Navigate } from "react-router-dom";
import Cookies from "universal-cookie";

const ProtectedRoutes = ({ element: Element, ...rest }) => {
  const cookies = new Cookies();

  return (
    <Route
      {...rest}
      render={(props) => {
        const token = cookies.get("TOKEN");
        if (token) {
          return <Element {...props} />;
        } else {
          return (
            <Navigate
              replace to={{
                pathname: "/",
                state: {
                  from: props.location,
                },
              }}
            />
          );
        }
      }}
    />
  );
};

export default ProtectedRoutes;
