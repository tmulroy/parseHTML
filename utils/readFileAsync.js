const fs = require('fs');
const { promisify } = require('util');
const readFile = promisify(fs.readFile);
const htmlDirectory = './data/2017-12-20';

const readFileAsync = async (fileName) => {
  const fileContents = await readFile(`${htmlDirectory}/${fileName}`, 'utf8');
  return fileContents
}

module.exports = readFileAsync;
