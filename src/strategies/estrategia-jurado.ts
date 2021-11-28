import {AuthenticationStrategy} from '@loopback/authentication';
import {HttpErrors, Request} from '@loopback/rest';
import {UserProfile} from '@loopback/security';
import parseBearerToken from 'parse-bearer-token';
import {Keys} from '../config/keys';
const fetch = require('node-fetch');

export class EstrategiaJuradoAuthenticationStrategy implements AuthenticationStrategy {
  name = 'jurado';

  constructor(
  ) { }

  async authenticate(request: Request): Promise<UserProfile | undefined> {
    const token = parseBearerToken(request);
    if (token) {
      //validarlo
      const rol_jurado = Keys.rol_jurado;
      const url_token = `${Keys.url_validar_token}?${Keys.arg_token}=${token}&${Keys.arg_rol_token}=${Keys.rol_jurado}`;
      let r = "";
      await fetch(url_token)
        .then(async (res: any) => {
          r = await res.text()
        })
      switch (r) {
        case "OK":
          const perfil: UserProfile = Object.assign({
            jurado: "OK"
          });
          return perfil;
          break;
        case "KO":
          throw new HttpErrors[401]("El rol del token no es válido")
          break;
        case "":
          throw new HttpErrors[401]("El token no es válido")
          break;
      }
    } else {
      throw new HttpErrors[401]("la request no tiene un token")
    }
  }


}