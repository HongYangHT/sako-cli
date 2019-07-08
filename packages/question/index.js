/*
 * @Author: sam.hongyang
 * @LastEditors: sam.hongyang
 * @Description: 搜集相关信息
 * @Date: 2019-07-04 15:54:56
 * @LastEditTime: 2019-07-08 10:43:17
 */
/**
  * 命令行交互信息收集组件
  * https: //github.com/SBoudrias/inquirer.js
  */
const inquirer = require('inquirer')
const fs = require('fs')
const Joi = require('@hapi/joi')

const figlet = require('figlet')
const chalk = require('chalk')
const _ = require('lodash')
const fuzzy = require('fuzzy')
const program = require('commander')
const symbols = require('log-symbols')
const DownloadTemplate = require('../download')

inquirer.registerPrompt('chalk-pipe', require('inquirer-chalk-pipe'))
inquirer.registerPrompt(
  'autocomplete',
  require('inquirer-autocomplete-prompt')
)

const preFixEmail = [
  '@126.com',
  '@163.com',
  '@sina.com',
  '@qq.com',
  '@sohu.com',
  '@yahoo.com.cn',
  '@sogou.com',
  '@hotmail.com',
  '@msn.com',
  '@gmail.com',
  '@yeah.net',
  '@googlemail.com',
  '@szhhtxx.com'
]

function setEmail (answers, input) {
  input = input || ''
  return new Promise(function (resolve) {
    setTimeout(function () {
      let emailName = input.replace(
        // eslint-disable-next-line
        /(?!^)(@(.*)+?)/,
        ''
      )
      var fuzzyResult = fuzzy.filter(
        input,
        preFixEmail.map(item => emailName + item)
      )
      resolve(
        input ? fuzzyResult.map(function (el) {
          return el.original
        }) : []
      )
    }, _.random(30, 500))
  })
}

const questions = [
  {
    type: 'input',
    name: 'name',
    message: 'please input your project name',
    async validate (value) {
      const schema = Joi.object().keys({
        value: Joi.string()
          .required()
          .regex(/^[a-zA-Z0-9_\-$]{1,20}$/)
          .error(new Error('please input your project name with [a-zA-Z0-9_-]'))
      })
      const result = await Joi.validate(
        {
          value
        },
        schema
      )
      if (result.error) {
        return result.error.message
      }
      if (fs.existsSync(value)) {
        return 'this fold is exist'
      }
      return true
    }
  },
  {
    type: 'input',
    name: 'author',
    message: 'please input author name',
    default: 'sako-dev',
    async validate (value) {
      const schema = Joi.object().keys({
        value: Joi.string()
          .required()
          .regex(/^[a-zA-Z0-9_\-$]{1,20}$/)
          .error(
            new Error('please input your author name with [a-zA-Z0-9_-]')
          )
      })
      const result = await Joi.validate(
        {
          value
        },
        schema
      )
      if (result.error) {
        return result.error.message
      }
      return true
    }
  },
  {
    type: 'autocomplete',
    name: 'email',
    message: 'please input your email',
    source: setEmail
  },
  {
    type: 'list',
    name: 'type',
    message: 'please select your project type',
    default: 0,
    choices: ['frontend', 'backEnd'],
    async validate (value) {
      return true
    }
  },
  {
    type: 'input',
    name: 'version',
    message: 'version(1.0.0)',
    default: '1.0.0',
    validate (value) {
      return true
    }
  },
  {
    type: 'input',
    name: 'description',
    message: 'please input description for this project',
    default: 'vuejs',
    async validate (value) {
      const schema = Joi.object().keys({
        value: Joi.string()
          .allow('')
          .error(new Error('please input description for this project'))
      })
      const result = await Joi.validate(
        {
          value
        },
        schema
      )
      if (result.error) {
        return result.error.message
      }
      return true
    }
  }

]

const makeSure = [
  {
    type: 'confirm',
    name: 'confirm',
    message: 'Are you sure ?'
  }
]

const init = () => {
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

const start = async (config) => {
  let result = config || {}
  await init()
  let filterQuestions = questions.filter(item => {
    let flag = true
    Object.keys(result).forEach(key => {
      if (key === item.name && result[key]) flag = false
    })
    return flag
  })
  const ans = await inquirer.prompt(filterQuestions)
  inquirer.prompt(makeSure).then(answers => {
    const setting = Object.assign(result, ans)
    console.log(JSON.stringify(setting, null, 2))
    console.log(
      symbols.success,
      chalk.green('product setting is already finish!')
    )
    const download = new DownloadTemplate(setting)
    download.download()
  })
}

program
  .command('create-product [productName] [dir]')
  .description('create project with template')
  .alias('create')
  .action(productName => {
    var config = Object.assign(
      {
        name: ''
      },
      {
        name: productName || program.name,
        type: program.frontEnd ? 'frontEnd' : program.backEnd ? 'backEnd' : ''
      }
    )
    start(config)
  })
