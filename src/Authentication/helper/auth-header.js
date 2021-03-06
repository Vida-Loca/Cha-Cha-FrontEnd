/* eslint-disable no-undef */
/* eslint-disable import/prefer-default-export */
export const authHeader = () => {
  const currentUser = localStorage.getItem("currentUser");
  if (currentUser) {
    return {
      "Content-Type": "application/json",
      Authorization: currentUser.substring(1, currentUser.length - 1),
    };
  }
  return {};
};
