/* eslint-disable import/prefer-default-export */
export const parseQuery = (queryString) => {
  const query = {};
  const pairs = (queryString[0] === "?" ? queryString.substr(1) : queryString).split("&");
  for (let i = 0; i < pairs.length; i += 1) {
    const pair = pairs[i].split("=");
    query[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || "");
  }
  return query;
};
