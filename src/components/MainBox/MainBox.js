import React, { useState } from 'react'
import dynamic from 'next/dynamic'
import { Col, Row, Space } from 'antd'

import { numberFormatter } from 'library/helpers/CommonHelper'
import moment from 'moment-timezone'
import { useSelector } from 'react-redux'
import FormatAmount from 'components/FormatAmount'
import { roundNumber } from 'library/helpers/Number'
import useMatchBreakpoints from 'hooks/useMatchBreakpoints'

const ApexCharts = dynamic(() => import('react-apexcharts'), { ssr: false, loading: () => <p>Loading ...</p> })

const MainBox = ({ latestBlock, totalTxs, statistics }) => {
    const { settings } = useSelector((state) => state.Settings)
    const { nativePrice } = useSelector((state) => state.Statistics)

    const { isMobile } = useMatchBreakpoints()

    const statisticsDataChart = statistics ? [...statistics] : []

    const chart = {
        options: {
            colors: ['#3C3A3A'],
            chart: {
                id: 'basic-bar',
                toolbar: {
                    show: false,
                },
                offsetX: -14,
            },
            xaxis: {
                offsetX: isMobile ? 26 : 16,
                offsetY: isMobile ? 20 : 5,
                categories: statisticsDataChart?.map((it) => moment(it.da, 'YYYY/MM/DD').format('MMM DD YYYY')),
                tickAmount: 2,
                labels: {
                    formatter: function (value, timestamp, opts) {
                        return moment(value, 'MMM DD YYYY').format('MMM DD')
                    },
                },
            },
            yaxis: {
                tickAmount: 2,
            },
            grid: {
                xaxis: {
                    lines: {
                        show: false,
                    },
                },
                yaxis: {
                    lines: {
                        show: false,
                    },
                },
            },
            stroke: {
                curve: 'smooth',
                width: 1,
            },
            tooltip: {
                x: {
                    show: true,
                    formatter: function (value, { dataPointIndex }) {
                        return moment(statisticsDataChart?.[dataPointIndex]?.da, 'YYYY/MM/DD').format('MMM DD, YYYY')
                    },
                },
            },
        },
        series: [
            {
                name: 'Transactions',
                data: statisticsDataChart.map((it) => it?.tt || 0),
            },
        ],
    }

    const latestStatistic = statistics?.[0] || {}

    return (
        <Row
            gutter={[
                { xs: 0, md: 32 },
                { xs: 0, md: 32 },
            ]}
            className="row-body"
        >
            <Col xs={24} sm={24} md={24} lg={8} className="col-item">
                <div className="col-left-1">
                    <div className="body-img">
                        <img
                            src={settings?.statistics?.icon_price ? settings.statistics.icon_price : '/images/icon/price.png'}
                            alt=""
                        />
                    </div>
                    <div className="body-content">
                        <h2>PRICE</h2>
                        <Space className="body-content-text-under">
                            <span className="text-secondary">
                                ${<FormatAmount value={roundNumber(nativePrice?.price || 0, { scale: 5 })} nullValue="--" />}
                            </span>
                            {nativePrice?.isUp ? (
                                <span className="text-success">+{nativePrice?.perChange || 0}%</span>
                            ) : (
                                <span className="text-warning">-{nativePrice?.perChange || 0}%</span>
                            )}
                            {/* {latestStatistic?.tp?.dif > 0 ? (
                <span className="text-success"> {roundNumber(latestStatistic?.tp?.dif, { scale: 3 })}%</span>
              ) : (
                <span className="text-warning "> {roundNumber(latestStatistic?.tp?.dif, { scale: 3 })}%</span>
              )} */}
                        </Space>
                    </div>
                </div>
                <div className="col-left-1">
                    <div className="body-img">
                        <img
                            src={
                                settings?.statistics?.icon_market_cap
                                    ? settings.statistics.icon_market_cap
                                    : '/images/icon/marketcap.png'
                            }
                            alt=""
                        />
                    </div>
                    <div className="body-content">
                        <h2>MARKET CAP</h2>
                        <a className="body-content-text-under">${numberFormatter(latestStatistic?.mc * 1, 2)}</a>
                    </div>
                </div>
            </Col>
            <Col xs={24} sm={24} md={24} lg={8} className="col-item">
                <div className="col-left-1 col-center-1">
                    <div className="col-center-left-container">
                        <div className="body-img">
                            <img
                                src={
                                    settings?.statistics?.icon_transactions
                                        ? settings.statistics.icon_transactions
                                        : '/images/icon/transactions.png'
                                }
                                alt=""
                            />
                        </div>
                        <div className="body-content">
                            {/* Is total txh per secon (TPS) */}
                            <h2>TRANSACTIONS</h2>
                            <a className="body-content-text-under">{totalTxs || '0'}</a>
                        </div>
                    </div>
                    <div className="body-right med-gas-price">
                        <h2>MED GAS PRICE</h2>
                        <div className="gas-value">
                            <a style={{ marginRight: '4px' }}>{nativePrice?.gasPrice} Gwei</a>
                            {nativePrice && (
                                <span>
                                    (<FormatAmount value={nativePrice?.gasPriceUsd} prefix="$" nullValue="0.00" />)
                                </span>
                            )}
                        </div>
                    </div>
                </div>
                <div className="col-left-1 col-center-2">
                    <div className="body-img">
                        <img
                            src={settings?.statistics?.icon_block ? settings.statistics.icon_block : '/images/icon/finalized.png'}
                            alt=""
                        />
                    </div>
                    <div className="body-content">
                        <h2>LAST FINALIZED BLOCK</h2>
                        <a className="body-content-text-under">{latestBlock?.bn}</a>
                    </div>
                </div>
            </Col>
            <Col xs={24} sm={24} md={24} lg={8} className="col-item">
                <div className="mixed-chart">
                    <h2>TRANSACTION HISTORY IN 12 DAYS</h2>
                    <ApexCharts
                        className="mixed-chart-item"
                        width="100%"
                        height="180px"
                        type="line"
                        options={chart.options}
                        series={chart.series}
                    />
                </div>
            </Col>
        </Row>
    )
}

export default MainBox
