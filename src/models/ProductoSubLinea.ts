import {
    Model, Table, BelongsToMany, Scopes, CreatedAt, UpdatedAt,
    Column, PrimaryKey, AllowNull, Default, Unique, IsUUID, DataType, BelongsTo, DefaultScope
  } from "sequelize-typescript";
import { Sucursal } from "./Sucursal";
  
const _dateparse = new Date();
const _rowGuidExport =  '00000000-0000-0000-0000-000000000000';

// @Scopes({
//     sucursals: {
//       include: [
//         {
//           model: () => Sucursal,
//           through: {attributes: []},
//         },
//       ],
//     },
//   })

@DefaultScope({
  attributes: ['co_subl', 'subl_des', 'co_lin', 'co_sucu']
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

  @Default('')
  @AllowNull(false)
  @Column
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

  @BelongsTo(() => Sucursal, 'co_alma')
  sucursal: Sucursal;

  static scope(name: string = 'defaultScope'): typeof ProductoSubLinea {
    return super.scope.call(this, name);
  }
}
