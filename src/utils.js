export function remove (arr, item) {
  const index = arr.indexOf(item)
  if (index > -1) {
    arr.splice(index, 1)
  }
}

export function mapSync (props) {
  return props.reduce((result, prop) => {
    const syncProp = 'sync' + prop.charAt(0).toUpperCase() + prop.slice(1)
    result[syncProp] = {
      get () { return this[prop] },
      set (value) { this.$emit(`update:${prop}`, value) }
    }
    return result
  }, {})
}

export function groupBy (arr, key) {
  let i = -1
  const groups = []
  const groupIndexMap = {}

  while (++i < arr.length) {
    const item = arr[i]
    if (!(item[key] in groupIndexMap)) {
      groupIndexMap[item[key]] =
        groups.push({ name: item[key], members: [] }) - 1
    }
    groups[groupIndexMap[item[key]]].members.push(item)
  }

  return groups
}
