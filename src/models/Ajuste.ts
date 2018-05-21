import {
  Model, Table, BelongsToMany, Scopes, CreatedAt, UpdatedAt,
  Column, PrimaryKey, AllowNull, Default, Unique, IsUUID, DataType, BelongsTo, DefaultScope
} from "sequelize-typescript";

import { Sucursal } from "./Sucursal";
import { AjusteDet } from './AjusteDetalle';
// import { Proveedor } from "./Proveedor";

const _DATEPARSE = new Date();
const _ROWGUIDEXPORT =  '00000000-0000-0000-0000-000000000000';

@DefaultScope({
  attributes: ['ajue_num', 'fecha', 'motivo', 'total', 'seriales', 'feccom', 'numcom',
  'tasa', 'moneda', 'dis_cen', 'co_us_in', 'fe_us_in', 'co_us_mo', 'fe_us_mo', 'co_us_el', 'fe_us_el',
  'campo1', 'campo2', 'campo3', 'campo4', 'campo5', 'campo6', 'campo7', 'campo8',
  'revisado', 'trasnfe', 'anulada', 'aux01', 'aux02', 'produccion', 'imp_num', 'fact_num',
  'co_sucu', 'rowguid' ]
})
@Table({tableName: 'ajuste'})
export class Ajuste extends Model<Ajuste> {

  @PrimaryKey
  @Column({
    type: DataType.INTEGER
  })
  'ajue_num': number;

  @AllowNull(false)
  @Default(_DATEPARSE)
  @Column({
    type: DataType.DATE
  })
  'fecha': Date;

  @Default('')
  @AllowNull(true)
  @Column({
    type: DataType.CHAR(80)
  })
  'motivo': string;

  @Default(0)
  @AllowNull(false)
  @Column({
    type: DataType.FLOAT
  })
  'total': number;

  @Default(0)
  @AllowNull(false)
  @Column({
    type: DataType.INTEGER
  })
  'seriales': number;  

  @AllowNull(false)
  @Default(_DATEPARSE)
  @Column({
    type: DataType.DATE
  })
  'feccom': Date;

  @Default(0)
  @AllowNull(false)
  @Column({
    type: DataType.INTEGER
  })
  'numcom': number;

  @Default(0)
  @AllowNull(false)
  @Column({
    type: DataType.FLOAT
  })
  'tasa': number;

  @Default('')
  @AllowNull(false)
  @Column({
    type: DataType.CHAR(6)
  })
  'moneda': string;

  @Default('')
  @AllowNull(true)
  @Column({
    type: DataType.TEXT
  })
  'dis_cen': string;

  @Default('')
  @AllowNull(false)
  @Column({
    type: DataType.CHAR(6)
  })
  'co_us_in': string;

  @Default(_DATEPARSE)
  @AllowNull(false)
  @Column({
    type:  DataType.DATE
  })
  'fe_us_in': Date;

  @Default('')
  @AllowNull(false)
  @Column({
    type: DataType.CHAR(6)
  })
  'co_us_mo': string;

  @Default(_DATEPARSE)
  @AllowNull(false)
  @Column({
    type:  DataType.DATE
  })
  'fe_us_mo': Date;

  @Default('')
  @AllowNull(false)
  @Column({
    type: DataType.CHAR(6)
  })
  'co_us_el': string;

  @Default(_DATEPARSE)
  @AllowNull(false)
  @Column({
    type:  DataType.DATE
  })
  'fe_us_el': Date;
  
  @Default('')
  @AllowNull(false)
  @Column({
    type: DataType.CHAR(1)
  })
  'revisado': string;

  @Default('')
  @AllowNull(false)
  @Column({
    type: DataType.CHAR(1)
  })
  'trasnfe': string;

  @Default('02')
  @AllowNull(false)
  @Column({
    type: DataType.CHAR(6)
  })
  'co_sucu': string;

  @IsUUID(4)
  @Default(_ROWGUIDEXPORT)
  @AllowNull(false)
  @Column
  'rowguid': string;

  @Default(false)
  @AllowNull(false)
  @Column({
    type: DataType.BOOLEAN
  })
  'anulada': boolean;

  @Default(0)
  @AllowNull(false)
  @Column({
    type: DataType.FLOAT
  })
  'aux01': number;

  @Default('')
  @AllowNull(false)
  @Column({
    type: DataType.CHAR(30)
  })
  'aux02': string;

  @Default(false)
  @AllowNull(false)
  @Column({
    type: DataType.BOOLEAN
  })
  'produccion': boolean;

  @Default(0)
  @AllowNull(false)
  @Column({
    type: DataType.INTEGER
  })
  'imp_num': number;

  @Default(0)
  @AllowNull(false)
  @Column({
    type: DataType.INTEGER
  })
  'fact_num': number;

  @Default('')
  @AllowNull(false)
  @Column
  'campo1': string;

  @Default('')
  @AllowNull(false)
  @Column
  'campo2': string;

  @Default('')
  @AllowNull(false)
  @Column
  'campo3': string;

  @Default('')
  @AllowNull(false)
  @Column
  'campo4': string;

  @Default('')
  @AllowNull(false)
  @Column
  'campo5': string;

  @Default('')
  @AllowNull(false)
  @Column
  'campo6': string;

  @Default('')
  @AllowNull(false)
  @Column
  'campo7': string;

  @Default('')
  @AllowNull(false)
  @Column
  'campo8': string;

  
  @BelongsTo(() => Sucursal, {foreignKey: 'co_sucu', targetKey: 'co_alma'})
  sucursal: Sucursal;

  @BelongsToMany(() => AjusteDet, {foreignKey: 'ajue_num', targetKey: 'ajue_num'})
  ajusteDetalle?: AjusteDet[];

  @BelongsToMany(() => Actor, () => MovieActor)
  cast?: Actor[];

  @BelongsToMany(() => Genre, () => MovieGenre)
  genres?: Genre[];

  // @BelongsTo(() => Proveedor, {foreignKey: 'co_prov', targetKey: 'co_prov'})
  // proveedor: ProductoCategoria;
  
  static scope(name: string = 'defaultScope'): typeof Ajuste {
    return super.scope.call(this, name);
  }
}
