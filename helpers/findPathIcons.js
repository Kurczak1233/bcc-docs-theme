import { path } from '@vuepress/utils'
import glob from 'glob'

export const findPathIcons = (__dirname) => {
  const filesPaths = glob.sync(`${__dirname}/public/**/*.svg`)
  //Get path name from the docs folder
  var paths = filesPaths.map((file) => {
    return path.relative(`${__dirname}/public`, file)
  })

  return paths
}
