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
@Table({tableName: 'cat_art'})
export class ProductoCategoria extends Model<ProductoCategoria> {

@PrimaryKey
@Column({
  type: DataType.CHAR(6)
})
'co_cat': string;

@AllowNull(false)
@Default('')
@Column
'co_des': string;

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
'row_id': string;

@Default(false)
@AllowNull(false)
@Column({
  type: DataType.BOOLEAN
})
'movil': boolean;

@BelongsTo(() => Sucursal, 'co_sucu')
sucursal: Sucursal;

static scope(name: string = 'defaultScope'): typeof ProductoCategoria {
  return super.scope.call(this, name);
}
}
