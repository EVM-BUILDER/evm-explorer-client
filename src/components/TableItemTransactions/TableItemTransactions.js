import React from 'react'
import ReactTimeAgo from 'react-time-ago'
import { Link } from 'components/Link'
import { formatCode, numberFormatter } from 'library/helpers/CommonHelper'
import { useSelector } from 'react-redux'
import ToTokenAddress from 'components/Token/ToTokenAddress'

const TableItemTransactions = ({ dataItem }) => {
  const { settings } = useSelector((state) => state.Settings)

  return (
    <div className="row">
      <div className="col-sm-4">
        <div className="col-sm-4-content">
          <div className="display-none">
            <span className="non-outside">
              <span className="non-inside">TX</span>
            </span>
          </div>
          <div className="display-block-transactions">
            <div className="col-sm-4-content-block">Tx#</div>
            <Link href={`/tx/${dataItem?.h}`}>{formatCode(dataItem?.h, 8, 5)}</Link>
            <p className="block-small-transactions">
              <ReactTimeAgo date={parseInt(dataItem?.ti || 0) * 1000} locale="en-US" timeStyle="round" />
            </p>
          </div>
        </div>
      </div>
      <div className="col-sm-8">
        <div className="content-transactions">
          <div className="show-content-transactions">
            <span>
              <div style={{ whiteSpace: 'nowrap' }}>
                <span>From</span>
                <Link href={`/address/${dataItem?.f?.a || ''}`} className="content-hasktag">
                  {formatCode(dataItem?.f?.a || '', 20, 0)}
                </Link>
              </div>
              <div style={{ whiteSpace: 'nowrap' }}>
                <span>To </span>
                {dataItem?.ca ? (
                  <Link href={`/address/${dataItem?.ca?.a || ''}`}>
                    {dataItem?.ca?.pro?.na ? dataItem?.ca?.pro?.na : formatCode(dataItem?.ca?.a || '', 20, 0)}
                  </Link>
                ) : dataItem?.t ? (
                  <Link href={`/address/${dataItem?.t?.a || ''}`}>{formatCode(dataItem?.t?.a || '', 20, 0)}</Link>
                ) : (
                  <Link>Unknown</Link>
                )}
              </div>
            </span>
            <div>
              <div className="show-content-hide-transactions">
                <div className="content-text">
                  {`${(dataItem?.v / 1e18).toLocaleString('en-GB', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 5,
                  })} ${settings?.chain?.native?.symbol || ''}`}
                </div>
              </div>
            </div>
          </div>
          <div className="hide-content-transactions">
            <div className="content-text">
              {`${(dataItem?.v / 1e18).toLocaleString('en-GB', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 5,
              })} ${settings?.chain?.native?.symbol || ''}`}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TableItemTransactions
