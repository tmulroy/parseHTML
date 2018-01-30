const fs = require('fs');
const { promisify } = require('util');
const readFile = promisify(fs.readFile);
const readDir = promisify(fs.readdir);
const cheerio = require('cheerio');
const htmlDirectory = './data/2015-03-18';

// TODO: account for unique artist names.
// TODO: account for multiple pieces of artwork per artist
// TODO: refactor so creating work object is separated from main()

const readFileAsync = async (fileName) => {
  const fileContents = await readFile(`${htmlDirectory}/${fileName}`, 'utf8');
  return fileContents
}

const getFileNamesAsync = async () => {
  const fileNames = await readDir(htmlDirectory);
  return fileNames
}

const getArtistName = (htmlText) => {
  const $ = cheerio.load(htmlText);
  const name = $('body').find('h2').text();
  return name
}

const artistExists = (artworkArray, name) => {
  for (artist of artworkArray) {
    return (artist.artist == name) ? true : false
  }
}

const getTitle = (htmlText) => {
  const $ = cheerio.load(htmlText);
  const parsedTags = $('body').find('h3');
  const title = parsedTags['0'].children[0].data;
  return title
}

const getPriceInfo = (htmlText) => {
  const $ = cheerio.load(htmlText);
  const parsedTags = $('body').find('div');
  const price = parsedTags['1'].children[0].data
  const splitPrice = price.split(' ');
  const priceInfo = { currency: splitPrice[0], amount: splitPrice[1]};
  return priceInfo
}

const generateWorkEntry = (fileContents) => {
  const { currency, amount } = getPriceInfo(fileContents);
  let workObject = {
    title: getTitle(fileContents),
    currency,
    amount
  }
  return workObject
}

(async function () {
  let artworkArray = [];
  const htmlFileNames = await getFileNamesAsync();
  for (let file of htmlFileNames) {
    let artworkObject = { artist: '', works: []}
    let workObject = {title: '', currency: '', amount: ''}
    const fileContents = await readFileAsync(file);
    const name = getArtistName(fileContents);

    const workEntry = generateWorkEntry(fileContents)
    if (artistExists(artworkArray, name)) {
      for (entry of artworkArray) {
        if (entry.artist == name) {
          entry.works.push(workEntry);
        }
      }
    } else {
      // add artist name
      artworkObject.artist = name;
      artworkObject.works.push(workEntry)
      // push new artist info to array
      artworkArray.push(artworkObject)
    }
  }
  console.log('Artwork Artist Names and Works: \n', artworkArray);
})()
