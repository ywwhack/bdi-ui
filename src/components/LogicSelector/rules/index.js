import number from './number'
import text from './text'
import bool from './bool'
import venum from './enum'

export const rules = []
export function defineRule (definition) {
  const { type, value } = definition
  if (!type) {
    return console.error('Rule must specific a type', definition)
  }
  if (!value) {
    return console.error('Rule must specific a value', definition)
  }
  rules.push(definition)
}

// add built-in rules
[
  number,
  text,
  bool,
  venum
].forEach(defineRule)
