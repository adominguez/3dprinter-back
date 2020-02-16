const email = require('./email');

exports.sendAvailabilityEmail = (name, informationLink, platform) => {
  /**
   * Enviamos un correo para informar de que ha habido un error.
   */
  const data = {
    subject: 'La impresora ' + name + ' no está disponible en estos momentos',
    message: `La impresora <b>${name}</b> y <a href="${informationLink}">url</a> no está disponible en estos momentos para la plataforma de ${platform}, se puede realizar un cambio de impresora por otra del mismo estilo.`,
    type: 'error'
  }
  email.sendEmail(data);
}

exports.errorRequestAutommaticallyUpdate = (name, id, platform, error) => {
    /**
     * Enviamos un correo para informar de que ha habido un error.
     */
    const data = {
        subject: 'Error en la request de actualización del producto ' + id,
        message: `La impresora ${name} con id <b>${id}</b> está teniendo problemas en su actualización, al acceder a ${platform}. <br/> este es el error:<br/>` + error,
        type: 'error'
    }
    email.sendEmail(data);
}

exports.responsePrinterError = (name, id, error) => {
    /**
     * Enviamos un correo para informar de que ha habido un error.
     */
    const data = {
        subject: 'Ha habido un error al actualizar la información de la impresora con id ' + key,
        message: `La impresora ${name} con id <b>${key}</b> está teniendo problemas en su actualización diaria al realizar la llamada desde schedule. <br/> este es el error:<br/>` + error,
        type: 'error'
    }
    email.sendEmail(data);
}

exports.errorFromWeb = (printerId) => {
    /**
     * Enviamos un correo para informar de que ha habido un error al acceder a la web.
     */
    const data = {
      subject: 'Error desde la página web al acceder a una impresora',
      message: `Error desde la página web, alguien ha intentado acceder acceder a la información de la impresora con id <b>${printerId}</b> y no ha podido acceder.`,
      type: 'error'
    }
    email.sendEmail(data);
}