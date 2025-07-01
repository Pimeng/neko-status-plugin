import fs from 'fs'

let packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'))

const yunzaiVersion = packageJson.version
const yunzaiName = packageJson.name.replace(/(^\w|-\w)/g, s => s.toUpperCase())

let Version = {
  yunzaiName,
  get version() {
    return yunzaiVersion
  }
}

export default Version
