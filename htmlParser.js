const cheerio = require('cheerio')
// const lot1 = `<html>
//     <title>
//         Rembrandt Harmensz. van Rijn: Christ at Emmaus: The smaller Plate
//     </title>
//     <body>
//       <h2>Rembrandt Harmensz. van Rijn</h2>
//       <h3>Christ at Emmaus: The smaller Plate</h3>
//         <div>
//           Rembrandt Harmensz. van Rijn
//           Christ at Emmaus: The smaller Plate
//           etching with drypoint, 1634, without watermark, a good impression of this scarce print, New Hollstein's only state, beginning to show some wear in places, trimmed to or on the platemark, generally in very good condition
//           P., S. 104 x 75 mm.
//         </div>
//       <h3>Price realised</h3>
//       <div>GBP 6,875</div>
//     </body>
// </html>
// `
// const $ = cheerio.load(lot1)
// let namesArray = []
//
// namesArray.push($('body').find('h2').text())
//
// console.log(`namesArray: ${namesArray}`);

function parseHTML(htmlText) {
  const $ = cheerio.load(htmlText)
  return $('body').find('h2').text()
}

module.exports = parseHTML
