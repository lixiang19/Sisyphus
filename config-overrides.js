const { override, addBabelPlugin, addBabelPreset } = require('customize-cra')
module.exports = override(
  addBabelPreset([
    '@babel/preset-react',
    { runtime: 'automatic', importSource: '@emotion/react' }
  ]),
  addBabelPlugin(['@emotion'])
)
