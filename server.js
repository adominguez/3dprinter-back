var express = require('express');
var _ = require('underscore');
var https = require("https");

var app = express();
var PORT = process.env.PORT || 8000;

var printers = [{
    id: 'anpri3',
    asin: 'B074DQZCLT',
    name: 'Anycubic Prusa i3 Impresora 3D',
    category: 'kit',
    image: 'https://3dmakernow.com/wp-content/uploads/2018/04/61mDMg6A-zL._SX425_.jpg',
    link: 'https://ws-eu.assoc-amazon.com/widgets/cm?lt1=_blank&bc1=000000&IS2=1&bg1=FFFFFF&fc1=000000&lc1=0000FF&t=3dmakernow-21&o=30&p=8&l=as4&m=amazon&f=ifr&ref=as_ss_li_til&asins=B074DQZCLT&linkId=6eb438141821bcf39d6797836975c893',
    shortlink: 'https://amzn.to/2sGEfJN',
    postlink: 'http://3dmakernow.com/anycubic-prusa-i3-impresora-3d',
    opinionsLink: '',
    building: '10 horas',
    dificult: 'Intermedia',
    price: '0',
    quality: 'Buena',
    dimensions: '475 x 410 x 460mm',
    value: '7'
  },
  {
    id: 'ankoli',
    asin: 'B076H2KJVG',
    name: 'Anycubic Kossel Linear Plus',
    category: 'kit',
    image: 'https://3dmakernow.com/wp-content/uploads/2018/05/201801051039328705.jpg',
    link: 'https://ws-eu.assoc-amazon.com/widgets/cm?lt1=_blank&bc1=000000&IS2=1&bg1=FFFFFF&fc1=000000&lc1=0000FF&t=3dmakernow-21&o=30&p=8&l=as4&m=amazon&f=ifr&ref=as_ss_li_til&asins=B076H2KJVG&linkId=6438dd6e4731db8e0f24dd07ee81d70d',
    shortlink: 'https://amzn.to/2JdJeNz',
    postlink: 'https://3dmakernow.com/anycubic-kossel-linear-plus/',
    opinionsLink: '',
    building: '05 horas',
    dificult: 'Basica',
    price: '0',
    quality: 'Buena',
    dimensions: '300mm',
    value: '8',
    opinions: ''
  },
  {
    id: '3dana6',
    asin: 'B01N4KT3SC',
    name: 'Impresora 3D Anet A6',
    category: 'kit',
    image: 'https://3dmakernow.com/wp-content/uploads/2018/05/7167OhjMPFL._SX425_.jpg',
    link: 'https://ws-eu.assoc-amazon.com/widgets/cm?lt1=_blank&bc1=000000&IS2=1&bg1=FFFFFF&fc1=000000&lc1=0000FF&t=3dmakernow-21&o=30&p=8&l=as4&m=amazon&f=ifr&ref=as_ss_li_til&asins=B01N4KT3SC&linkId=bae69a4cfd6684fad7c722367939359f',
    shortlink: 'https://amzn.to/2JdJwDK',
    postlink: 'https://3dmakernow.com/impresora-3d-anet-a6-opiniones/',
    opinionsLink: '',
    building: '08 horas',
    dificult: 'Basica',
    price: '0',
    quality: 'Buena',
    dimensions: '400 x 500 x 400mm',
    value: '9',
    opinions: ''
  },
  {
    id: '3dana8',
    asin: 'B075TZPX5G',
    name: 'Impresora 3D Anet A8',
    category: 'kit',
    image: 'https://3dmakernow.com/wp-content/uploads/2018/05/61uZ-K4dBGL._SX425_.jpg',
    link: 'https://ws-eu.assoc-amazon.com/widgets/cm?lt1=_blank&bc1=000000&IS2=1&bg1=FFFFFF&fc1=000000&lc1=0000FF&t=3dmakernow-21&o=30&p=8&l=as4&m=amazon&f=ifr&ref=as_ss_li_til&asins=B075TZPX5G&linkId=95dca0935c3d069940fbed1b2cd62302',
    shortlink: 'https://amzn.to/2xETrgA',
    postlink: 'https://3dmakernow.com/impresora-3d-anet-a8-opiniones/',
    opinionsLink: '',
    building: '08 horas',
    dificult: 'Basica',
    price: '0',
    quality: 'Buena',
    dimensions: '510 x 400 x 415mm',
    value: '9',
    opinions: ''
  },
  {
    id: 'gepri3',
    asin: 'B01GJDO9I0',
    name: 'Geeetech Prusa I3 Pro B',
    category: 'kit',
    image: 'https://3dmakernow.com/wp-content/uploads/2018/05/51btpEFWpFL._SX425_.jpg',
    link: 'https://ws-eu.assoc-amazon.com/widgets/cm?lt1=_blank&bc1=000000&IS2=1&bg1=FFFFFF&fc1=000000&lc1=0000FF&t=3dmakernow-21&o=30&p=8&l=as4&m=amazon&f=ifr&ref=as_ss_li_til&asins=B01GJDO9I0&linkId=106ce0ded663b0f821a024deda8587f9',
    shortlink: 'https://amzn.to/2JgTQqK',
    postlink: 'https://3dmakernow.com/geeetech-prusa-i3-pro-b-opiniones/',
    opinionsLink: '',
    building: '12 horas',
    dificult: 'Avanzada',
    price: '0',
    quality: 'Media',
    dimensions: '450 x 440 x 440mm',
    value: '6',
    opinions: ''
  },
  {
    id: 'ani3me',
    asin: 'B06XK7VYX9',
    name: 'Impresora 3D Anycubic I3 Mega',
    category: 'principiante',
    image: 'https://3dmakernow.com/wp-content/uploads/2018/05/61OeIv3kdNL._SX425_.jpg',
    link: 'https://ws-eu.assoc-amazon.com/widgets/cm?lt1=_blank&bc1=000000&IS2=1&bg1=FFFFFF&fc1=000000&lc1=0000FF&t=3dmakernow-21&o=30&p=8&l=as4&m=amazon&f=ifr&ref=as_ss_li_til&asins=B06XK7VYX9&linkId=10927245ee752e9cfb2d97039e375f69',
    shortlink: 'https://amzn.to/2suQMAP',
    postlink: 'https://3dmakernow.com/anycubic-i3-mega-opiniones-valoracion-analisis/',
    opinionsLink: '',
    building: '-',
    dificult: 'Basica',
    price: '0',
    quality: 'Buena',
    dimensions: '475 x 410 x 460mm',
    value: '10',
    opinions: ''
  },
  {
    id: 'crcr10',
    asin: 'B07B6JR4YR',
    name: 'Impresora 3D Creality CR10',
    category: 'principiante',
    image: 'https://3dmakernow.com/wp-content/uploads/2018/05/51ZdYvvZ9L._SX425_.jpg',
    link: 'https://ws-eu.assoc-amazon.com/widgets/cm?lt1=_blank&bc1=000000&IS2=1&bg1=FFFFFF&fc1=000000&lc1=0000FF&t=3dmakernow-21&o=30&p=8&l=as4&m=amazon&f=ifr&ref=as_ss_li_til&asins=B07B6JR4YR&linkId=9da97f68c6289099f7c9fc0a4e907756',
    shortlink: 'https://amzn.to/2svhbP2',
    postlink: 'https://3dmakernow.com/impresora-3d-cr10-opiniones-valoracion-analisis/',
    opinionsLink: '',
    building: '-',
    dificult: 'Basica',
    price: '0',
    quality: 'Buena',
    dimensions: '620 x 490 x 615mm',
    value: '9',
    opinions: ''
  },
  {
    id: 'anee10',
    asin: 'B07849BDBT',
    name: 'Impresora 3D Anet E10',
    category: 'principiante',
    image: 'https://3dmakernow.com/wp-content/uploads/2018/06/61aYduD7CSL._SX342_.jpg',
    link: 'https://ws-eu.assoc-amazon.com/widgets/cm?lt1=_blank&bc1=000000&IS2=1&bg1=FFFFFF&fc1=000000&lc1=0000FF&t=3dmakernow-21&o=30&p=8&l=as4&m=amazon&f=ifr&ref=as_ss_li_til&asins=B07849BDBT&linkId=08acf63d55aa6b6cf82998ae7d621190',
    shortlink: 'https://amzn.to/2lbW9AZ',
    postlink: 'https://3dmakernow.com/impresora-3d-anet-e10-opiniones-valoracion-analisis/',
    opinionsLink: '',
    building: '-',
    dificult: 'Basica',
    price: '0',
    quality: 'Buena',
    dimensions: '405 x 440 x 495mm',
    value: '8',
    opinions: ''
  },
  {
    id: 'cren2d',
    asin: 'B073DBZN8Z',
    name: 'Creality Ender 2 Desktop',
    category: 'principiante',
    image: 'https://3dmakernow.com/wp-content/uploads/2018/05/414l5cb72IL._SX425_.jpg',
    link: 'https://ws-eu.assoc-amazon.com/widgets/cm?lt1=_blank&bc1=000000&IS2=1&bg1=FFFFFF&fc1=000000&lc1=0000FF&t=3dmakernow-21&o=30&p=8&l=as4&m=amazon&f=ifr&ref=as_ss_li_til&asins=B073DBZN8Z&linkId=47c1c6a569e92ccd9ecd966ce21180a3',
    shortlink: 'https://amzn.to/2xHkSWL',
    postlink: 'https://3dmakernow.com/creality-ender-2-desktop-opiniones/',
    opinionsLink: '',
    building: '-',
    dificult: 'Basica',
    price: '0',
    quality: 'Buena',
    dimensions: '330 x 330 x 540mm',
    value: '9',
    opinions: ''
  },
  {
    id: '3danph',
    asin: 'B078TCT7P5',
    name: 'Impresora 3D Anycubic Photon',
    category: 'profesional',
    image: 'https://3dmakernow.com/wp-content/uploads/2018/05/201801201844010827.jpg',
    link: 'https://ws-eu.assoc-amazon.com/widgets/cm?lt1=_blank&bc1=000000&IS2=1&bg1=FFFFFF&fc1=000000&lc1=0000FF&t=3dmakernow-21&o=30&p=8&l=as4&m=amazon&f=ifr&ref=as_ss_li_til&asins=B078TCT7P5&linkId=66042dbbed38ebf6b8656236749a17f3',
    shortlink: 'https://amzn.to/2Htdb6i',
    postlink: 'https://3dmakernow.com/anycubic-photon-impresora-3d/',
    opinionsLink: '',
    building: '-',
    dificult: 'Avanzada',
    price: '0',
    quality: 'Buena',
    dimensions: '405 x 410 x 453mm',
    value: '7',
    opinions: ''
  }
];

