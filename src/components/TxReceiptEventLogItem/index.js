import React from 'react'
import { Row, Col } from 'antd'
import styled from 'styled-components'
import Link from 'components/Link/Link'
import TypeNumber from 'widgets/TypeNumber/index'
import { getEventLogMd } from 'utils/eventLogs'

const WrapperTx = styled.div`
  display: flex;
  margin-top: 10px;
  border-bottom: 0.5px solid ${({ theme }) => theme.colors.borderColor};
  overflow: auto;
  @media only screen and (min-width: 768px) {
    overflow: hidden;
  }

  .media-body-item-left {
    margin-right: 20px;

    @media only screen and (min-width: 576px) {
      margin-right: 0;
    }

    width: 10%;

    div {
      position: relative;
      line-height: 0;
      font-size: 14px;
      width: 43px;
      height: 43px;
      padding: 20px;
      color: #00c9a7;
      background: rgba(0, 201, 167, 0.1);
      border-color: transparent;
      border-radius: 50%;

      span {
        color: var(--primary);
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
    }
  }

  .media-body-item-right {
    width: 90%;
    .ant-row {
      margin-bottom: 8px;
    }
    .token-address {
      color: var(--primary);
    }
    .item-address-button {
      button {
        color: ${({ theme }) => theme.colors.blackColor};
        font-size: 10px;
        height: 27px;
        padding: 4px 8px;
        margin-left: 4px;
        background: transparent;
        border: 1px solid ${({ theme }) => theme.colors.borderColor};
        border-radius: 4px;
        &:hover {
          color: ${({ theme }) => theme.colors.blackColor};
          border: 1px solid ${({ theme }) => theme.colors.borderColor};
        }
        &:active {
          color: ${({ theme }) => theme.colors.blackColor};
          border: 1px solid ${({ theme }) => theme.colors.borderColor};
        }
        span:last-child {
          margin: 0;
        }
      }
    }

    .topic-items {
      margin-bottom: 6px;

      .item-hash-padding {
        padding: 4px 8px;
        background: #77838f1a;
        margin-right: 4px;
        border-radius: 4px;
      }
    }
    .ant-col-md-20 {
      .typeNumber-ul {
        list-style: none;
        padding: 16px 12px;
        border-radius: 4px;
        background: ${({ theme }) => theme.colors.backgroundWrapper};
      }
    }
  }
`

function TxReceiptEventLogItem({ dataItem, web3 }) {
  const md = getEventLogMd(dataItem.md)
  return (
    <WrapperTx>
      <div className="media-body-item-left">
        <div>
          <span>{dataItem.li}</span>
        </div>
      </div>
      <div className="media-body-item-right">
        <Row gutter={[12, 12]}>
          <Col span={24}>
            <Row>
              <Col xs={{ span: 24 }} md={{ span: 4 }}>
                Address
              </Col>
              <Col xs={{ span: 24 }} md={{ span: 20 }}>
                <Link href={`/address/${dataItem.a}`} className="token-address">
                  {dataItem.a}
                </Link>
                {/* <span className="item-address-button">
              <Dropdown
                overlay={
                  <Menu>
                    <Menu.Item key="1" icon={<UserOutlined />}>
                      Matches Topic[0]
                    </Menu.Item>
                  </Menu>
                }
              >
                <Button>
                  <ZoomInOutlined /> <DownOutlined />
                </Button>
              </Dropdown>
            </span> */}
              </Col>
            </Row>
          </Col>
          {md && (
            <Col span={24}>
              <Row>
                <Col xs={{ span: 24 }} md={{ span: 4 }}>
                  Name
                </Col>
                <Col xs={{ span: 24 }} md={{ span: 20 }}>
                  <p className="text-span text-monospace">
                    <span>
                      {md[0].event}
                      {/* &nbsp;(<span className="text-success">address</span>&nbsp;{' '}
                      <span className="text-danger">token</span>
                      ,&nbsp;&nbsp;
                      <span className="text-success">uint256</span> &nbsp;<span className="text-danger">total</span>)&nbsp;&nbsp; */}
                      {/* <Link href={`/address/${}#code`}>View Source</Link>{' '} */}
                    </span>
                  </p>
                </Col>
              </Row>
            </Col>
          )}
          <Col span={24}>
            <Row>
              <Col xs={{ span: 24 }} md={{ span: 4 }}>
                Topics
              </Col>
              <Col xs={{ span: 24 }} md={{ span: 20 }}>
                {dataItem.tp.map((value, index) => (
                  <div className="topic-items" key={`toptic-item-${index}`}>
                    <span className="item-hash-padding">{index}</span>
                    <span className="item-hash">{value}</span>
                  </div>
                ))}
              </Col>
            </Row>
          </Col>
          <Col span={24}>
            <Row>
              <Col xs={{ span: 24 }} md={{ span: 4 }}>
                Data
              </Col>
              <Col xs={{ span: 24 }} md={{ span: 20 }}>
                <ul className="typeNumber-ul">
                  {(() => {
                    const { length } = dataItem.d
                    const cutData = dataItem.d.slice(2, dataItem.d.length)
                    const splitCount = Math.floor(length / 64)
                    return new Array(splitCount).fill(undefined).map((_, index) => {
                      return (
                        <TypeNumber
                          key={index}
                          mapkey={`data-decode-item-${index}`}
                          dataItem={cutData.slice(index * 64, (index + 1) * 64)}
                          web3={web3}
                        />
                      )
                    })
                  })()}
                </ul>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    </WrapperTx>
  )
}
export default TxReceiptEventLogItem
