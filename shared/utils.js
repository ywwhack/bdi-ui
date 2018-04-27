function capitalize (str) {
  return str[0].toUpperCase() + str.slice(1)
}

function camelize (str) {
  return str.split('-').reduce((result, cur) => {
    result += capitalize(cur)
    return result
  })
}

const hyphenateRe = /\B([A-Z])/g
function hyphenate (str) {
  return str.replace(hyphenateRe, '-$1').toLowerCase()
}

module.exports = {
  capitalize,
  camelize,
  hyphenate
}
