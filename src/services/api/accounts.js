import request from "services/request";

export const getListAccounts = async (params) =>
  request({
    url: `/address`,
    method: "GET",
    params,
    isAuth: false,
  });

export const getAccountDetail = async (block_number) =>
  request({
    url: `/address/${block_number}`,
    method: "GET",
    isAuth: false,
  });