setValue(printers);
setPrice(printers);
setOpinionsLink(printers);

app.get('/', function (req, res) {
  res.send('3DMakerNow API');
})

// GET /printers
app.get('/printers', function (req, res) {
  res.header('Access-Control-Allow-Origin', "*"); // TODO - Make this more secure!!
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST');
  res.header('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept');
  res.json(printers);
});

// GET /printers/:category
app.get('/printers/:category', function (req, res) {
  var printersCategory = req.params.category;
  var matchedJsonCategory = [];
  printers.forEach((element) => {
    if (element.category === printersCategory) {
      matchedJsonCategory.push(element);
    }
  })

  // res.status(404).send();
  if (matchedJsonCategory) {
    res.header('Access-Control-Allow-Origin', "*"); // TODO - Make this more secure!!
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST');
    res.header('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept');
    res.json(matchedJsonCategory)
  } else {
    res.status(404).send();
  }
});

// GET /printer/:id
app.get('/printer/:id', function (req, res) {
  var printersId = req.params.id;
  var matchedJsonId = [];
  printers.forEach((element) => {
    if (element.id === printersId) {
      matchedJsonId.push(element);
    }
  })

  // res.status(404).send();
  if (matchedJsonId) {
    res.header('Access-Control-Allow-Origin', "*"); // TODO - Make this more secure!!
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST');
    res.header('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept');
    res.json(matchedJsonId)
  } else {
    res.status(404).send();
  }
});

