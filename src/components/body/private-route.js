import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

export default function PrivateRoute({ element: Component, ...rest }) {
  let access = false;

  const token = localStorage.getItem("token");
  if (token) {
    const decodedToken = jwtDecode(token);
    if (decodedToken.exp * 1000 > Date.now()) {
      access = false;
    } else {
      access = true;
    }
  } else {
    access = true;
  }

  return !access ? <Component {...rest} /> : <Navigate to="/login" />;
}
