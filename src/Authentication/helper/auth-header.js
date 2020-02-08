import { authenticationService } from "../service";
// eslint-disable-next-line import/prefer-default-export
export function authHeader() {
  // return authorization header with jwt token
  const currentUser = localStorage.getItem("currentUser");
  if (currentUser) {
    return {
      "Content-Type": "application/json",
      Authorization: currentUser.substring(1, currentUser.length - 1)
    };
  }
  return {};
}
