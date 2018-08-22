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
    gearbestLink: 'https://www.gearbest.com/3d-printers-3d-printer-kits/pp_640022.html?lkid=15117381',
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
    gearbestLink: 'https://www.gearbest.com/3d-printers-3d-printer-kits/pp_428456.html?lkid=15117394',
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
    link: 'https://ws-eu.assoc-amazon.com/widgets/cm?lt1=_blank&bc1=000000&IS2=1&bg1=FFFFFF&fc1=000000&lc1=0000FF&t=3dmakernow-21&language=es_ES&o=30&p=8&l=as4&m=amazon&f=ifr&ref=as_ss_li_til&asins=B01N7P10AQ&linkId=b5b67aee4b7e61c713c32d41f5b4fbc2',
    gearbestLink: 'https://www.gearbest.com/3d-printers-3d-printer-kits/pp_337314.html?lkid=15117326',
    shortlink: 'https://amzn.to/2MHQRfY',
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
    gearbestLink: 'https://www.gearbest.com/3d-printers-3d-printer-kits/pp_671774.html?lkid=15117439',
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
    gearbestLink: 'https://www.gearbest.com/3d-printers-3d-printer-kits/pp_641323.html?lkid=15117367',
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
    link: 'https://ws-eu.assoc-amazon.com/widgets/cm?lt1=_blank&bc1=000000&IS2=1&bg1=FFFFFF&fc1=000000&lc1=0000FF&t=3dmakernow-21&language=es_ES&o=30&p=8&l=as4&m=amazon&f=ifr&ref=as_ss_li_til&asins=B07C268XJY&linkId=2276dbca95386cdde03f2ed0d066040c',
    gearbestLink: 'https://www.gearbest.com/3d-printers-3d-printer-kits/pp_441282.html?wid=1640583&lkid=15384322',
    shortlink: 'https://amzn.to/2w63mZn',
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
    gearbestLink: 'https://www.gearbest.com/3d-printers-3d-printer-kits/pp_664899.html?lkid=15117460',
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
    id: 'ge3d18',
    asin: 'B076P63G2Y',
    name: 'Impresora 3D Geeetech E180',
    category: 'principiante',
    image: 'https://3dmakernow.com/wp-content/uploads/2018/07/51rM1bSIg2L._SX466_.jpg',
    link: 'https://ws-eu.assoc-amazon.com/widgets/cm?lt1=_blank&bc1=000000&IS2=1&bg1=FFFFFF&fc1=000000&lc1=0000FF&t=3dmakernow-21&o=30&p=8&l=as4&m=amazon&f=ifr&ref=as_ss_li_til&asins=B076P63G2Y&linkId=174071b95af0a2585ff76ffd4156b521',
    gearbestLink: 'https://www.gearbest.com/3d-printers-3d-printer-kits/pp_1166685.html?lkid=15117469',
    shortlink: 'https://amzn.to/2yXC0bH',
    postlink: 'https://amzn.to/2yXC0bH',
    amazon: true,
    opinionsLink: '',
    building: '-',
    dificult: 'Basica',
    price: '0',
    quality: 'Buena',
    dimensions: '284 x 156 x 320mm',
    value: '9',
    opinions: ''
  },
  {
    id: 'cren2d',
    asin: 'B073DBZN8Z',
    name: 'Creality Ender 2 Desktop',
    category: 'principiante',
    image: 'https://3dmakernow.com/wp-content/uploads/2018/05/414l5cb72IL._SX425_.jpg',
    link: 'https://ws-eu.assoc-amazon.com/widgets/cm?lt1=_blank&bc1=000000&IS2=1&bg1=FFFFFF&fc1=000000&lc1=0000FF&t=3dmakernow-21&o=30&p=8&l=as4&m=amazon&f=ifr&ref=as_ss_li_til&asins=B073DBZN8Z&linkId=47c1c6a569e92ccd9ecd966ce21180a3',
    gearbestLink: 'https://www.gearbest.com/3d-printers-3d-printer-kits/pp_620372.html?lkid=15117427',
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
    id: 'cren3d',
    asin: 'B07DPJHML9',
    name: 'Impresora 3D Creality Ender 3',
    category: 'principiante',
    image: 'https://3dmakernow.com/wp-content/uploads/2018/06/610oWCT427L._SY450_.jpg',
    link: 'https://ws-eu.assoc-amazon.com/widgets/cm?lt1=_blank&bc1=000000&IS2=1&bg1=FFFFFF&fc1=000000&lc1=0000FF&t=3dmakernow-21&o=30&p=8&l=as4&m=amazon&f=ifr&ref=as_ss_li_til&asins=B07DPJHML9&linkId=9b9b2622bcf0c365d8120fadda3cef35',
    gearbestLink: 'https://www.gearbest.com/3d-printers-3d-printer-kits/pp_1845899.html?lkid=15117475',
    shortlink: 'https://amzn.to/2IELXKo',
    postlink: 'https://amzn.to/2IELXKo',
    amazon: true,
    opinionsLink: '',
    building: '-',
    dificult: 'Basica',
    price: '0',
    quality: 'Buena',
    dimensions: '440 x 410 x 465mm',
    value: '9',
    opinions: ''
  },
  {
    id: 'bqwigo',
    asin: 'B074KRD6W3',
    name: 'Impresora 3D BQ Witbox Go',
    category: 'principiante',
    image: 'https://3dmakernow.com/wp-content/uploads/2018/07/81djxONrAOL._SY466_.jpg',
    link: 'https://ws-eu.assoc-amazon.com/widgets/cm?lt1=_blank&bc1=000000&IS2=1&bg1=FFFFFF&fc1=000000&lc1=0000FF&t=3dmakernow-21&o=30&p=8&l=as4&m=amazon&f=ifr&ref=as_ss_li_til&asins=B074KRD6W3&linkId=c6c4b4bb563dcb868e46a04ebd1e5854',
    shortlink: 'https://amzn.to/2KmFycQ',
    postlink: 'https://amzn.to/2KmFycQ',
    amazon: true,
    opinionsLink: '',
    building: '-',
    dificult: 'Basica',
    price: '0',
    quality: '-',
    dimensions: '300 x 255 x 480mm',
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
    gearbestLink: 'https://www.gearbest.com/3d-printers-3d-printer-kits/pp_1579266.html?lkid=15117497',
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
  },
  {
    id: 'wadup7',
    asin: 'B071HJ8CV8',
    name: 'Impresora SLA Wanhao Duplicator 7',
    category: 'profesional',
    image: 'https://3dmakernow.com/wp-content/uploads/2018/06/41yNgs79b2L._SY355_.jpg',
    link: 'https://ws-eu.assoc-amazon.com/widgets/cm?lt1=_blank&bc1=000000&IS2=1&bg1=FFFFFF&fc1=000000&lc1=0000FF&t=3dmakernow-21&o=30&p=8&l=as4&m=amazon&f=ifr&ref=as_ss_li_til&asins=B071HJ8CV8&linkId=3bf5fde455221902a63ee953c96117e2',
    shortlink: 'https://amzn.to/2tRm6tu',
    postlink: 'https://amzn.to/2tRm6tu',
    amazon: true,
    opinionsLink: '',
    building: '-',
    dificult: 'Avanzada',
    price: '0',
    quality: '-',
    dimensions: '-',
    value: '7',
    opinions: ''
  },
  {
    id: 'slafo2',
    asin: 'B07BLB1L5L',
    name: 'Impresora SLA Formlabs Form 2',
    category: 'profesional',
    image: 'https://3dmakernow.com/wp-content/uploads/2018/07/41JoHUUg1GL._SY450_.jpg',
    link: 'https://ws-eu.assoc-amazon.com/widgets/cm?lt1=_blank&bc1=000000&IS2=1&bg1=FFFFFF&fc1=000000&lc1=0000FF&t=3dmakernow-21&o=30&p=8&l=as4&m=amazon&f=ifr&ref=as_ss_li_til&asins=B07BLB1L5L&linkId=b8192c1ed9258fbf6b3242e6654adcb9',
    shortlink: 'https://amzn.to/2KltGHT',
    postlink: 'https://amzn.to/2KltGHT',
    amazon: true,
    opinionsLink: '',
    building: '-',
    dificult: 'Avanzada',
    price: '0',
    quality: '-',
    dimensions: '-',
    value: '7',
    opinions: ''
  }
];

