export const getEventLogMd = (md) => {
  if (!md) return null
  try {
    return JSON.parse(md)
  } catch (error) {
    return null
  }
}
