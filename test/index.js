const shell = require('shelljs')
const { exec, cat, cd } = require('shelljs')
shell.echo('hello world!')

// const npm = shell.exec('node -v', { silent: true })

// npm.stdout.on('data', data => {
//   console.log(data)
// })

if (!shell.which('node')) {
  shell.echo('need node')
  shell.exit(1)
}

var child = exec('node --version', { async: true })
child.stdout.on('data', function (data) {
  /* ... do something with data ... */
  // console.log(data)
})
cd('test')

let file = cat('index.js')
console.log(file)
