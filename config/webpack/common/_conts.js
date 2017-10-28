const { resolve } = require('path')
require('dotenv').config()

const ROOT_DIR = resolve(process.cwd())
const SOURCE_FOLDER = resolve(process.cwd(), 'app')
const COMMON_CONFIGS = resolve(__dirname)
const LOADERS_FOLDER = resolve(__dirname, 'loaders')
const STATIC_FOLDER = process.env.STATIC_FOLDER || resolve(process.cwd(), 'static')
const OUTPUT_FOLDER = process.env.OUTPUT_FOLDER || resolve(process.cwd(), 'dist')
const PUBLIC_PATH = process.env.PUBLIC_PATH || '/'

module.exports = {
  ROOT_DIR,
  SOURCE_FOLDER,
  STATIC_FOLDER,
  OUTPUT_FOLDER,
  PUBLIC_PATH,
  COMMON_CONFIGS,
  LOADERS_FOLDER,
}
