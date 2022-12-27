import request from "services/request";

export const getListTransactions = async (params) =>
  request({
    url: `/transaction`,
    method: "GET",
    params,
    isAuth: false,
  });

export const getTransactionDetail = async (txnHash) =>
  request({
    url: `/transaction/${txnHash}`,
    method: "GET",
    isAuth: false,
  });
