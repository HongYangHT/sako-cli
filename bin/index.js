#!/usr/bin/env node

/*
 * @Author: sam.hongyang
 * @LastEditors: sam.hongyang
 * @Description:
 * @Date: 2019-03-04 17:11:56
 * @LastEditTime: 2019-07-05 16:19:17
 */

/**
 * 命令行工具
 * https: //github.com/tj/commander.js
 */
const program = require('commander')

// 设置init
// require('../packages/init')

require('../packages/question')

/**
 * 设置‘ loading’ 或者其他表格等
 * https: //github.com/nathanpeck/clui
 */
// const clui = require('clui')
// const Spinner = clui.Spinner

/**
 * 命令行可视化组件
 * https: //github.com/yaronn/blessed-contrib
 */

/**
  * 命令行交互信息收集组件
  * https: //github.com/SBoudrias/inquirer.js
  */
// const inquirer = require('inquirer')
// const chalkPipe = require('chalk-pipe')

// 版本号
// program.version('1.0.0', '-v, --version').parse(process.argv)

// 配置参数
// program.option('-c, --config', 'custom webpack configuration')

// 命令行命令
// program.on('--help', () => {
//   console.log('')
//   console.log('Examples:')
//   console.log('  1. create new project')
//   console.log('    $ sako init project-name')
//   console.log('    $ sako i project-name')
// })

// ⚠️： this is must, and command below it
program.parse(process.argv)
