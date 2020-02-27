const secret = require('../secret');
const fetch = require('node-fetch');

/**
 * To commit this file it´s necessary uncomment in gitignore file
 */
exports.sendEmail = (data) => {
  const { subject, message, fromEmail, toEmail, type } = data;

  console.log(secret.urlSendEmail)

  if (subject && message) {
    const url = `${secret.urlSendEmail}?subject=${subject}&message=${message}${fromEmail && '&fromEmail=' + fromEmail || ''}${toEmail && '&toEmail=' + toEmail || ''}${type && '&type=' + type || ''}`;
    fetch(url)
      .then(function (response) {
        console.log('ha enviado el correo')
        return response;
      })
    } else {
      console.log('ha habido un error en el envío de correo')
      return {
        errorCode: 400,
        errorMessage: 'Los parámetros subject y message son obligatorios'
      }
  }
}
