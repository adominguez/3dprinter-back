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
    $headers = 'From: ' . $fromEmail;
    mail($toEmail, $_GET['subject'], $_GET['message'], $headers);
    echo 'El correo se ha enviado correctamente';
  } else {
    echo 'Ha habido un error en el envío del correo';
  }
