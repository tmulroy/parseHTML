const fs = require('fs');
const { promisify } = require('util');
const readFile = promisify(fs.readFile);
const readDir = promisify(fs.readdir);
const cheerio = require('cheerio');
const htmlDirectory = './data/2015-03-18';

const readFileAsync = async (fileName) => {
  const fileContents = await readFile(`${htmlDirectory}/${fileName}`, 'utf8');
  return fileContents
}

const getFileNamesAsync = async () => {
  const fileNames = await readDir(htmlDirectory);
  return fileNames
}

const parseHTML = (htmlText) => {
  const $ = cheerio.load(htmlText);
  const name = $('body').find('h2').text();
  return name
}

(async function () {
  let namesArray = [];
  const htmlFileNames = await getFileNamesAsync();
  for (let file of htmlFileNames) {
    const fileContents = await readFileAsync(file);
    let name = parseHTML(fileContents)
    namesArray.push(name)
  }
  console.log('Artist Names: \n', namesArray);
})()
