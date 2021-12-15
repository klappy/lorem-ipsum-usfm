const path = require('path');

module.exports = {
  usageMode: 'expand',
  exampleMode: 'expand',
  components: 'src/components/**/*.{js,jsx,ts,tsx}',
  moduleAliases: { 'lorem-ipsum-usfm': path.resolve(__dirname, 'src')},
  getComponentPathLine: componentPath => {
    const name = path.basename(componentPath, '.js')
    return `import { ${name.split('.')[0]} } from 'lorem-ipsum-usfm';`
  },
  handlers: componentPath => (
    require('react-docgen').defaultHandlers.concat(
      require('react-docgen-external-proptypes-handler')(componentPath),
      require('react-docgen-displayname-handler').createDisplayNameHandler(componentPath)
    )
  ),
};