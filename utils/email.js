const helper = require('sendgrid').mail;

/**
 * To commit this file it´s necessary uncomment in gitignore file
 */
exports.sendEmail = (data) => {
  const { subject, message, fromEmail = 'noreply@3dmakernow.com', toEmail = '3dmakernow@gmail.com', type } = data;

  const from_email = new helper.Email(fromEmail);
  const to_email = new helper.Email(toEmail);
  var content = new helper.Content('text/html', `
  <html xmlns="http://www.w3.org/1999/xhtml">
    <head>
      <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
      <title>Correo enviado desde 3DMakerNow</title>
    </head>
    <body>
      <table width="100%" border="0" cellspacing="3" cellpadding="3">
        <tr>
          <td><img src="https://3dmakernow.com/wp-content/uploads/2018/03/cropped-logotipo-eslogan-1.png" /></td>
        </tr>
        <tr>
          <td>
            <p>
              ${message}
            </p>
          </td>
        </tr>
      </table>
    </body>
  </html>`);

  console.log('Se va a enviar un correo con el siguiente subject: ', subject);

  if (subject && message) {
    var mail = new helper.Mail(from_email, subject, to_email, content);

    var sg = require('sendgrid')(process.env.SENGRID_API_KEY);
    var request = sg.emptyRequest({
      method: 'POST',
      path: '/v3/mail/send',
      body: mail.toJSON(),
    });

    sg.API(request, function (error, response) {
      console.log(response.statusCode);
      console.log(response.body);
      console.log(response.headers);
    });
  } else {
    return {
      errorCode: 400,
      errorMessage: 'Los parámetros subject y message son obligatorios'
    }
  }
}
