const fs = require('fs')
const htmlDirectory = './data/2015-03-18'
const parseHTML = require('./htmlParser')
let namesArray = []

fs.readdir(htmlDirectory, (err, htmlFiles) => {
  if (err) {
    console.error(`Error reading directory ${htmlDirectory}`)
  }
  htmlFiles.forEach((file, idx) => {
    fs.readFile(`${htmlDirectory}/${file}`, 'utf8', (fileError, data) => {
      if (fileError) throw fileError
      namesArray.push(parseHTML(data))
      console.log('Artist Names: ')
      console.log(namesArray);
    })
  })
})
