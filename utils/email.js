const emailUrl = process.env.SECRET_EMAIL_URL;
const fetch = require('node-fetch');
var request = require('request');

/**
 * To commit this file it´s necessary uncomment in gitignore file
 */
exports.sendEmail = (data) => {
  const { subject, message, fromEmail, toEmail, type } = data;

  if (subject && message) {
    const url = `${emailUrl}?subject=${subject}&message=${message}${fromEmail && '&fromEmail=' + fromEmail || ''}${toEmail && '&toEmail=' + toEmail || ''}${type && '&type=' + type || ''}`;
    const options = {
      url: url,
      method: 'GET',
      headers: {
        Accept: '*/*',
        'Accept-Encoding': '*',
        Connection: 'keep-alive',
        'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.106 Safari/537.36'
      }
    }
    request(options, (error, response, html) => {
      if (error) {
        console.log('Ha habido algún problema en el envío de correo')
        console.log(error)
        return error
      } else {
        console.log('Ha ido ok, debería de haber enviado email')
        console.log(response)
        return response
      }
    });
    /*fetch(url)
      .then(function (response) {
        console.log('ha enviado el correo')
        return response;
      })*/
  } else {
    return {
      errorCode: 400,
      errorMessage: 'Los parámetros subject y message son obligatorios'
    }
  }
}
