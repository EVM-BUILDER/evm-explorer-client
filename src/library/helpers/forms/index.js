import qs from 'query-string'

export function postForm(url, params, method = 'POST') {
  var form = document.createElement('form')
  form.setAttribute('method', method)

  if (url) {
    form.setAttribute('action', url)
  }

  const keyValues = qs
    .stringify(params, { arrayFormat: 'brackets', encode: false })
    .split('&')
    .map((field) => field.split('='))

  keyValues.forEach((field) => {
    var key = field[0]
    var value = field[1]
    var hiddenField = document.createElement('input')
    hiddenField.setAttribute('type', 'hidden')
    hiddenField.setAttribute('name', key)
    hiddenField.setAttribute('value', value)
    form.appendChild(hiddenField)
  })
  document.body.appendChild(form)
  form.submit()
}
