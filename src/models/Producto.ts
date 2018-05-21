import {
  Model, Table, BelongsToMany, Scopes, CreatedAt, UpdatedAt,
  Column, PrimaryKey, AllowNull, Default, Unique, IsUUID, DataType, BelongsTo, DefaultScope
} from "sequelize-typescript";
import { Sucursal } from "./Sucursal";
import { ProductoLinea } from "./ProductoLinea";
import { ProductoSubLinea } from "./ProductoSubLinea";
import { ProductoCategoria } from "./ProductoCategoria";
import { Proveedor } from "./Proveedor";

const _dateparse = new Date();
const _rowGuidExport =  '00000000-0000-0000-0000-000000000000';

@DefaultScope({
  attributes: ['co_art', 'art_des', 'co_lin', 'co_cat', 'co_sucu', 'co_subl', 'co_prov',
  'uni_compra', 'uni_venta', 'stock_act', 'co_color', 'fecha_reg', 'item', 'ubicacion', 'procedenci',
  'campo1', 'campo2', 'campo3', 'campo4', 'campo5', 'campo6', 'campo7', 'campo8',
  'rowguid' ]
})
@Table({tableName: 'art'})
export class Producto extends Model<Producto> {

  @PrimaryKey
  @Column({
    type: DataType.CHAR(6)
  })
  'co_art': string;

  @AllowNull(false)
  @Default('')
  @Column
  'art_des': string;

  @Default('00')
  @AllowNull(false)
  @Column({
    type: DataType.CHAR(6)
  })
  'co_lin': string;

  @Default('00')
  @AllowNull(false)
  @Column({
    type: DataType.CHAR(6)
  })
  'co_cat': string;

  @Default('00')
  @AllowNull(false)
  @Column({
    type: DataType.CHAR(6)
  })
  'co_subl': string;  

  @Default('02')
  @AllowNull(false)
  @Column({
    type: DataType.CHAR(6)
  })
  'co_sucu': string;

  @Default('00')
  @AllowNull(false)
  @Column({
    type: DataType.CHAR(10)
  })
  'co_prov': string;

  @Default('UND')
  @AllowNull(false)
  @Column({
    type: DataType.CHAR(6)
  })
  'uni_venta': string;

  @Default('UND')
  @AllowNull(false)
  @Column({
    type: DataType.CHAR(6)
  })
  'uni_compra': string;

  @Default('N')
  @AllowNull(false)
  @Column
  'co_color': string;

  @Default(0)
  @AllowNull(false)
  @Column({
    type:  DataType.FLOAT
  })
  'stock_act': number;

  @IsUUID(4)
  @Default(_rowGuidExport)
  @AllowNull(false)
  @Column
  'rowguid': string;

  @Default(_dateparse)
  @AllowNull(false)
  @Column
  'fecha_reg': Date;

  @Default('000')
  @AllowNull(false)
  @Column({
    type: DataType.CHAR(10)
  })
  'item': string;

  @Default('')
  @AllowNull(false)
  @Column({
    type: DataType.CHAR(60)
  })
  'ubicacion': string;

  @Default('')
  @AllowNull(false)
  @Column({
    type: DataType.CHAR(10)
  })
  'procedenci': string;

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

  @BelongsTo(() => ProductoLinea, {foreignKey: 'co_lin', targetKey: 'co_lin'})
  linea: ProductoLinea;

  @BelongsTo(() => ProductoSubLinea, {foreignKey: 'co_subl', scope: { co_lin: {$col: 'Producto.co_lin'} }, targetKey: 'co_subl'})
  sublinea: ProductoSubLinea;

  @BelongsTo(() => ProductoCategoria, {foreignKey: 'co_cat', targetKey: 'co_cat'})
  categoria: ProductoCategoria;

  @BelongsTo(() => Proveedor, {foreignKey: 'co_prov', targetKey: 'co_prov'})
  proveedor: Proveedor;
  
  static scope(name: string = 'defaultScope'): typeof Producto {
    return super.scope.call(this, name);
  }
}
