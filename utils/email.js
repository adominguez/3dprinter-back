const secret = require('../secret');
const fetch = require('node-fetch');
var request = require('request');

/**
 * To commit this file it´s necessary uncomment in gitignore file
 */
exports.sendEmail = (data) => {
  const { subject, message, fromEmail, toEmail, type } = data;

  if (subject && message) {
    const url = `${secret.urlSendEmail}?subject=${subject}&message=${message}${fromEmail && '&fromEmail=' + fromEmail || ''}${toEmail && '&toEmail=' + toEmail || ''}${type && '&type=' + type || ''}`;
    const options = {
      headers:{
        'Content-Type': 'application/x-www-form-urlencoded',
      }
    }
    request(options, (error, response, html) => {
      if (error) {
        console.log(error)
        return error
      } else {
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
