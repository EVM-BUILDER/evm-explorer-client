import styled from 'styled-components'

export const WTxDetailOverview = styled.div`
  .loading-wrapper {
    padding: 20px 15px;
    text-align: center;
  }

  .ant-tabs-content-holder {
    font-size: 16px;
    line-height: 21px;
  }

  .card-content-item {
    border-color: var(--border-color);
    word-break: break-word;

    &.no-border-bottom {
      border-bottom: none;
    }

    .tx-left-title {
      font-size: 14px;
      font-weight: 500;
    }

    .tx-item {
      display: flex;
      & > div {
        display: inline-block;
        margin-right: 6px;
        img {
          width: 18px;
          min-width: 18px;
        }
      }
    }

    .ant-col-md-8 {
      .ant-space-horizontal {
        margin-right: 4px;
      }

      .ant-space-item {
        img {
          width: 21px;
          margin-left: -2px;
        }
      }

      .non-position-item-span {
        position: relative;
        color: var(--text);
        margin-left: 4px;
        padding: 0px 8px;
        border-radius: 4px;
        background: var(--background-span);
        border: none;

        &:active {
          border: none;
        }
      }
    }

    .ant-col-md-16 {
      .item-status {
        color: #00c9a7;
        background-color: rgba(0, 201, 167, 0.1);
        padding: 6px 11px;
        font-size: 12.2px;
        border-radius: 4px;

        .ant-space-item {
          margin-right: 4px;

          path {
            fill: #00c9a7;
          }

          .status-success {
            background: none;
          }
        }
      }

      .item-clock {
        color: var(--primary);
        margin-left: 4px;
      }

      .item-block-stickers {
        position: relative;
        margin-left: 8px;

        .ant-btn {
          border-radius: 4px;
          color: var(--text);
          background-color: var(--tertiary);
          display: inline-block;
          font-weight: 400;
          font-size: 14px;
          line-height: 18px;
          padding: 0 10px;
          margin: 0;
          height: 24px;
        }
      }

      .item-timestamp-icons {
        color: var(--text);
        text-decoration: none;
        background-color: transparent;
        outline: none;
        cursor: pointer;
        font-size: 14px;
        transition: color 0.3s;
      }

      .item-clock-time {
        color: var(--black-color);
        margin-left: 4px;
      }

      .item-hash-contract {
        color: var(--primary);
        margin-left: 4px;
      }

      .link-with-copy {
        display: flex;
        .icon-left,
        .icon-right {
          width: 18px;
          min-width: 18px;
        }
      }

      .to-contract {
        display: flex;
        align-items: center;
        color: var(--primary);

        .arrow-right-icon {
          width: 16px;
          fill: transparent;
          stroke: var(--primary);
          margin-right: 10px;
        }
        .file-address {
          display: inline-flex;
          align-items: center;
          svg {
            fill: var(--primary);
            width: 16px;
            margin-right: 2px;
          }
        }
      }

      .card-content-item-value {
        margin-right: 4px;
        padding: 3px 10px;
        color: var(--text);
        border-radius: 4px;
        background: var(--tertiary);
        font-weight: 400;
        font-size: 14px;
        line-height: 18px;
        display: inline-block;
        height: 24px;
        min-height: 24px;
        white-space: nowrap;

        &:focus {
          box-shadow: none;
        }
      }

      .card-content-item-price {
        margin-right: 4px;
        padding: 3px 10px;
        color: var(--primary);
        border-radius: 4px;
        background: var(--tertiary);
        font-weight: 400;
        font-size: 14px;
        line-height: 18px;
        white-space: nowrap;
        height: 24px;
      }

      .u-label {
        padding: 4px 21.5px;
        border-radius: 4px;
        font-weight: 400;
        font-size: 12px;
        line-height: 16px;
        color: var(--tertiary);

        & > span {
          margin-right: 6px;
        }
      }

      .u-label--success {
        background-color: var(--primary);
      }

      .u-label--danger {
        background-color: var(--warning);
      }

      .non-position-item-span {
        color: var(--text);
        margin-left: 4px;
        padding: 0px 8px;
        border-radius: 4px;
        background: #77838f1a;
        border: none;

        &:active {
          border: none;
        }
      }

      textarea {
        margin-top: 10px;
        width: 100%;
        // height: 149px;
        padding: 12px;
        color: var(--text);
        border-radius: 4px;
        box-shadow: var(--color-shadow);
        line-height: 1.8;

        &:focus {
          border-color: var(--primary);
        }
      }

      Button {
        color: var(--white);
        background-color: var(--text-span);
        border-color: var(--text-span);
        border-radius: 4px;
        cursor: pointer;
        font-size: 10.5px;
        padding: 4.8px 9.6px;
      }

      .transaction-action-list {
        li {
          list-style: none;
          margin-bottom: -15px;

          img {
            width: 15px;
            height: 15px;
            margin: 0 4px;
          }

          .item-hash-transaction {
            color: var(--black-color);
            cursor: default;

            a {
              span:first-child {
                color: var(--primary);
                cursor: pointer;
              }

              span:last-child {
                color: var(--primary);
                cursor: pointer;
              }
            }

            span {
              color: var(--black-color);
              margin: 0 4px;
            }

            a:last-child {
              color: var(--primary);
              cursor: pointer;
            }
          }
        }

        li {
          span:first-child {
            margin-right: 4px;
          }

          span:nth-child(2) {
            margin-right: 4px;
          }

          span:nth-child(3) {
            margin-right: 4px;
            color: var(--text);
          }

          a {
            color: var(--primary);
          }
        }
      }
    }

    .text-area-private {
      height: auto;
      border-color: var(--secondary);
      outline: 0;
      border-radius: 4px;
      padding: 5px 8px;
      font-size: 95%;
    }

    .text-private {
      font-weight: 400;
      font-size: 16px;
      line-height: 21px;
      color: var(--text);

      a {
        color: var(--primary);
      }
    }
  }

  .collapse-click {
    color: var(--primary);

    span {
      span {
        margin: 0 4px;
      }
    }
  }
`
