import { authenticationService } from "../service/authenticationService";

export const handleResponse = response => {
  return response.text().then(text => {
    let data;
    try {
      data = JSON.parse(text);
    } catch (e) {
      data = { err: text };
    }
    if (!response.ok) {
      if ([401, 403].indexOf(response.status) !== -1) {
        // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
        authenticationService.logout();
        // location.reload(true);
      }

      // const error = (data && data.message) || response.statusText;
      return Promise.reject(data);
    }

    return data;
  })
};
