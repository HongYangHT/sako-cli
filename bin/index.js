#!/usr/bin/env node

/*
 * @Author: sam.hongyang
 * @LastEditors: sam.hongyang
 * @Description:
 * @Date: 2019-03-04 17:11:56
 * @LastEditTime: 2019-07-08 14:34:43
 */

/**
 * 命令行工具
 * https: //github.com/tj/commander.js
 */
const program = require('commander')
const chalk = require('chalk')

// 设置init
require('../packages/init')

require('../packages/question')

/**
 * 命令行可视化组件
 * https: //github.com/yaronn/blessed-contrib
 */

// 版本号及相关参数配置 命令行命令
program
  .version('1.0.0', '-v, --version')
  .allowUnknownOption()
  .option('-n, --name <productName>', 'set product name', '')
  .option('-f, --frontEnd', 'set template with frontEnd template', false)
  .option('-b, --backEnd', 'set template with backEnd template', false)
  .option('-c, --config', 'custom webpack configuration')
  .on('--help', () => {
    console.log('')
    console.log('Examples:')
    console.log(chalk.green('  1. create new project'))
    console.log(chalk.green('    $ sako create-product <project-name> [dir]'))
    console.log(chalk.green('    $ sako create <project-name> [dir]'))
  })

// ⚠️： this is must, and command below it
program.parse(process.argv)
