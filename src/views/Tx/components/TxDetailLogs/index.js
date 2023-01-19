import Web3 from 'library/web3/Web3'
import TxReceiptEventLogItem from 'components/TxReceiptEventLogItem'

const { web3 } = new Web3()

const TxDetailLogs = ({ txDetail }) => {
  return (
    <div className="card-body">
      <h6>Transaction Receipt Event Logs</h6>
      {txDetail?.l?.length > 0 ? (
        <>
          {txDetail.l.map((item, index) => {
            return <TxReceiptEventLogItem key={`log-item-${index}`} dataItem={item} web3={web3} />
          })}
        </>
      ) : (
        'Empty'
      )}
    </div>
  )
}

export default TxDetailLogs
