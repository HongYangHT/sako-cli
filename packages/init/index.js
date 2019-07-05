/*
 * @Author: sam.hongyang
 * @LastEditors: sam.hongyang
 * @Description: 用于初始化项目
 * @Date: 2019-03-05 14:06:02
 * @LastEditTime: 2019-07-05 11:37:43
 */
const program = require('commander')
/**
 * figlet
 */
const figlet = require('figlet')
/**
 * 文字颜色
 * https: //github.com/chalk/chalk
 */
const chalk = require('chalk')

program
  .option('-n, --name', 'set project name')
  .option('-f, --frontEnd', 'set template with frontEnd template')
  .option('-b, --backEnd', 'set template with backEnd template').parse(process.argv)

program
  .command('init [projectName]')
  .alias('i')
  .description('init project with sako')
  .action((projectName) => {
    return new Promise((resolve, reject) => {
      figlet('SAKO CLI', function (err, data) {
        if (err) {
          console.dir(chalk.red(err))
          return
        }
        console.log(chalk.magenta(data))
        resolve()
      })
    }).catch(err => {
      console.log(err)
    })
  })
