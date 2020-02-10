const emailUrl = process.env.SECRET_EMAIL_URL;
const fetch = require('node-fetch');

exports.sendEmail = (data) => {
  const { subject, message, fromEmail, toEmail, type } = data;
  if (subject && message) {
    const url = `${emailUrl}?subject=${subject}&message=${message}${fromEmail && '&fromEmail=' + fromEmail || ''}${toEmail && '&toEmail=' + toEmail || ''}${type && '&type=' + type || ''}`;
    fetch(url)
      .then(function (response) {
        return response;
      })
  } else {
    return {
      errorCode: 400,
      errorMessage: 'Los parámetros subject y message son obligatorios'
    }
  }
}
