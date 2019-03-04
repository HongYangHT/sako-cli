#!/usr/bin/env node

// console.log('hello, saok-cli is coming...')

const program = require('commander')

program.version('1.0.0', '-v, --version')

// 配置参数
program.option('-c, --config', 'config your Configuration')

// 命令行命令
program.command('init <cmd>')
  .alias('i')
  .option('-n, --name', 'set project name')
  .description('init project with sako')
  .action((cmd) => {
    console.log('init project with sako and its name "%s"', cmd)
  })

// ⚠️： this is must, and command below it
program.parse(process.argv)
