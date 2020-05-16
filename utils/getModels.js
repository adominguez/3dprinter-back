const https = require('https');
var cheerio = require('cheerio');
var request = require('request');
const firebase = require('../app');
const sendEmail = require('../utils/sendEmail');

const authorityRequest = (link, method, authority, authorization) => {
  return {
    url: link,
    method: method,
    headers: {
      Accept: '*/*',
      'Accept-Encoding': '*',
      Connection: 'keep-alive',
      'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.106 Safari/537.36',
      authority,
      authorization,
      scheme: 'https'
    }
  }
}

const grabcadRequestParams = (link, word) => {
  return {
    url: link,
    method: 'POST',
    headers: {
      'Accept-Encoding': '*',
      Connection: 'keep-alive',
      'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.106 Safari/537.36',
      authority: 'api.thingiverse.com',
      authorization: 'Bearer 56edfc79ecf25922b98202dd79a291aa',
      scheme: 'https',
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({"sort":"recent","time":"all_time","query":word,"page":"1","per_page":20})
  }
}

const pinshapeParams = (link, word) => {
  return {
    url: link,
    method: 'POST',
    headers: {
      'Accept-Encoding': '*',
      Connection: 'keep-alive',
      'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.106 Safari/537.36',
      authority: 'api.thingiverse.com',
      authorization: 'Bearer 56edfc79ecf25922b98202dd79a291aa',
      scheme: 'https',
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({"requests":[{"indexName":"Item-production","params":`query=${word}&query=${word}&tagFilters=&hitsPerPage=20&page=0&facets=%5B%22type%22%2C%22category_slug%22%2C%22has_prints%22%2C%22is_free%22%2C%22download_price_cents%22%2C%22license_value%22%2C%22leopoly_remixable%22%2C%22nsfw_flag%22%2C%22printers_names%22%5D&facetFilters=%5B%22is_free%3Atrue%22%5D`}]})
  }
}

const requestParams = (url) => {
  return {
    url: url,
    method: 'GET',
    headers: {
      Accept: '*/*',
      'Accept-Encoding': '*',
      Connection: 'keep-alive',
      'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.106 Safari/537.36'
    }
  }
}

const formatThingiverseModels = (models) => {
  let thingiverseModels = [];
  if(models.hits) {
    models.hits.forEach((item, index) => {
      if(item['is_published'] && !item['is_private'] && !item['is_purchased']) {
        thingiverseModels.push({
          name: item['name'],
          url: item['public_url'],
          image: item['preview_image'],
          id: `thingiverse-model-${index}`,
          type: 'thingiverse'
        });
      }
    });
  }
  return thingiverseModels;
}

const formatCultsModels = (html) => {
  let cultsModels = [];
  const $ = cheerio.load(html);
  // const allArticles = $('.crea-group').html()
  $('.crea-group').find('.tbox').each(function (index, element) {
    const name = $(element).find('.tbox-title').text();
    const url = $(element).find('a.tbox-thumb').attr('href');
    const image = $(element).find('img').attr('src');
    cultsModels.push({
      name,
      url: `https://cults3d.com${url}`,
      image,
      id: `cults-model-${index}`,
      type: 'cults'
    });
  });
  return cultsModels;
}

const formatFree3DModels = (html) => {
  let free3DModels = [];
  const $ = cheerio.load(html);
  // const allArticles = $('.crea-group').html()
  $('.page-results-container').find('.search-result').each(function (index, element) {
    const name = $(element).find('a.link.product-page-link').text();
    const url = $(element).find('a.link.product-page-link').attr('href');
    const image = $(element).find('img.search-result__thumb').attr('src');
    const format = $(element).find('.search-result__format').text().toLowerCase();
    if(format.includes('stl')) {
      free3DModels.push({
        name,
        url: `https://cults3d.com${url}`,
        image,
        id: `free3d-model-${index}`,
        type: 'free3d'
      });
    }
  });
  return free3DModels;
}

const formatGrabCadModels = (grabcads) => {
  let grabcadModels = [];
  if(grabcads.models) {
    grabcads.models.forEach((item, index) => {
      grabcadModels.push({
        name: item['name'],
        url: `https://grabcad.com/library/${item['cached_slug']}`,
        image: item['preview_image'],
        id: `grabcad-model-${index}`,
        type: 'grabcad'
      });
    });
  }
  return grabcadModels;
}

const formatSketchfabModels = (models) => {
  let sketchfabsModels = [];
  if(models.results) {
    models.results.forEach((item, index) => {
      if(item['price'] === null && item['isPublished']) {
        sketchfabsModels.push({
          name: item['name'],
          url: item['embedUrl'].replace('/embed', ''),
          image: item['thumbnails'].images[1].url,
          id: `sketchfab-model-${index}`,
          type: 'sketchfab'
        });
      }
    });
  }
  return sketchfabsModels;
}

const formatPinshapeModels = (models) => {
  let pinshapesModels = [];
  if(models.hits) {
    models.hits.forEach((item, index) => {
      pinshapesModels.push({
        name: item['name'],
        url: `https://pinshape.com//items/${item['slug']}`,
        image: `https:${item['main_pin_image']}`,
        id: `pinshape-model-${index}`,
        type: 'pinshape'
      });
    });
  }
  return pinshapesModels;
}

exports.getThingiverseModels = (word) => {
  /**
   * llamamos a Thingiverse para traernos los datos
   */
  return new Promise(resolve => {
    const url = `https://api.thingiverse.com/search/${word}?page=1&per_page=20&sort=relevant&category_id=0&type=things`;
    request(authorityRequest(url, 'GET', 'api.thingiverse.com', 'Bearer 56edfc79ecf25922b98202dd79a291aa'), (error, response, html) => {
      if (error) {
        // sendEmail.errorRequestAutommaticallyUpdate(name, id, 'Amazon', error);
        return console.error(error);
      } else {
        const body = JSON.parse(response.body);
        resolve(formatThingiverseModels(body));
      }
    });
  })
};

exports.getGrabCadsModels = (word) => {
  /**
   * llamamos a Thingiverse para traernos los datos
   */
  return new Promise(resolve => {
    const url = `https://grabcad.com/community/api/v1/models`;
    request(grabcadRequestParams(url, word), (error, response, html) => {
      if (error) {
        // sendEmail.errorRequestAutommaticallyUpdate(name, id, 'Amazon', error);
        return console.error(error);
      } else {
        const body = JSON.parse(response.body);
        resolve(formatGrabCadModels(body));
      }
    });
  })
};

exports.getPinshapeModels = (word) => {
  /**
   * llamamos a Thingiverse para traernos los datos
   */
  return new Promise(resolve => {
    const url = `https://5lselcfmiw-dsn.algolia.net/1/indexes/*/queries?x-algolia-api-key=290d5641549ea32c237e2c98fd5f7249&x-algolia-application-id=5LSELCFMIW&x-algolia-agent=Algolia%20for%20vanilla%20JavaScript%203.7.5`;
    request(pinshapeParams(url, word), (error, response, html) => {
      if (error) {
        // sendEmail.errorRequestAutommaticallyUpdate(name, id, 'Amazon', error);
        return console.error(error);
      } else {
        const body = JSON.parse(response.body);
        resolve(formatPinshapeModels(body.results[0]));
      }
    });
  })
};

exports.getCultsModels = (word) => {
  /**
   * llamamos a Thingiverse para traernos los datos
   */
  return new Promise(resolve => {
    const url = `https://cults3d.com/es/b%C3%BAsqueda?only_free=true&only_safe=true&q=${word}`;
    request(requestParams(url), (error, response, html) => {
      if (error) {
        // sendEmail.errorRequestAutommaticallyUpdate(name, id, 'Amazon', error);
        return console.error(error);
      } else {
        resolve(formatCultsModels(html));
      }
    });
  })
};

exports.getFree3D = (word) => {
  /**
   * llamamos a Thingiverse para traernos los datos
   */
  return new Promise(resolve => {
    const url = `https://free3d.com/es/modelos-3d/3d-printable-${word}`;
    request(requestParams(url), (error, response, html) => {
      if (error) {
        // sendEmail.errorRequestAutommaticallyUpdate(name, id, 'Amazon', error);
        return console.error(error);
      } else {
        resolve(formatFree3DModels(html));
      }
    });
  })
};

exports.getSketchFab = (word) => {
  /**
   * llamamos a Thingiverse para traernos los datos
   */
  return new Promise(resolve => {
    const url = `https://sketchfab.com/i/search?q=${word}&sort_by=-pertinence&type=models`;
    request(url, (error, response, html) => {
      if (error) {
        // sendEmail.errorRequestAutommaticallyUpdate(name, id, 'Amazon', error);
        return console.error(error);
      } else {
        const body = JSON.parse(response.body);
        resolve(formatSketchfabModels(body));
      }
    });
  })
};

