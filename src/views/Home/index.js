import React, { useMemo, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Banner from 'widgets/Banner'
import Link from 'components/Link/Link'
import SearchInput from 'components/SearchInput'
import TableLatest from 'components/TableLatest/TableLatest'
import TableTransactions from 'components/TableTransactions/TableTransactions'
import MainBox from 'components/MainBox/MainBox'
import { getListStatistics } from 'redux/statistics/actions'
import { getListBlocks } from 'redux/blocks/actions'
import useFetchAllTransactions from 'redux/transactions/hooks/useFetchAllTransactions'
import { useAds } from 'redux/statistics/hooks'

const HomeView = () => {
  const dispatch = useDispatch()

  const { blocks } = useSelector((state) => state.Blocks)
  const { statistics } = useSelector((state) => state.Statistics)
  const { settings } = useSelector((state) => state.Settings)

  const { adsText } = useAds()

  const { transactions } = useFetchAllTransactions(1, 10)

  console.log('transactions', transactions)

  const latestBlock = useMemo(() => {
    return blocks?.[0]
  }, [blocks])

  useEffect(() => {
    dispatch(getListStatistics({ page: 1, page_size: 12 }))
    dispatch(getListBlocks({ page: 1, page_size: 10 }))
  }, [dispatch])

  return (
    <div className="home">
      <section className="bg-dark">
        <div className="container">
          <div className="home__body">
            <div className="body-left">
              <h1>{settings?.chain?.name || ''}</h1>
              <SearchInput />
              {adsText && (
                <p className="ads-text">
                  {adsText.text}{' '}
                  {adsText.url && (
                    <Link href={adsText.url} target="_blank" rel="noreferrer">
                      View now !
                    </Link>
                  )}
                </p>
              )}
            </div>
            <div className="body-right">
              <Banner />
            </div>
          </div>
        </div>
      </section>
      <div className="container container-home-bottom">
        <div className="row-card" style={{ marginTop: '-50px' }}>
          <MainBox latestBlock={latestBlock} totalTxs={transactions?.total} statistics={statistics} />
        </div>
        <div className="home-table">
          <div className="card wrap-latest wrap-latest-block">
            <div className="table-header">
              <h2>Latest Block</h2>
            </div>
            <TableLatest blocks={blocks?.slice(0, 10)} />
            <div className="table-footer">
              <Link href="/blocks" className="btn-soft-primary">
                View all Blocks
              </Link>
            </div>
          </div>
          <div className="card wrap-latest wrap-latest-transactions">
            <div className="table-header">
              <h2>Latest Transactions</h2>
            </div>
            <TableTransactions transactions={transactions?.data?.slice(0, 10)} />
            <div className="table-footer">
              <Link href="/txs" className="btn-soft-primary">
                View all Transactions
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomeView
