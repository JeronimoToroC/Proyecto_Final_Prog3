import { /* inject, */ BindingScope, injectable} from '@loopback/core';
import {Keys} from '../config/keys';
import {NotificacionCorreo, NotificacionesSms} from '../models';
const fetch = require("node-fetch");

@injectable({scope: BindingScope.TRANSIENT})
export class NotificacionesService {
  constructor(/* Add @inject to inject parameters */) { }

  /*
   * Add service methods here
   */

  async enviarCorreo(notificacion: NotificacionCorreo): Promise<Boolean> {
    const url = `${Keys.url_notificaciones_email}?${Keys.arg_hash_notificaciones}=${Keys.hash_notificaciones}&${Keys.arg_destino_correo_notificaciones}=${notificacion.email}&${Keys.arg_asunto_correo_notificaciones}=${notificacion.asunto}&${Keys.arg_mensaje_correo_notificaciones}=${notificacion.mensaje}`;
    fetch(url)
      .then((data: any) => {
        return true;
      });
    return true;
  }
  async enviarSms(notificacion: NotificacionesSms): Promise<Boolean> {
    const url = `${Keys.url_notificaciones_sms}?${Keys.arg_hash_notificaciones}=${Keys.hash_notificaciones}&${Keys.arg_destino_sms_notificaciones}=${notificacion.destino}&${Keys.arg_mensaje_sms_notificaciones}=${notificacion.mensaje}`;
    fetch(url)
      .then((data: any) => {
        return true;
      });
    return true;
  }
}