var materials = [{
    id: 'bqeago',
    asin: 'B077K5PT83',
    name: 'Filamento pla 1.75 bq Easy Go',
    category: 'filamento',
    image: 'https://3dmakernow.com/wp-content/uploads/2018/06/pla-bq-175-easy-go.png',
    link: 'https://ws-eu.assoc-amazon.com/widgets/cm?lt1=_blank&bc1=000000&IS2=1&bg1=FFFFFF&fc1=000000&lc1=0000FF&t=3dmakernow-21&o=30&p=8&l=as4&m=amazon&f=ifr&ref=as_ss_li_til&asins=B077K5PT83&linkId=51730e6b2b2741574c2d807a80786aa6',
    shortlink: 'https://amzn.to/2JzmEOC',
    postlink: 'https://3dmakernow.com/filamento-pla-175-bq-easy-go/',
    opinionsLink: '',
    quantity: '1kg',
    dificult: 'Básica',
    price: '0',
    quality: 'Buena',
    value: '8'
  },
  {
    id: 'geepla',
    asin: 'B01MR5OCX5',
    name: 'Filamento pla 1.75 Geeetech',
    category: 'filamento',
    image: 'https://3dmakernow.com/wp-content/uploads/2018/06/61iFdbZWq3L._SX385_.jpg',
    link: 'https://ws-eu.assoc-amazon.com/widgets/cm?lt1=_blank&bc1=000000&IS2=1&bg1=FFFFFF&fc1=000000&lc1=0000FF&t=3dmakernow-21&o=30&p=8&l=as4&m=amazon&f=ifr&ref=as_ss_li_til&asins=B01MR5OCX5&linkId=ed9be35c03e0f092b84eb218cc64e35e',
    shortlink: 'https://amzn.to/2lIOdY5',
    postlink: 'https://amzn.to/2lIOdY5',
    amazon: true,
    opinionsLink: '',
    quantity: '1kg',
    dificult: 'Básica',
    price: '0',
    quality: 'Buena',
    value: '8'
  },
  {
    id: 'geemad',
    asin: 'B075ZPT7MF',
    name: 'Filamento Madera 1.75 Geeetech',
    category: 'filamento',
    image: 'https://3dmakernow.com/wp-content/uploads/2018/07/61gbc2jsd9L._SX466_.jpg',
    link: 'https://ws-eu.assoc-amazon.com/widgets/cm?lt1=_blank&bc1=000000&IS2=1&bg1=FFFFFF&fc1=000000&lc1=0000FF&t=3dmakernow-21&o=30&p=8&l=as4&m=amazon&f=ifr&ref=as_ss_li_til&asins=B075ZPT7MF&linkId=eb03dfc48496826725048465aa92dd4f',
    shortlink: 'https://amzn.to/2z7QS7x',
    postlink: 'https://amzn.to/2z7QS7x',
    amazon: true,
    opinionsLink: '',
    quantity: '1kg',
    dificult: 'Básica',
    price: '0',
    quality: 'Buena',
    value: '8'
  },
  {
    id: 'sunpla',
    asin: 'B075H649NR',
    name: 'Filamento PLA 1.75 SUNLU Plus',
    category: 'filamento',
    image: 'https://3dmakernow.com/wp-content/uploads/2018/07/61XBSuRzBwL._SY466_.jpg',
    link: 'https://ws-eu.assoc-amazon.com/widgets/cm?lt1=_blank&bc1=000000&IS2=1&bg1=FFFFFF&fc1=000000&lc1=0000FF&t=3dmakernow-21&o=30&p=8&l=as4&m=amazon&f=ifr&ref=as_ss_li_til&asins=B075H649NR&linkId=0eec2eea886c9a62d4172f3dc0551f8d',
    shortlink: 'https://amzn.to/2lLLey0',
    postlink: 'https://amzn.to/2lLLey0',
    amazon: true,
    opinionsLink: '',
    quantity: '1kg',
    dificult: 'Básica',
    price: '0',
    quality: 'Buena',
    value: '8'
  },
  {
    id: 'sunabs',
    asin: 'B074Z6KDCC',
    name: 'Filamento ABS 1.75 SUNLU Plus',
    category: 'filamento',
    image: 'https://3dmakernow.com/wp-content/uploads/2018/07/61TisaGyYRL._SY466_.jpg',
    link: 'https://ws-eu.assoc-amazon.com/widgets/cm?lt1=_blank&bc1=000000&IS2=1&bg1=FFFFFF&fc1=000000&lc1=0000FF&t=3dmakernow-21&o=30&p=8&l=as4&m=amazon&f=ifr&ref=as_ss_li_til&asins=B074Z6KDCC&linkId=021010bb80df8f143191acb583aad346',
    shortlink: 'https://amzn.to/2MCYNv4',
    postlink: 'https://amzn.to/2MCYNv4',
    amazon: true,
    opinionsLink: '',
    quantity: '1kg',
    dificult: 'Básica',
    price: '0',
    quality: 'Buena',
    value: '8'
  },
  {
    id: 'rewa10',
    asin: 'B075K6H8YP',
    name: 'Resina Wanhao 1000 ml',
    category: 'resina',
    image: 'https://3dmakernow.com/wp-content/uploads/2018/06/51PNfkJ8OUL._SY355_.jpg',
    link: 'https://ws-eu.assoc-amazon.com/widgets/cm?lt1=_blank&bc1=000000&IS2=1&bg1=FFFFFF&fc1=000000&lc1=0000FF&t=3dmakernow-21&o=30&p=8&l=as4&m=amazon&f=ifr&ref=as_ss_li_til&asins=B075K6H8YP&linkId=5d1fc8f61c1d6b63a82d8395eb7da354',
    shortlink: 'https://amzn.to/2MECxRR',
    postlink: 'https://amzn.to/2MECxRR',
    amazon: true,
    opinionsLink: '',
    quantity: '1000ml',
    dificult: 'Avanzada',
    price: '0',
    quality: 'Buena',
    value: '8'
  },
  {
    id: 'rean10',
    asin: 'B07DJ2DXDS',
    name: 'Resina anycubic 1000 ml',
    category: 'resina',
    image: 'https://3dmakernow.com/wp-content/uploads/2018/06/51kvrRle24L._SX342_.jpg',
    link: 'https://ws-eu.assoc-amazon.com/widgets/cm?lt1=_blank&bc1=000000&IS2=1&bg1=FFFFFF&fc1=000000&lc1=0000FF&t=3dmakernow-21&o=30&p=8&l=as4&m=amazon&f=ifr&ref=as_ss_li_til&asins=B07DJ2DXDS&linkId=410b302ac00b5f7808dba104e1bde44e',
    shortlink: 'https://amzn.to/2z03Hka',
    postlink: 'https://amzn.to/2z03Hka',
    amazon: true,
    opinionsLink: '',
    quantity: '1000ml',
    dificult: 'Avanzada',
    price: '0',
    quality: 'Buena',
    value: '8'
  },
  {
    id: 'refo10',
    asin: 'B01GZ1TNL4',
    name: 'Resina Formlabs negro 1000 ml',
    category: 'resina',
    image: 'https://3dmakernow.com/wp-content/uploads/2018/07/21A96BnQlZL.jpg',
    link: 'https://ws-eu.assoc-amazon.com/widgets/cm?lt1=_blank&bc1=000000&IS2=1&bg1=FFFFFF&fc1=000000&lc1=0000FF&t=3dmakernow-21&o=30&p=8&l=as4&m=amazon&f=ifr&ref=as_ss_li_til&asins=B01GZ1TNL4&linkId=574fed7ef58d2a8d1a35bbc7a09031aa',
    shortlink: 'https://amzn.to/2KoxGY2',
    postlink: 'https://amzn.to/2KoxGY2',
    amazon: true,
    opinionsLink: '',
    quantity: '1000ml',
    dificult: 'Avanzada',
    price: '0',
    quality: 'Buena',
    value: '8'
  }
];
setPrinters(printers);
setMaterials(materials);


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

      jsonForTable = [getImage(element), element.building, element.dificult, element.price, element.quality, element.dimensions, getValue(element.value, element.opinions)]
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

