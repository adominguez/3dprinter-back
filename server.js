var express = require('express');
var _ = require('underscore');
var https = require("https");

var app = express();
var PORT = process.env.PORT || 8000;

var printers = [{
    id: 'anpri3',
    name: 'Anycubic Prusa i3 Impresora 3D',
    category: 'kit',
    image: 'https://3dmakernow.com/wp-content/uploads/2018/04/61mDMg6A-zL._SX425_.jpg',
    link: 'https://ws-eu.assoc-amazon.com/widgets/cm?lt1=_blank&bc1=000000&IS2=1&bg1=FFFFFF&fc1=000000&lc1=0000FF&t=3dmakernow-21&o=30&p=8&l=as4&m=amazon&f=ifr&ref=as_ss_li_til&asins=B074DQZCLT&linkId=6eb438141821bcf39d6797836975c893',
    shortlink: 'https://amzn.to/2sGEfJN',
    postlink: 'http://3dmakernow.com/anycubic-prusa-i3-impresora-3d',
    building: '10 horas',
    experience: 'Intermedia',
    price: '0',
    quality: 'Buena',
    dimensions: '475 x 410 x 460mm',
    value: '7'
  },
  {
    id: 'ankoli',
    name: 'Anycubic Kossel Linear Plus',
    category: 'kit',
    image: 'https://3dmakernow.com/wp-content/uploads/2018/05/201801051039328705.jpg',
    link: 'https://ws-eu.assoc-amazon.com/widgets/cm?lt1=_blank&bc1=000000&IS2=1&bg1=FFFFFF&fc1=000000&lc1=0000FF&t=3dmakernow-21&o=30&p=8&l=as4&m=amazon&f=ifr&ref=as_ss_li_til&asins=B076H2KJVG&linkId=6438dd6e4731db8e0f24dd07ee81d70d',
    shortlink: 'https://amzn.to/2JdJeNz',
    postlink: 'https://3dmakernow.com/anycubic-kossel-linear-plus/',
    building: '05 horas',
    experience: 'Basica',
    price: '0',
    quality: 'Buena',
    dimensions: '300mm',
    value: '8'
  },
  {
    id: '3dana6',
    name: 'Impresora 3D Anet A6',
    category: 'kit',
    image: 'https://3dmakernow.com/wp-content/uploads/2018/05/7167OhjMPFL._SX425_.jpg',
    link: 'https://ws-eu.assoc-amazon.com/widgets/cm?lt1=_blank&bc1=000000&IS2=1&bg1=FFFFFF&fc1=000000&lc1=0000FF&t=3dmakernow-21&o=30&p=8&l=as4&m=amazon&f=ifr&ref=as_ss_li_til&asins=B01N4KT3SC&linkId=bae69a4cfd6684fad7c722367939359f',
    shortlink: 'https://amzn.to/2JdJwDK',
    postlink: 'https://3dmakernow.com/impresora-3d-anet-a6-opiniones/',
    building: '08 horas',
    experience: 'Basica',
    price: '0',
    quality: 'Buena',
    dimensions: '400 x 500 x 400mm',
    value: '9'
  },
  {
    id: '3dana8',
    name: 'Impresora 3D Anet A8',
    category: 'kit',
    image: 'https://3dmakernow.com/wp-content/uploads/2018/05/61uZ-K4dBGL._SX425_.jpg',
    link: 'https://ws-eu.assoc-amazon.com/widgets/cm?lt1=_blank&bc1=000000&IS2=1&bg1=FFFFFF&fc1=000000&lc1=0000FF&t=3dmakernow-21&o=30&p=8&l=as4&m=amazon&f=ifr&ref=as_ss_li_til&asins=B075TZPX5G&linkId=95dca0935c3d069940fbed1b2cd62302',
    shortlink: 'https://amzn.to/2xETrgA',
    postlink: 'https://3dmakernow.com/impresora-3d-anet-a8-opiniones/',
    building: '08 horas',
    experience: 'Basica',
    price: '0',
    quality: 'Buena',
    dimensions: '510 x 400 x 415mm',
    value: '9'
  },
  {
    id: 'gepri3',
    name: 'Geeetech Prusa I3 Pro B',
    category: 'kit',
    image: 'https://3dmakernow.com/wp-content/uploads/2018/05/51btpEFWpFL._SX425_.jpg',
    link: 'https://ws-eu.assoc-amazon.com/widgets/cm?lt1=_blank&bc1=000000&IS2=1&bg1=FFFFFF&fc1=000000&lc1=0000FF&t=3dmakernow-21&o=30&p=8&l=as4&m=amazon&f=ifr&ref=as_ss_li_til&asins=B01GJDO9I0&linkId=106ce0ded663b0f821a024deda8587f9',
    shortlink: 'https://amzn.to/2JgTQqK',
    postlink: 'https://3dmakernow.com/geeetech-prusa-i3-pro-b-opiniones/',
    building: '12 horas',
    experience: 'Avanzada',
    price: '0',
    quality: 'Media',
    dimensions: '450 x 440 x 440mm',
    value: '6'
  },
  {
    id: 'ani3me',
    name: 'Impresora 3D Anycubic I3 Mega',
    category: 'principiante',
    image: 'https://3dmakernow.com/wp-content/uploads/2018/05/61OeIv3kdNL._SX425_.jpg',
    link: 'https://ws-eu.assoc-amazon.com/widgets/cm?lt1=_blank&bc1=000000&IS2=1&bg1=FFFFFF&fc1=000000&lc1=0000FF&t=3dmakernow-21&o=30&p=8&l=as4&m=amazon&f=ifr&ref=as_ss_li_til&asins=B06XK7VYX9&linkId=10927245ee752e9cfb2d97039e375f69',
    shortlink: 'https://amzn.to/2suQMAP',
    postlink: 'https://3dmakernow.com/anycubic-i3-mega-opiniones-valoracion-analisis/',
    building: '-',
    experience: 'Basica',
    price: '0',
    quality: 'Buena',
    dimensions: '475 x 410 x 460mm',
    value: '10'
  },
  {
    id: 'crcr10',
    name: 'Impresora 3D Creality CR10',
    category: 'principiante',
    image: 'https://3dmakernow.com/wp-content/uploads/2018/05/51ZdYvvZ9L._SX425_.jpg',
    link: 'https://ws-eu.assoc-amazon.com/widgets/cm?lt1=_blank&bc1=000000&IS2=1&bg1=FFFFFF&fc1=000000&lc1=0000FF&t=3dmakernow-21&o=30&p=8&l=as4&m=amazon&f=ifr&ref=as_ss_li_til&asins=B07B6JR4YR&linkId=9da97f68c6289099f7c9fc0a4e907756',
    shortlink: 'https://amzn.to/2svhbP2',
    postlink: 'https://3dmakernow.com/impresora-3d-cr10-opiniones-valoracion-analisis/',
    building: '-',
    experience: 'Basica',
    price: '0',
    quality: 'Buena',
    dimensions: '620 x 490 x 615mm',
    value: '9'
  },
  {
    id: 'cren2d',
    name: 'Creality Ender 2 Desktop',
    category: 'principiante',
    image: 'https://3dmakernow.com/wp-content/uploads/2018/05/414l5cb72IL._SX425_.jpg',
    link: 'https://ws-eu.assoc-amazon.com/widgets/cm?lt1=_blank&bc1=000000&IS2=1&bg1=FFFFFF&fc1=000000&lc1=0000FF&t=3dmakernow-21&o=30&p=8&l=as4&m=amazon&f=ifr&ref=as_ss_li_til&asins=B073DBZN8Z&linkId=47c1c6a569e92ccd9ecd966ce21180a3',
    shortlink: 'https://amzn.to/2xHkSWL',
    postlink: 'https://3dmakernow.com/creality-ender-2-desktop-opiniones/',
    building: '-',
    experience: 'Basica',
    price: '0',
    quality: 'Buena',
    dimensions: '330 x 330 x 540mm',
    value: '9'
  },
  {
    id: '3danph',
    name: 'Impresora 3D Anycubic Photon',
    category: 'profesional',
    image: 'https://3dmakernow.com/wp-content/uploads/2018/05/201801201844010827.jpg',
    link: 'https://ws-eu.assoc-amazon.com/widgets/cm?lt1=_blank&bc1=000000&IS2=1&bg1=FFFFFF&fc1=000000&lc1=0000FF&t=3dmakernow-21&o=30&p=8&l=as4&m=amazon&f=ifr&ref=as_ss_li_til&asins=B078TCT7P5&linkId=66042dbbed38ebf6b8656236749a17f3',
    shortlink: 'https://amzn.to/2Htdb6i',
    postlink: 'https://3dmakernow.com/anycubic-photon-impresora-3d/',
    building: '-',
    experience: 'Avanzada',
    price: '0',
    quality: 'Buena',
    dimensions: '405 x 410 x 453mm',
    value: '7'
  }
];

