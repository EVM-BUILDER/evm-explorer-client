function getParameter(name, url) {
  name = name.replace(/[\[\]]/g, '\\$&')
  var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
    results = regex.exec(url)
  if (!results) return null
  if (!results[2]) return ''
  return decodeURIComponent(results[2].replace(/\+/g, ' '))
}

function getParameterByName(name, url = '') {
  var fontFamilies = getParameter(name, url)?.split('|') || []
  var fontArr = []
  fontFamilies.forEach(function (item) {
    fontArr.push(item.split(':')[0])
  })
  return fontArr.join(', ')
}

export default getParameterByName
