import momentTimezone from 'moment-timezone'

export function getDateToDate(t0, t1) {
  const d = new Date(t1).getTime() - new Date(t0).getTime()
  const weekdays = Math.floor(d / 1000 / 60 / 60 / 24 / 7)
  const days = Math.floor(d / 1000 / 60 / 60 / 24 - weekdays * 7)
  const hours = Math.floor(d / 1000 / 60 / 60 - weekdays * 7 * 24 - days * 24)
  const minutes = Math.floor(d / 1000 / 60 - weekdays * 7 * 24 * 60 - days * 24 * 60 - hours * 60)
  const seconds = Math.floor(
    d / 1000 - weekdays * 7 * 24 * 60 * 60 - days * 24 * 60 * 60 - hours * 60 * 60 - minutes * 60,
  )
  const milliseconds = Math.floor(
    d -
      weekdays * 7 * 24 * 60 * 60 * 1000 -
      days * 24 * 60 * 60 * 1000 -
      hours * 60 * 60 * 1000 -
      minutes * 60 * 1000 -
      seconds * 1000,
  )
  const t = {
    end: d <= 0,
  }

  Object.entries({ weekdays, days, hours, minutes, seconds, milliseconds }).forEach(([key, value]) => {
    if (d > 0) {
      t[key] = value
    } else {
      t[key] = 0
    }
  })
  return t
}

export const formatDate = (date, format = 'YYYY/MM/DD HH:mm:ss') => {
  // const country = JSON.parse(localStorage.getItem("userInfo"));
  const country = 'Asia/Ho_Chi_Minh'
  if (date) {
    const tz = momentTimezone(date)
    const time = tz.tz(country).format(format)
    return time
  }
  return ''
}