setPrice(printers);

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
  var matchedJsonCategory = { "data": []};
  var jsonForTable = [];


  printers.forEach((element) => {
    if (element.category === printersCategory) {

      jsonForTable = [getImage(element.image, element.name, element.postlink), element.building, element.experience, element.price, element.quality, element.dimensions, getValue(element.value)]
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

function getImage(image, name, postlink) {
  return `<div class='table-image' style='background:url(${image})  no-repeat center center; background-size: cover'><a href='${postlink}' class='table-link' target='_blank'>${name}</a></div>`
}

function getValue(value) {
  let cssClass = 'medium';
  if (value > 8) {
    cssClass = 'high'
  }
  if (value < 6) {
    cssClass = 'low'
  }
  return `<span class='score ${cssClass}'>${value}</span>`
}

function setPrice(printers) {
  printers.forEach((element) => {
    https.get(element.link, (res) => {
      var data = '';
      res.on('data', function (chunk) {
        data += chunk;
      });
      res.on('end', function () {
        price = data.match(/<span class="price" style="color:#000000;">(.*?)<\/span>/g).map(function(val){
          var firstVal =  val.replace(/<\/?span class="price" style="color:#000000;">/g,'');
          return firstVal.replace(/<\/?span>/g,'') !== '' ? firstVal.replace(/<\/?span>/g,'') : 'No disponible';
       });
       element.price = price[0];
      });

    }).on('error', (e) => {
      console.error(e);
    });
  });
}
