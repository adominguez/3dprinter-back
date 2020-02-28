const http = require('http');
const querystring = require('querystring');

/**
 * To commit this file it´s necessary uncomment in gitignore file
 */
exports.sendEmail = (data) => {
  const { subject, message, fromEmail, toEmail, type } = data;

  if (subject && message) {
    // GET parameters
    const parameters = {
      subject,
      message,
      fromEmail,
      toEmail,
      type
    }

    const getRequestArgs = querystring.stringify(parameters);

    const options = {
      url: "https://3dmakernow.com",
      port: "80",
      path: "/wp-admin/utils/sendEmail.php?" + getRequestArgs,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }
    const request = http.request(options, (response) => {
      // response from server
      console.log('la respuesta ha ido bien');
    });

    // In case error occurs while sending request
    request.on('error', (error) => {
      console.log(error.message);
    });

    request.end();
  } else {
    return {
      errorCode: 400,
      errorMessage: 'Los parámetros subject y message son obligatorios'
    }
  }
}
