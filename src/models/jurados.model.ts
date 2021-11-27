import {Entity, hasMany, model, property} from '@loopback/repository';
import {EvaluacionSolicitud} from './evaluacion-solicitud.model';
import {JuradosInvestigacion} from './jurados-investigacion.model';
import {LineasInvestigacion} from './lineas-investigacion.model';
import {UsuarioJurado} from './usuario-jurado.model';

@model()
export class Jurados extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  /*   @property({
      type: 'string',
      id: true,
    })
    idUser?: string; */

  @property({
    type: 'any',
    required: true,
  })
  entity: any;

  @hasMany(() => EvaluacionSolicitud)
  tieneMuchosEvaluacionSolicitud: EvaluacionSolicitud[];

  @hasMany(() => UsuarioJurado)
  tieneMuchosUsuarioJurado: UsuarioJurado[];

  @hasMany(() => LineasInvestigacion, {through: {model: () => JuradosInvestigacion}})
  muchosamuchosJuradosInvestigacion: LineasInvestigacion[];

  constructor(data?: Partial<Jurados>) {
    super(data);
  }
}

export interface JuradosRelations {
  // describe navigational properties here
}

export type JuradosWithRelations = Jurados & JuradosRelations;
