import {AuthenticationStrategy} from '@loopback/authentication';
import {HttpErrors, Request} from '@loopback/rest';
import {UserProfile} from '@loopback/security';
import parseBearerToken from 'parse-bearer-token';
import {Keys} from '../config/keys';
const fetch = require('node-fetch');

export class EstrategiaPersonalAuthenticationStrategy implements AuthenticationStrategy {
  name = 'personal';

  constructor(
  ) { }

  async authenticate(request: Request): Promise<UserProfile | undefined> {
    const token = parseBearerToken(request);
    if (token) {
      //validarlo
      const rol_personal = Keys.rol_personal;
      const url_token = `${Keys.url_validar_token}?${Keys.arg_token}=${token}&${Keys.arg_rol_token}=${Keys.rol_personal}`;
      let r = "";
      await fetch(url_token)
        .then(async (res: any) => {
          r = await res.text()
        })
      switch (r) {
        case "OK":
          const perfil: UserProfile = Object.assign({
            personal: "OK"
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
