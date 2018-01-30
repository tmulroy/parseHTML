const fs = require('fs');
const { promisify } = require('util');
const readFile = promisify(fs.readFile);
const readDir = promisify(fs.readdir);
const cheerio = require('cheerio');
const htmlDirectory = './data/2015-03-18';

// TODO: account for unique artist names.

const readFileAsync = async (fileName) => {
  const fileContents = await readFile(`${htmlDirectory}/${fileName}`, 'utf8');
  return fileContents
}

const getFileNamesAsync = async () => {
  const fileNames = await readDir(htmlDirectory);
  return fileNames
}

const getArtistNames = (htmlText) => {
  const $ = cheerio.load(htmlText);
  const name = $('body').find('h2').text();
  return name
}

const getTitle = (htmlText) => {
  const $ = cheerio.load(htmlText);
  const parsedTags = $('body').find('h3');
  const title = parsedTags['0'].children[0].data;
  return title
}

(async function () {
  let artworkArray = [];
  const htmlFileNames = await getFileNamesAsync();
  for (let file of htmlFileNames) {
    let artworkObject = { artist: '', works: []}
    const fileContents = await readFileAsync(file);
    let name = getArtistNames(fileContents);
    let title = getTitle(fileContents);
    artworkObject.artist = name;
    artworkObject.works.push(title)
    artworkArray.push(artworkObject)
  }
  console.log('Artwork Artist Names and Works: \n', artworkArray);
})()
