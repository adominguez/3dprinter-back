const helper = require('sendgrid').mail;

/**
 * To commit this file it´s necessary uncomment in gitignore file
 */
exports.sendEmail = (data) => {
  const { subject, message, fromEmail = '3dmakernow@gmail.com', toEmail = '3dmakernow@gmail.com', type } = data;

  const from_email = new helper.Email(fromEmail);
  const to_email = new helper.Email(toEmail);
  var content = new helper.Content('text/plain', subject);

  if (subject && message) {
    var mail = new helper.Mail(from_email, subject, to_email, content);

    var sg = require('sendgrid')(process.env.SENDGRID_API_KEY);
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
