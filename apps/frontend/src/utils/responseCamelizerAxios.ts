import axios from "axios";
import camelCaseKeys from "camelcase-keys";
import { decamelizeKeys } from "humps";
const responseCamelizerAxios = axios.create();

responseCamelizerAxios.interceptors.response.use(
  function (response) {
    return {
      ...response,
      data: camelCaseKeys(response.data, { deep: true }),
    };
  },
  function (error) {
    return Promise.reject(error);
  }
);

responseCamelizerAxios.interceptors.request.use(function (request) {
  if (
    !!request.data === false &&
    !!(request.headers as any)["Content-type"] === false
  )
    return request;

  if (!!request.params) {
    request.params = decamelizeKeys(request.params);
  }
  request.data = decamelizeKeys(request.data, {
    separator: "_",
  });

  return request;
});

export default responseCamelizerAxios;
