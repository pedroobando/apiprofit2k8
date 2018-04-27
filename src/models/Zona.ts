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
  attributes: ['co_zon', 'zon_des', 'dis_cen',
  'revisado', 'trasnfe', 'co_sucu',
  'campo1', 'campo2', 'campo3', 'campo4',
  'rowguid' ]
})
@Table({tableName: 'zona'})
export class Zona extends Model<Zona> {

  @PrimaryKey
  @Column({
    type: DataType.CHAR(6)
  })
  'co_zon': string;

  @AllowNull(false)
  @Default('')
  @Column({
    type: DataType.STRING
  })
  'zon_des': string;

  @Default('')
  @AllowNull(false)
  @Column({
    type: DataType.STRING
  })
  'dis_cen': string;

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

  @BelongsTo(() => Sucursal, {foreignKey: 'co_sucu', targetKey: 'co_alma'})
  sucursal: Sucursal;

  // @HasMany(() => Proveedor, 'co_prov')
  //   proveedores: Proveedor[];

  // @BelongsTo(() => ProductoLinea, 'co_lin')
  // linea: ProductoLinea;

  // @BelongsTo(() => ProductoCategoria, 'co_cat')
  // categoria: ProductoCategoria;

  // @BelongsTo(() => ProductoSubLinea, 'co_subl')
  // sublinea: ProductoSubLinea;

  static scope(name: string = 'defaultScope'): typeof Zona {
    return super.scope.call(this, name);
  }
}
