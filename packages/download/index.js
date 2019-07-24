/*
 * @Author: sam.hongyang
 * @LastEditors: sam.hongyang
 * @Description: 下载模版
 * @Date: 2019-07-04 17:26:01
 * @LastEditTime: 2019-07-24 14:46:28
 */
const download = require('download-git-repo')
const fs = require('fs')
const { resolve } = require('path')
const ora = require('ora')
const chalk = require('chalk')
const symbols = require('log-symbols')
const shell = require('shelljs')
const figlet = require('figlet')
const handlebars = require('handlebars')

class DownloadTemplate {
  constructor (options) {
    this.options = options
  }

  download () {
    const {
      name
    } = this.options
    const spinner = ora({
      text: chalk.green(`try to mkdir with ${name}`),
      color: 'green'
    })
    spinner.start()
    let isExistName = fs.existsSync(resolve(name))
    if (isExistName) {
      spinner.stop()
      console.log(
        symbols.error,
        chalk.yellow(`dir name with ${name} is already exist !`)
      )
      return false
    }
    spinner.succeed()
    const down = ora({
      text: chalk.green('try to download template'),
      color: 'green'
    })
    down.start()
    download(
      'HongYangHT/sako-tpl-vue',
      name,
      { clone: true },
      err => {
        if (err) {
          down.fail()
          console.log(symbols.error, chalk.yellow(err))
          return false
        }
        down.succeed()
        console.log(symbols.success, chalk.green('download template success!'))
        this.updateTemplate()
      }
    )
  }

  end () {
    return new Promise((resolve, reject) => {
      figlet('SAKO CLI', function (err, data) {
        if (err) {
          console.dir(chalk.red(err))
          reject(err)
          return
        }
        console.log(chalk.magenta(data))
        resolve()
      })
    })
  }
  updateTemplate () {
    const { name = 'sako-tpl-vue', version, description, author, email } = this.options
    fs.readFile(resolve(name + '/package.json'), async (err, buffer) => {
      if (err) {
        console.log(symbols.error, chalk.yellow(err))
        return false
      }

      shell.rm('-f', `${resolve(name)}/.git`)
      let packageJson = JSON.parse(buffer)
      Object.assign(packageJson, this.options)

      fs.writeFileSync(
        `${resolve(name)}/package.json`,
        JSON.stringify(packageJson, null, 2)
      )

      fs.writeFileSync(
        `${resolve(name)}/README.md`,
        `# ${name} ${version}\n> ${description} \n> ${author}(${email})>`
      )
      const htmlFile = `${resolve(name)}/src/index.html`
      if (fs.existsSync(htmlFile)) {
        const content = fs.readFileSync(htmlFile).toString()
        // 加入前缀
        const result = handlebars.compile(content)({
          name
        })
        fs.writeFileSync(htmlFile, result)
      }

      const projectConfig = `${resolve(name)}/src/project.js`
      if (fs.existsSync(projectConfig)) {
        const content = fs.readFileSync(projectConfig).toString()
        // 加入前缀
        const result = handlebars.compile(content)({
          name
        })
        fs.writeFileSync(projectConfig, result)
      }

      const microConfig = `${resolve(name)}/src/micro/index.js`
      if (fs.existsSync(microConfig)) {
        const content = fs.readFileSync(microConfig).toString()
        // 加入前缀
        const result = handlebars.compile(content)({
          name
        })
        fs.writeFileSync(microConfig, result)
      }

      await this.end()
      const spinner = ora({
        text: chalk.green(`create product ${name} success`),
        color: 'green'
      })
      spinner.start()
      spinner.succeed()
    })
  }
}

module.exports = DownloadTemplate