// GET /printers/:category/table
app.get('/printers/:category/table', function (req, res) {
  var printersCategory = req.params.category;
  var matchedJsonCategory = {
    "data": []
  };
  var jsonForTable = [];


  printers.forEach((element) => {
    if (element.category === printersCategory) {

      jsonForTable = [getImage(element.image, element.name, element.postlink), element.building, element.dificult, element.price, element.quality, element.dimensions, getValue(element.value, element.opinions)]
      matchedJsonCategory.data.push(jsonForTable);
    }
  })

  // res.status(404).send();
  if (matchedJsonCategory) {
    res.header('Access-Control-Allow-Origin', "*"); // TODO - Make this more secure!!
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST');
    res.header('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept');
    res.json(matchedJsonCategory)
  } else {
    res.status(404).send();
  }
});

// Server port listening
app.listen(PORT, function () {
  console.log('Express served in the port ' + PORT)
  console.log('http://localhost:' + PORT)
})
/**
 * This function show a div with image for show it in table
 * @param {String} image
 * @param {String} name
 * @param {String} postlink
 */
function getImage(image, name, postlink) {
  return `<div class='table-image' style='background:url(${image})  no-repeat center center; background-size: cover'><a href='${postlink}' class='table-link' target='_blank'>${name}</a></div>`
}
/**
 * This function set class for value
 * @param {Number} value
 */
