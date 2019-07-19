/*
 * @Author: sam.hongyang
 * @LastEditors: sam.hongyang
 * @Description: 查询当前用户的系统信息
 * @Date: 2019-07-08 17:27:21
 * @LastEditTime: 2019-07-08 17:57:01
 */
const shell = require('shelljs')
const { exec } = require('shelljs')
const chalk = require('chalk')
const fs = require('fs')
let UserSystem = {}

if (!shell.which('node')) {
  shell.echo('start project need node')
  shell.exit(1)
}

if (!shell.which('npm')) {
  shell.echo('start project need npm')
  shell.exit(1)
}

let node = exec('node -v', { silent: true })
let npm = exec('node -v', { silent: true })

console.log(chalk.green(node))
console.log(chalk.green(npm))

let existNodeModules = fs.existsSync('node_modules')

UserSystem = {
  node: node.stdout,
  npm: npm.stdout,
  existNodeModules
}

module.exports = UserSystem
