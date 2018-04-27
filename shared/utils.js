export function capitalize (str) {
  return str[0].toUpperCase() + str.slice(1)
}

export function camelize (str) {
  return str.split('-').reduce((result, cur) => {
    result += capitalize(cur)
    return result
  })
}
