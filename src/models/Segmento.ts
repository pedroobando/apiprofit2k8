import {
    Model, Table, BelongsToMany, Scopes, CreatedAt, UpdatedAt, HasMany,
    Column, PrimaryKey, AllowNull, Default, Unique, IsUUID, DataType, BelongsTo, DefaultScope
  } from "sequelize-typescript";
// import { Sucursal } from "./Sucursal";
// import { Proveedor } from "./Proveedor";
import { Sucursal } from "./Sucursal";
// import { ProductoLinea } from "./ProductoLinea";
// import { ProductoSubLinea } from "./ProductoSubLinea";
// import { ProductoCategoria } from "./ProductoCategoria";

const _dateparse = new Date();
const _rowGuidExport =  '00000000-0000-0000-0000-000000000000';

@DefaultScope({
  attributes: ['co_seg', 'seg_des', 'c_cuenta', 'p_cuenta', 'dis_cen',
  'co_sucu',
  'campo1', 'campo2', 'campo3', 'campo4',
  'rowguid' ]
  // 'fecha_reg',
})
@Table({tableName: 'segmento'})
export class Segmento extends Model<Segmento> {

  @PrimaryKey
  @Column({
    type: DataType.CHAR(6)
  })
  'co_seg': string;

  @AllowNull(false)
  @Default('')
  @Column({
    type: DataType.STRING
  })
  'seg_des': string;

  @Default('')
  @AllowNull(false)
  @Column({
    type: DataType.STRING
  })
  'c_cuenta': string;

  @Default('')
  @AllowNull(false)
  @Column({
    type: DataType.STRING
  })
  'p_cuenta': string;

  @Default('')
  @AllowNull(false)
  @Column({
    type: DataType.STRING
  })
  'dis_cen': string;

  // @Default(_dateparse)
  // @AllowNull(false)
  // @Column
  // 'fecha_reg': Date;

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

  // @HasMany(() => Proveedor, 'co_prov')
  //   proveedores: Proveedor[];

  // @BelongsTo(() => ProductoLinea, 'co_lin')
  // linea: ProductoLinea;

  // @BelongsTo(() => ProductoCategoria, 'co_cat')
  // categoria: ProductoCategoria;

  // @BelongsTo(() => ProductoSubLinea, 'co_subl')
  // sublinea: ProductoSubLinea;

  static scope(name: string = 'defaultScope'): typeof Segmento {
    return super.scope.call(this, name);
  }
}
