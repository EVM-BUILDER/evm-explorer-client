import { useEffect, useState } from 'react'
import { getDateToDate } from 'library/helpers/Date'

export const STEEP_COUNT = {
  SOON: 0,
  START: 1,
  END: 2,
}

function useCountTime(start, end) {
  const [counter, updateCounter] = useState({
    weekdays: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    step: STEEP_COUNT.SOON,
  })

  useEffect(() => {
    function run() {
      const currentTime = new Date().getTime()

      if (currentTime < start) {
        const countdown = getDateToDate(currentTime, start)
        updateCounter({
          ...countdown,
          step: STEEP_COUNT.SOON,
        })
      } else if (currentTime >= start && currentTime <= end) {
        const countdown = getDateToDate(currentTime, end)
        updateCounter({
          ...countdown,
          step: STEEP_COUNT.START,
        })
      } else if (currentTime > end) {
        updateCounter({
          weekdays: 0,
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          step: STEEP_COUNT.END,
        })
      }
    }

    if (start && end) {
      const interval = setInterval(() => run(), 1000)
      return () => clearInterval(interval)
    }
    return () => null
  }, [start, end])

  return counter
}
export default useCountTime
