import request from "services/request";

export const getStatistics = async (params) =>
  request({
    url: `/statistics`,
    method: "GET",
    params,
    isAuth: false,
  });