// GET /materials
app.get('/materials', function (req, res) {
  res.header('Access-Control-Allow-Origin', "*"); // TODO - Make this more secure!!
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST');
  res.header('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept');
  res.json(materials);
});


// GET /materials/:category
app.get('/materials/:category', function (req, res) {
  var materialsCategory = req.params.category;
  var matchedJsonCategory = [];
  materials.forEach((element) => {
    if (element.category === materialsCategory) {
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

// GET /material/:id
app.get('/material/:id', function (req, res) {
  var materialId = req.params.id;
  var matchedJsonId = [];
  materials.forEach((element) => {
    if (element.id === materialId) {
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

// GET /materials/:category/table
app.get('/materials/:category/table', function (req, res) {
  var materialsCategory = req.params.category;
  var matchedJsonCategory = {
    "data": []
  };
  var jsonForTable = [];


  materials.forEach((element) => {
    if (element.category === materialsCategory) {

      jsonForTable = [getImage(element), element.quantity, element.dificult, element.price, element.quality, getValue(element.value, element.opinions)]
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
 * Set all functions for printers
 * @param {Array} materials
 */
function setPrinters(printers) {
  setValue(printers);
  setPrice(printers);
  setOpinionsLink(printers);
  setGearbest(printers);
}
/**
 * Set all functions for materials
 * @param {Array} materials
 */
function setMaterials(materials) {
  setValue(materials);
  setPrice(materials);
  setOpinionsLink(materials);
  setGearbest(printers);
}
/**
 * This function show a div with image for show it in table
 * @param {String} image
 * @param {String} name
 * @param {String} postlink
 */
function getImage(element) {
  return `<div class='table-image' style='background:url(${element.image})  no-repeat center center; background-size: cover'><a href='${element.postlink}' class='table-link' ${element.amazon ? 'rel="nofollow"' : ''} target='_blank'>${element.name}</a></div>`
}
/**
 * This function set class for value
 * @param {Number} value
 */
function getValue(value, opinions) {
  let cssClass = '<i class="fa fa-star-o icon orange"></i><i class="fa fa-star-o icon orange"></i><i class="fa fa-star-o icon orange"></i><i class="fa fa-star-o icon orange"></i><i class="fa fa-star-o icon orange"></i>';
  let definedValue = `</br>${opinions} opiniones`;
  let definedOpinions = '';
  if (value > 0 && value <= 0.5) {
    cssClass = `<i class="fa fa-star-half-o icon orange"></i><i class="fa fa-star-o icon orange"></i><i class="fa fa-star-o icon orange"></i><i class="fa fa-star-o icon orange"></i><i class="fa fa-star-o icon orange"></i>`
  }
  if (value > 0.5 && value <= 1) {
    cssClass = `<i class="fa fa-star icon orange"></i><i class="fa fa-star-o icon orange"></i><i class="fa fa-star-o icon orange"></i><i class="fa fa-star-o icon orange"></i><i class="fa fa-star-o icon orange"></i>`
  }
  if (value > 1 && value <= 1.5) {
    cssClass = `<i class="fa fa-star icon orange"></i><i class="fa fa-star-half-o icon orange"></i><i class="fa fa-star-o icon orange"></i><i class="fa fa-star-o icon orange"></i><i class="fa fa-star-o icon orange"></i>`
  }
  if (value > 1.5 && value <= 2) {
    cssClass = `<i class="fa fa-star icon orange"></i><i class="fa fa-star icon orange"></i><i class="fa fa-star-o icon orange"></i><i class="fa fa-star-o icon orange"></i><i class="fa fa-star-o icon orange"></i>`
  }
  if (value > 2 && value <= 2.5) {
    cssClass = `<i class="fa fa-star icon orange"></i><i class="fa fa-star icon orange"></i><i class="fa fa-star-half-o icon orange"></i><i class="fa fa-star-o icon orange"></i><i class="fa fa-star-o icon orange"></i>`
  }
  if (value > 2.5 && value <= 3) {
    cssClass = `<i class="fa fa-star icon orange"></i><i class="fa fa-star icon orange"></i><i class="fa fa-star icon orange"></i><i class="fa fa-star-o icon orange"></i><i class="fa fa-star-o icon orange"></i>`
  }
  if (value > 3 && value <= 3.5) {
    cssClass = `<i class="fa fa-star icon orange"></i><i class="fa fa-star icon orange"></i><i class="fa fa-star icon orange"></i><i class="fa fa-star-half-o icon orange"></i><i class="fa fa-star-o icon orange"></i>`
  }
  if (value > 3.5 && value <= 4) {
    cssClass = `<i class="fa fa-star icon orange"></i><i class="fa fa-star icon orange"></i><i class="fa fa-star icon orange"></i><i class="fa fa-star icon orange"></i><i class="fa fa-star-o icon orange"></i>`
  }
  if (value > 4 && value <= 4.5) {
    cssClass = `<i class="fa fa-star icon orange"></i><i class="fa fa-star icon orange"></i><i class="fa fa-star icon orange"></i><i class="fa fa-star icon orange"></i><i class="fa fa-star-half-o icon orange"></i>`
  }
  if (value > 4.5 && value <= 5) {
    cssClass = `<i class="fa fa-star icon orange"></i><i class="fa fa-star icon orange"></i><i class="fa fa-star icon orange"></i><i class="fa fa-star icon orange"></i><i class="fa fa-star icon orange"></i>`
  }
  definedValue = `${value} de un máximo de 5</br>`;
  if (opinions === 1) {
    definedOpinions = `</br>${opinions} opinión`;
  }
  if (opinions === 0) {
    definedOpinions = `</br>No hay opiniones todavía`;
  }
  if (opinions > 1) {
    definedOpinions = `</br>${opinions} opiniones`;
  }
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
          if (data.match(/<span class="price" style="color:#000000;">(.*?)<\/span>/g)) {
            price = data.match(/<span class="price" style="color:#000000;">(.*?)<\/span>/g).map(function (val) {
              var firstVal = val.replace(/<\/?span class="price" style="color:#000000;">/g, '');
              return firstVal.replace(/<\/?span>/g, '') !== '' ? firstVal.replace(/<\/?span>/g, '') : 'No disponible';
            });
            element.price = price[0];
          } else {
            element.price = "No disponible"
          }
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
        if (newString.match(/Consulte todas las (.*?) opiniones/g)) {
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

/**
 * This function set the property printers element.gearbestPrice
 * @param {Array} printers
 */
function setGearbest(printers) {
  printers.forEach((element) => {
    if (element.gearbestLink) {
      https.get(element.gearbestLink, (res) => {
        let newData = '';
        res.on('data', function (chunk) {
          newData += chunk;
        });
        res.on('end', function () {
          let newString = newData.replace(/[\n\r]+|[\s]{2,}/g, ' ');
          let newVal = newString.match(/ - \$(.*?) Free Shipping|GearBest.com<\/title>/g).map(function (val) {
            var firstVal = val.replace(/ - \$/g, '');
            return firstVal.replace(/ Free Shipping|GearBest.com<\/title>/g, '');
          });
          element.gearbestPrice = '$' + newVal[0].replace('.', ',');
        });
      }).on('error', (e) => {
        console.error(e);
      });
    }
  });
};
