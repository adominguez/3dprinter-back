const fetch = require('node-fetch');

/**
 * To commit this file it´s necessary uncomment in gitignore file
 */
exports.sendEmail = (data) => {
  const { subject, message, fromEmail, toEmail, type } = data;
  if (subject && message) {
    const url = `https://3dmakernow.com/wp-admin/utils/sendEmail.php?subject=${subject}&message=${message}${fromEmail && '&fromEmail=' + fromEmail || ''}${toEmail && '&toEmail=' + toEmail || ''}${type && '&type=' + type || ''}`;
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
