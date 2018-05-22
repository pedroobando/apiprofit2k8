import {
  Model, Table, BelongsToMany, Scopes, CreatedAt, UpdatedAt,
  Column, PrimaryKey, AllowNull, Default, Unique, IsUUID, DataType, BelongsTo, DefaultScope, ForeignKey
} from "sequelize-typescript";

import { Producto } from "./Producto";
import { Ajuste } from "./Ajuste";
import { Almacen } from "./Almacen";
// import { Proveedor } from "./Proveedor";

const _DATEPARSE = new Date();
const _ROWGUIDEXPORT =  '00000000-0000-0000-0000-000000000000';

@DefaultScope({
  attributes: ['ajue_num', 'reng_num', 'dis_cen', 'tipo', 'co_art', 'total_art', 'uni_compra',
  'stotal_art', 'suni_compr', 'co_alma', 'cost_unit_om', 'cost_unit', 'feccom', 'numcom', 'uni_venta', 'suni_venta',
  'cos_pro_un', 'ult_cos_om', 'cos_pro_om', 'total_uni', 'nro_lote', 'fec_lote', 'pendiente2',
  'tipo_doc2', 'reng_doc2', 'num_doc2', 'aux01', 'aux02', 'mo_cant', 'gf_cant', 'mo_cant_om', 'gf_cant_om',
  'produccion', 'rowguid' ]
})
@Table({tableName: 'reng_aju'})
export class AjusteDetalle extends Model<AjusteDetalle> {

  @PrimaryKey
  @Column({
    type: DataType.INTEGER
  })
  'reng_num': number;

  @ForeignKey(() => Ajuste)
  @Column({
    type: DataType.INTEGER
  })
  'ajue_num': number;

  @Default('')
  @AllowNull(true)
  @Column({
    type: DataType.TEXT
  })
  'dis_cen': string;

  @Default('')
  @AllowNull(true)
  @Column({
    type: DataType.CHAR(6)
  })
  'tipo': string;

  @Default('')
  @AllowNull(false)
  @Column({
    type: DataType.CHAR(30)
  })
  'co_art': string;

  @Default(0)
  @AllowNull(false)
  @Column({
    type: DataType.FLOAT
  })
  'total_art': number;

  @Default('')
  @AllowNull(false)
  @Column({
    type: DataType.CHAR(6)
  })
  'uni_compra': string;

  @Default(0)
  @AllowNull(false)
  @Column({
    type: DataType.FLOAT
  })
  'stotal_art': number;  

  @Default('')
  @AllowNull(false)
  @Column({
    type: DataType.CHAR(6)
  })
  'suni_compr': string;

  @Default('')
  @AllowNull(false)
  @Column({
    type: DataType.CHAR(6)
  })
  'co_alma': string;

  @Default(0)
  @AllowNull(false)
  @Column({
    type: DataType.FLOAT
  })
  'cost_unit_om': number;

  @Default(0)
  @AllowNull(false)
  @Column({
    type: DataType.FLOAT
  })
  'cost_unit': number;  

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

  @Default('')
  @AllowNull(false)
  @Column({
    type: DataType.CHAR(6)
  })
  'uni_venta': string;

  @Default('')
  @AllowNull(false)
  @Column({
    type: DataType.CHAR(6)
  })
  'suni_venta': string;

  @Default(0)
  @AllowNull(false)
  @Column({
    type: DataType.FLOAT
  })
  'cos_pro_un': number;

  @Default(0)
  @AllowNull(false)
  @Column({
    type: DataType.FLOAT
  })
  'ult_cos_om': number;

  @Default(0)
  @AllowNull(false)
  @Column({
    type: DataType.FLOAT
  })
  'cos_pro_om': number;
  
  @Default(0)
  @AllowNull(false)
  @Column({
    type: DataType.FLOAT
  })
  'total_uni': number;

  @Default('')
  @AllowNull(false)
  @Column({
    type: DataType.CHAR(20)
  })
  'nro_lote': string;

  @Default(_DATEPARSE)
  @AllowNull(false)
  @Column({
    type:  DataType.DATE
  })
  'fec_lote': Date;

  @Default(0)
  @AllowNull(false)
  @Column({
    type: DataType.FLOAT
  })
  'pendiente2': number;

  @Default('')
  @AllowNull(false)
  @Column({
    type:  DataType.CHAR(1)
  })
  'tipo_doc2': Date;

  @Default(0)
  @AllowNull(false)
  @Column({
    type: DataType.INTEGER
  })
  'reng_doc2': number;

  @Default(0)
  @AllowNull(false)
  @Column({
    type: DataType.INTEGER
  })
  'num_doc2': number;

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

  @Default(0)
  @AllowNull(false)
  @Column({
    type: DataType.FLOAT
  })
  'mo_cant': number;

  @Default(0)
  @AllowNull(false)
  @Column({
    type: DataType.FLOAT
  })
  'gf_cant': number;

  @Default(0)
  @AllowNull(false)
  @Column({
    type: DataType.FLOAT
  })
  'mo_cant_om': number;

  @Default(0)
  @AllowNull(false)
  @Column({
    type: DataType.FLOAT
  })
  'gf_cant_om': number;

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
  'produccion': boolean;

  
  @BelongsTo(() => Producto, {foreignKey: 'co_art', targetKey: 'co_art'})
  producto: Producto;

  @BelongsTo(() => Ajuste, {foreignKey: 'ajue_num', targetKey: 'ajue_num'})
  ajuste: Ajuste;

  @BelongsTo(() => Almacen, {foreignKey: 'co_alma', targetKey: 'co_sub'})
  almacen: Almacen;


  static scope(name: string = 'defaultScope'): typeof AjusteDetalle {
    return super.scope.call(this, name);
  }
}
