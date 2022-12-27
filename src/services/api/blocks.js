import request from "services/request";

export const getListBlocks = async (params) =>
  request({
    url: `/block`,
    method: "GET",
    params,
    isAuth: false,
  });

export const getBlockDetail = async (block_number) =>
  request({
    url: `/block/${block_number}`,
    method: "GET",
    isAuth: false,
  });