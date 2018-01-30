const fs = require('fs');
const { promisify } = require('util');
const readFile = promisify(fs.readFile);
const readDir = promisify(fs.readdir);
const cheerio = require('cheerio');
const htmlDirectory = './data/2015-03-18';

// TODO: account for unique artist names.
// TODO: create one function extractData which takes in a html tag to extract..(how to account for multiple tags)

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

const getPrice = (htmlText) => {
  const $ = cheerio.load(htmlText);
  const parsedTags = $('body').find('div');
  const price = parsedTags['1'].children[0].data
  // let splitPrice = price.split(' ');
  return price
}

(async function () {
  let artworkArray = [];
  const htmlFileNames = await getFileNamesAsync();
  for (let file of htmlFileNames) {
    let artworkObject = { artist: '', works: []}
    let workObject = {title: '', price: ''}
    const fileContents = await readFileAsync(file);
    const name = getArtistNames(fileContents);
    // add work title and price
    workObject.title = getTitle(fileContents);
    workObject.price = getPrice(fileContents);
    // add artist name
    artworkObject.artist = name;
    artworkObject.works.push(workObject)
    // push new artist info to array
    artworkArray.push(artworkObject)
  }
  console.log('Artwork Artist Names and Works: \n', JSON.stringify(artworkArray));
})()
