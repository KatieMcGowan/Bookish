import React, { useState, useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import Cookies from "universal-cookie";
import UserQuery from "../queries/UserQuery";

// const ProtectedRoutes = ({ element: Element, ...rest }) => {
//   const cookies = new Cookies();

//   return (
//     <Route
//       {...rest}
//       render={(props) => {
//         const token = cookies.get("TOKEN");
//         if (token) {
//           return <Element {...props} />;
//         } else {
//           return (
//             <Navigate
//               replace to={{
//                 pathname: "/",
//                 state: {
//                   from: props.location,
//                 },
//               }}
//             />
//           );
//         }
//       }}
//     />
//   );
// };

const ProtectedRoutes = () => {
  const cookies = new Cookies();

  // const token = {token: cookies.get("TOKEN")}
  const token = cookies.get("TOKEN");

  if (!token) {
    return <Navigate to={"/login"} replace />
  }
  return <Outlet context={token}/>;
}

export default ProtectedRoutes;

//Brainstorm how to handle club permissions
//Maybe keep an array of clubs 

//Cookie persists, maybe I can have useEffect for user on app page, and hand down id and clubs as props