<?php
  if(isset($_GET['subject']) && isset($_GET['message'])) {
    $toEmail = '3dmakernow@gmail.com';
    if(isset($_GET['toEmail'])) {
      $toEmail = $_GET['toEmail'];
    }
    $fromEmail = 'noreply@3dmakernow.com';
    if(isset($_GET['fromEmail'])) {
      $fromEmail = $_GET['fromEmail'];
    }

    // Set headers
    $checkEmail=explode('@',$toEmail);
    if($checkEmail == 'hotmail.com') {
      $headers = "MIME-Version: 1.0\n" ;
      $headers .= "Content-Type: text/html; charset=\"iso-8859-1\"\n";
    } else {
      $headers  = 'MIME-Version: 1.0' . "\n";
      $headers .= 'Content-type: text/html; charset=utf-8' . "\n";
    }
    $headers .= 'From: ' .$fromEmail.'\n';

    // Set hmtl
    $type = 'error';
    if(isset($_GET['type'])) {
      $type = $_GET['type'];
    }

    $message = '
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
            <p>';
          $message.= $_GET['message'];
          $message.='</p></td>
          </tr>
        </table>
      </body>
    </html>';

    mail($toEmail, $_GET['subject'], $message, $headers);
    echo 'El correo se ha enviado correctamente';
  } else {
    echo 'Ha habido un error en el envío del correo';
  }
