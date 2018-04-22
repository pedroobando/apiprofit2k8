import {
    Model, Table, BelongsToMany, Scopes, CreatedAt, UpdatedAt,
    Column, PrimaryKey, AllowNull, Default, Unique, IsUUID, DataType, BelongsTo, DefaultScope
  } from "sequelize-typescript";
import { Sucursal } from "./Sucursal";
// import { ProductoLinea } from "./ProductoLinea";
// import { ProductoSubLinea } from "./ProductoSubLinea";
// import { ProductoCategoria } from "./ProductoCategoria";

const _dateparse = new Date();
const _rowGuidExport =  '00000000-0000-0000-0000-000000000000';

@DefaultScope({
  attributes: ['co_tran', 'tran_des', 'resp_tra', 'co_sucu', 'fecha_reg',
  'campo1', 'campo2', 'campo3', 'campo4',
  'rowguid' ]
})
@Table({tableName: 'transpor'})
export class Transporte extends Model<Transporte> {

  @PrimaryKey
  @Column({
    type: DataType.CHAR(6)
  })
  'co_tran': string;

  @AllowNull(false)
  @Default('')
  @Column
  'tran_des': string;

  @Default('')
  @AllowNull(false)
  @Column
  'resp_tra': string;

  @Default(_dateparse)
  @AllowNull(false)
  @Column
  'fecha_reg': Date;

  @Default('02')
  @AllowNull(false)
  @Column({
    type: DataType.CHAR(6)
  })
  'co_sucu': string;

  @IsUUID(4)
  @Default(_rowGuidExport)
  @AllowNull(false)
  @Column
  'rowguid': string; 
  
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
  
  @BelongsTo(() => Sucursal, 'co_sucu')
  sucursal: Sucursal;

  // @BelongsTo(() => ProductoLinea, 'co_lin')
  // linea: ProductoLinea;

  // @BelongsTo(() => ProductoCategoria, 'co_cat')
  // categoria: ProductoCategoria;

  // @BelongsTo(() => ProductoSubLinea, 'co_subl')
  // sublinea: ProductoSubLinea;

  static scope(name: string = 'defaultScope'): typeof Transporte {
    return super.scope.call(this, name);
  }
}
