import axios from 'axios'

// get info tele at link: https://api.telegram.org/bot5590904730:AAFChiqFBwppJTGupdx8jzUh3xEq9iyjBRY/getUpdates
// helper: https://stackoverflow.com/questions/32423837/telegram-bot-how-to-get-a-group-chat-id
const botToken = '5590904730:AAFChiqFBwppJTGupdx8jzUh3xEq9iyjBRY' // process.env.BOT_TOKEN //  '1459970605:AAHlJGMGe9iX4_u_PXYbmIzWnaQ4wikRZvw'
const groupChatId = '1359425265' //  process.env.BOT_ID // '-487829484'
const projectName = 'Explorer' // process.env.PROJECT_NAME //  'Project Name'

export const sendToTelegram = (value) => {
  try {
    const text = projectName ? `${projectName}: ${value}` : value
    const url = `https://api.telegram.org/bot${botToken}/sendMessage?chat_id=${groupChatId}&text=${text}`
    return axios.get(url)
  } catch (error) {
    console.log(error)
  }
}