function getValue(value, opinions) {
  let cssClass = '';
  let definedValue = '';
  let definedOpinions = '';
  if(value > 0 && value <= 0.5) {
    cssClass = `<i class="fa fa-star-half-o icon orange"></i><i class="fa fa-star-o icon orange"></i><i class="fa fa-star-o icon orange"></i><i class="fa fa-star-o icon orange"></i><i class="fa fa-star-o icon orange"></i>`
  }
  if(value > 0.5 && value <= 1) {
    cssClass = `<i class="fa fa-star icon orange"></i><i class="fa fa-star-o icon orange"></i><i class="fa fa-star-o icon orange"></i><i class="fa fa-star-o icon orange"></i><i class="fa fa-star-o icon orange"></i>`
  }
  if(value > 1 && value <= 1.5) {
    cssClass = `<i class="fa fa-star icon orange"></i><i class="fa fa-star-half-o icon orange"></i><i class="fa fa-star-o icon orange"></i><i class="fa fa-star-o icon orange"></i><i class="fa fa-star-o icon orange"></i>`
  }
  if(value > 1.5 && value <= 2) {
    cssClass = `<i class="fa fa-star icon orange"></i><i class="fa fa-star icon orange"></i><i class="fa fa-star-o icon orange"></i><i class="fa fa-star-o icon orange"></i><i class="fa fa-star-o icon orange"></i>`
  }
  if(value > 2 && value <= 2.5) {
    cssClass = `<i class="fa fa-star icon orange"></i><i class="fa fa-star icon orange"></i><i class="fa fa-star-half-o icon orange"></i><i class="fa fa-star-o icon orange"></i><i class="fa fa-star-o icon orange"></i>`
  }
  if(value > 2.5 && value <= 3) {
    cssClass = `<i class="fa fa-star icon orange"></i><i class="fa fa-star icon orange"></i><i class="fa fa-star icon orange"></i><i class="fa fa-star-o icon orange"></i><i class="fa fa-star-o icon orange"></i>`
  }
  if(value > 3 && value <= 3.5) {
    cssClass = `<i class="fa fa-star icon orange"></i><i class="fa fa-star icon orange"></i><i class="fa fa-star icon orange"></i><i class="fa fa-star-half-o icon orange"></i><i class="fa fa-star-o icon orange"></i>`
  }
  if(value > 3.5 && value <= 4) {
    cssClass = `<i class="fa fa-star icon orange"></i><i class="fa fa-star icon orange"></i><i class="fa fa-star icon orange"></i><i class="fa fa-star icon orange"></i><i class="fa fa-star-o icon orange"></i>`
  }
  if(value > 4 && value <= 4.5) {
    cssClass = `<i class="fa fa-star icon orange"></i><i class="fa fa-star icon orange"></i><i class="fa fa-star icon orange"></i><i class="fa fa-star icon orange"></i><i class="fa fa-star-half-o icon orange"></i>`
  }
  if(value > 4.5 && value <= 5) {
    cssClass = `<i class="fa fa-star icon orange"></i><i class="fa fa-star icon orange"></i><i class="fa fa-star icon orange"></i><i class="fa fa-star icon orange"></i><i class="fa fa-star icon orange"></i>`
  }
  definedValue = `${value} de un máximo de 5 estrellas</br>`;
  definedOpinions = `</br>${opinions} opiniones`;
  definedValue += cssClass;
  definedValue += definedOpinions;
  return definedValue;
}
/**
 * This function set the element.price
 * @param {Array} printers
 */
