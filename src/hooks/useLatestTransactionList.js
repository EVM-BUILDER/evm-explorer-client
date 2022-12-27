import { useEffect, useState } from 'react'
import { sleep } from 'library/helpers/Misc'
import Web3 from '../library/web3/Web3'
import { CACHE_TRANSACTION } from '../redux/transactions/reducer'

const web3 = new Web3()

async function getTxhByBlockNumber(cbs) {
  let lastBlock = await web3.getLastedBlockNumber()
  let currentBlockNumber = lastBlock
  let txCount = 0
  while (txCount < 10) {
    currentBlockNumber = currentBlockNumber - 1
    const blockTx = await web3.getBlock(currentBlockNumber)
    txCount = txCount + blockTx.transactions.length
    // console.log(currentBlockNumber, txCount)
    if (cbs && blockTx.transactions.length > 0) cbs(blockTx)
    await sleep(100)
  }
}

export default function useLatestTransactionList(blockNumber) {
  const [transactions, setTransactions] = useState({})
  useEffect(() => {
    if (!blockNumber) {
      const cacheTxh = localStorage.getItem(CACHE_TRANSACTION)
      if (cacheTxh) {
        const parseTxh = JSON.parse(cacheTxh)
        if (typeof parseTxh === 'object') {
          setTransactions(parseTxh)
        }
      }
    }
  }, [blockNumber])
  useEffect(() => {
    if (!blockNumber) {
      getTxhByBlockNumber((result) => {
        let obj = {}
        result.transactions.forEach(async (txh) => {
          const txhReceipt = await web3.getTransactionReceipt(txh)
          const txhDetail = await web3.getTransaction(txh)
          obj[txh] = {
            txh,
            blockDetail: result,
            txhReceipt,
            txhDetail,
          }

          setTransactions((prev) => {
            const mapTxh = { ...prev, ...obj }
            const sortingTxh = Object.values(mapTxh).sort((a, b) => b.blockDetail.timestamp - a.blockDetail.timestamp)
            const newObj = {}
            sortingTxh.forEach((item) => {
              newObj[item.txh] = item
            })
            localStorage.setItem(CACHE_TRANSACTION, JSON.stringify(newObj))
            return newObj
          })
        })
      })
    }
  }, [blockNumber])
  return {
    transactions,
  }
}
