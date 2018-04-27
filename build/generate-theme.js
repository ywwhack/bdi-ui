/**
 * 生成 theme-chalk/*.css 文件
 */

const path = require('path')
const fs = require('fs')
const sass = require('node-sass')
const {
  promisify
} = require('util')
const readFile = promisify(fs.readFile)
const writeFile = promisify(fs.writeFile)

function resolve (...paths) {
  return path.resolve(__dirname, '..', ...paths)
}

function isSpecificFile (name) {
  return ['index', 'theme'].indexOf(name) > -1
}

const SCSS_SOURCES_DIR = resolve('src/styles')
const CSS_DEST_DIR = resolve('lib/theme-chalk')
const cssFilenames = fs.readdirSync(SCSS_SOURCES_DIR)
const readFilenamesPromise = cssFilenames.map(filename => {
  return readFile(path.resolve(SCSS_SOURCES_DIR, filename), 'utf-8').then(content => ({
    name: path.basename(filename, '.scss'),
    content
  }))
})

module.exports = async function () {
  try {
    fs.statSync(CSS_DEST_DIR)
  } catch (e) {
    // 不存在 theme_chalk 目录
    fs.mkdirSync(CSS_DEST_DIR)
  }

  const allFilesData = await Promise.all(readFilenamesPromise)
  const nameContentMap = allFilesData.reduce((result, cur) => {
    result[cur.name] = cur.content
    return result
  }, {})
  // 除去一些特殊的文件 [index.scss, theme.scss]，剩余的都会生成一个对应的 css 文件
  const normalFilesData = allFilesData.filter(item => !isSpecificFile(item.name))

  // 额外增加一个 base.css，babel-plugin-component 插件需要
  normalFilesData.concat({
    name: 'base',
    content: nameContentMap['index']
  }).forEach(({
    name,
    content
  }) => {
    const result = sass.renderSync({
      data: content,
      includePaths: [SCSS_SOURCES_DIR]
    })
    writeFile(path.resolve(CSS_DEST_DIR, `${name}.css`), result.css)
  })

  // 生成 index.css
  const importedScssModules = normalFilesData.map(({ name }) => `@import '${SCSS_SOURCES_DIR}/${name}.scss'`)
  const result = sass.renderSync({
    data: `
      @import '${SCSS_SOURCES_DIR}/index.scss';
      ${importedScssModules}
    `
  })
  writeFile(path.resolve(CSS_DEST_DIR, 'index.css'), result.css)
}
