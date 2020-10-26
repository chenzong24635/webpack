const loaderUtils = require('loader-utils')

module.exports = function (source,inputSourceMap,data) {
  const options = loaderUtils.getOptions(this)
  // console.log('source>>>>', inputSourceMap,data)
    console.log('source>>>>',options)
  return source
}
