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

  const token = cookies.get("TOKEN");

  const [user, setUser] = useState({
    id: "",
    displayname: "",
    // clubsmember: [],
    // clubsadmin: [],
  })

  useEffect(() => {
    if (token) {
      UserQuery.getid({token: token})
      .then(id => {
        UserQuery.show(id.userId)
        .then(user => {
          setUser({
            id: user._id,
            displayname: user.displayname,
            // clubsmember: user.clubsmember,
            // clubsadmin: user.clubsadmin
          });
        });
      });
    };
  }, [token]);

  if (!token) {
    return <Navigate to={"/login"} replace />
  }
  return <Outlet context={user}/>;
}

export default ProtectedRoutes;