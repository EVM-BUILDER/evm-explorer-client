import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import useQueryUrl from 'hooks/useQueryUrl'

const Pagination = ({ page }) => {
  const [currentPage, setCurrentPage] = useState(1)

  const router = useRouter()
  const { query, pathname } = router

  // Get limit from url
  const { limit } = useQueryUrl()

  useEffect(() => {
    // Check page change
    if (query.page) {
      let p = Number(query.page) >= 1 ? query.page : 1
      setCurrentPage(Number(p))
    }

    console.log(query)
  }, [query.page])

  // Handle button first
  const handleFirst = (pageIndex) => {
    router.replace(`?page=${pageIndex}&limit=${limit}`)
  }

  // Handler button decrease
  const handleDecrement = (pageIndex) => {
    let p = pageIndex >= 1 ? pageIndex : 1

    router.replace(`?page=${p}&limit=${limit}`)
  }

  // Handler button increase
  const handleIncrement = (pageIndex) => {
    let p = pageIndex > page ? page : pageIndex

    router.replace(`?page=${p}&limit=${limit}`)
  }

  // Handler button last
  const handleLast = (pageIndex) => {
    router.replace(`?page=${pageIndex}&limit=${limit}`)
  }

  return (
    <div className="pagination">
      <button className="first" onClick={() => handleFirst(1)}>
        First
      </button>
      <button className="previous" onClick={() => handleDecrement(currentPage - 1)}>
        <span>&#60;</span>
      </button>
      <div className="number">
        Page {currentPage} of {page}
      </div>
      <button className="next" onClick={() => handleIncrement(currentPage + 1)}>
        <span>&#62;</span>
      </button>
      <button className="last" onClick={() => handleLast(page)}>
        Last
      </button>
    </div>
  )
}

export default Pagination
