import siteConfig from 'config/site.config'
import request from 'services/request'

export const getSettings = async (params) =>
    request({
        url: `/setting/get`,
        method: 'GET',
        params,
        isAuth: false,
    })

export const getDefaultSettings = async (params) =>
    request({
        url: `${siteConfig.s3FileUrl}/setting.json`,
        method: 'GET',
        params,
        isAuth: false,
    })