function setPrice(printers) {
  printers.forEach((element) => {
    https.get(element.link, (res) => {
      var data = '';
      res.on('data', function (chunk) {
        data += chunk;
      });
      res.on('end', function () {
        price = data.match(/<span class="price" style="color:#000000;">(.*?)<\/span>/g).map(function (val) {
          var firstVal = val.replace(/<\/?span class="price" style="color:#000000;">/g, '');
          return firstVal.replace(/<\/?span>/g, '') !== '' ? firstVal.replace(/<\/?span>/g, '') : 'No disponible';
        });
        element.price = price[0];
      });

    }).on('error', (e) => {
      console.error(e);
    });
  });
};

/**
 * This function get the data from value and opinions and set the element.value and element.opinions
 * @param {Array} printers
 */
function setValue(printers) {
  printers.forEach((element) => {
    https.get('https://www.amazon.es/gp/customer-reviews/widgets/average-customer-review/popover/ref=dpx_acr_pop_?contextId=dpx&asin=' + element.asin, (res) => {
      let newData = '';
      res.on('data', function (chunk) {
        newData += chunk;
      });
      res.on('end', function () {
        let newString = newData.replace(/[\n\r]+|[\s]{2,}/g, ' ');
        // Get value of product url
        let newVal = newString.match(/<span class="a-size-base a-color-secondary">(.*?)<\/span>/g).map(function (val) {
          var firstVal = val.replace(/<\/?span class="a-size-base a-color-secondary">/g, '');
          return firstVal.replace(/<\/?span>/g, '') !== '' ? firstVal.replace(/<\/?span>/g, '') : 'No disponible';
        });
        // Set value of product
        let removeWhiteSpace = newVal[0].replace('  ', '');
        let getOnlyValue = removeWhiteSpace.replace(' de un máximo de 5 estrellas  ', '')
        element.value = getOnlyValue;

        // Get opinions of product url
        let opinions = '';
        if(newString.match(/Consulte todas las (.*?) opiniones/g)) {
          opinions = newString.match(/Consulte todas las (.*?) opiniones/g).map(function (val) {
            var firstOpinions = val.replace(/Consulte todas las /g, '');
            return firstOpinions.replace(/ opiniones/g, '');
          });
        } else {
          opinions = '1';
        }
        // Set opinions number
        element.opinions = parseInt(opinions[0]);
      });

    }).on('error', (e) => {
      console.error(e);
    });
  });
};
/**
 * This function set the property printers element.opinionsLink
 * @param {Array} printers
 */
function setOpinionsLink(printers) {
  printers.forEach((element) => {
    element.opinionsLink = 'https://www.amazon.es/product-reviews/' + element.asin + '/ref=as_li_ss_tl?ie=UTF8&linkCode=sl2&tag=3dmakernow-21';
  });
};
