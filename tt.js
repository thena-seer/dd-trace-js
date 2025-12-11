const path = require('path')
const fs = require('fs')
var TEST_DIR = path.join(__dirname, '.')
console.log(TEST_DIR)

TEST_DIR = `/Users/charles.debeauchesne/repos/dd-trace-js/ext`

const readFileSync = (path, options) => fs.readFileSync(`${TEST_DIR}/${path}`, options)

console.log(readFileSync("./tags.js"))
console.log(path.join(TEST_DIR, "./tags.js"))
