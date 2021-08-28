import path from 'path'
import fs from 'fs-extra'

const getAlias = () => {
  const packagesDir = path.resolve(__dirname, '../../packages')
  const packages = fs.readdirSync(packagesDir)
  const pkg = fs.readJSONSync(path.resolve(__dirname, './package.json'))
  const deps = Object.entries(pkg.dependencies).reduce((deps, [key]) => {
    if (key.includes('@mill-too/')) {
      return deps
    } else if (key.includes('vue')) {
      deps[key] = require.resolve(key)
      return deps
    }
    deps[key] = key
    return deps
  }, {})
  const alias = packages
    .map((v) => path.join(packagesDir, v))
    .filter((v) => {
      return !fs.statSync(v).isFile()
    })
    .reduce((buf, _path) => {
      const name = path.basename(_path)
      return {
        ...buf,
        [`@mill-too/${name}$`]: `${_path}/src`,
      }
    }, deps)
  return alias
}

module.exports = {
    configureWebpack: {
        resolve: getAlias()
    }
}