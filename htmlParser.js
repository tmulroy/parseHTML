const cheerio = require('cheerio')

const parseHTML = (htmlText) => {
  const $ = cheerio.load(htmlText)
  const name = $('body').find('h2').text()
  return name
}

module.exports = parseHTML
