/*
 * @Author: sam.hongyang
 * @LastEditors: sam.hongyang
 * @Description: 下载模版
 * @Date: 2019-07-04 17:26:01
 * @LastEditTime: 2019-07-05 18:02:04
 */
const download = require('download-git-repo')
const fs = require('fs')
const { resolve } = require('path')
const ora = require('ora')
const chalk = require('chalk')
const symbols = require('log-symbols')
const shell = require('shelljs')

class DownloadTemplate {
  constructor (options) {
    this.options = options
  }

  download () {
    const {
      name
    } = this.options
    const dir = '/' + name
    const spinner = ora(`try to mkdir with ${name}`)
    spinner.start()
    let isExistName = fs.existsSync(resolve(dir))
    if (isExistName) {
      spinner.stop()
      console.log(
        symbols.error,
        chalk.yellow(`dir name with ${name} is already exist !`)
      )
      return false
    }
    download(
      'HongYangHT/sako-tpl-vue',
      name,
      { clone: true },
      err => {
        if (err) {
          spinner.fail()
          console.log(symbols.error, chalk.yellow(err))
          return false
        }
        spinner.succeed()
        console.log(symbols.success, chalk.green('download template success!'))
        this.updateTemplate()
      }
    )
  }

  updateTemplate () {
    const { name, version, description, author, email } = this.options
    const dir = '/' + name
    fs.readFile(resolve(dir + '/package.json'), (err, buffer) => {
      if (err) {
        console.log(symbols.error, chalk.yellow(err))
        return false
      }
      shell.rm('-f', `${resolve(dir)}/.git`)
      let packageJson = JSON.parse(buffer)
      Object.assign(packageJson, this.options)
      fs.writeFileSync(
        `${resolve(dir)}/package.json`,
        JSON.stringify(packageJson, null, 2)
      )
      fs.writeFileSync(
        `${resolve(dir)}/README.md`,
        `# ${name} ${version}\n> ${description} \n ${author}(${email})>`
      )
      const spinner = ora(`create product ${name} success`)
      spinner.succeed()
    })
  }
}

module.exports = DownloadTemplate
