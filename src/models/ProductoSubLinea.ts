import {
    Model, Table, BelongsToMany, Scopes, CreatedAt, UpdatedAt,
    Column, PrimaryKey, AllowNull, Default, Unique, IsUUID, DataType, BelongsTo, DefaultScope
  } from "sequelize-typescript";
import { Sucursal } from "./Sucursal";
import { ProductoLinea } from "./ProductoLinea";
  
const _dateparse = new Date();
const _rowGuidExport =  '00000000-0000-0000-0000-000000000000';

// @Scopes({
//     parientes: {
//       include: [
//         {
//           model: () => Sucursal,
//           through: {attributes: []},
//         },
//         {
//           model: () => ProductoLinea,
//           through: {attributes: []}
//         }
//       ],
//     },
//   })

@DefaultScope({
  attributes: ['co_subl', 'subl_des', 'co_lin', 'co_sucu',
  'campo1', 'campo2', 'campo3', 'campo4' ]
})
@Table({tableName: 'sub_lin'})
export class ProductoSubLinea extends Model<ProductoSubLinea> {

  @PrimaryKey
  @Column({
    type: DataType.CHAR(6)
  })
  'co_subl': string;

  @AllowNull(false)
  @Default('')
  @Column
  'subl_des': string;

  @Default('00')
  @AllowNull(false)
  @Column({
    type: DataType.CHAR(6)
  })
  'co_lin': string;

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

  @Default('00')
  @AllowNull(false)
  @Column
  'co_us_in': string;

  @Default(_dateparse)
  @Column
  'fe_us_in': Date;

  @Default('00')
  @AllowNull(false)
  @Column
  'co_us_mo': string;

  @Default(_dateparse)
  @Column
  'fe_us_mo': Date;

  @Default('00')
  @AllowNull(false)
  @Column
  'co_us_el': string;

  @Default(_dateparse)
  @Column
  'fe_us_el': Date;

  @Default('')
  @AllowNull(false)
  @Column
  'revisado': string;

  @Default('')
  @AllowNull(false)
  @Column
  'trasnfe': string;

  @Default('')
  @AllowNull(false)
  @Column({
    type: DataType.CHAR(15)
  })
  'co_imun': string;

  @Default('')
  @AllowNull(false)
  @Column({
    type: DataType.CHAR(6)
  })
  'co_reten': string;

  @Default('')
  @AllowNull(false)
  @Column
  'i_subl_des': string;

  @Default('')
  @AllowNull(false)
  @Column({
    type: DataType.CHAR(1)
  })
  'movil': string;

  @BelongsTo(() => Sucursal, 'co_sucu')
  sucursal: Sucursal;

  @BelongsTo(() => ProductoLinea, 'co_lin')
  linea: ProductoLinea;

  static scope(name: string = 'defaultScope'): typeof ProductoSubLinea {
    return super.scope.call(this, name);
  }
}
