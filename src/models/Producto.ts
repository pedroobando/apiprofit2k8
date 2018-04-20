import {
  Model, Table, BelongsToMany, Scopes, CreatedAt, UpdatedAt,
  Column, PrimaryKey, AllowNull, Default, Unique, IsUUID, DataType, BelongsTo, DefaultScope
} from "sequelize-typescript";
import { Sucursal } from "./Sucursal";
import { ProductoLinea } from "./ProductoLinea";
import { ProductoSubLinea } from "./ProductoSubLinea";


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
  attributes: ['co_art', 'art_des', 'co_lin', 'co_sucu', 'co_cat', 'co_subl', 'uni_venta', 'stock_act', 
  'campo1', 'campo2', 'campo3', 'campo4' ]
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

  @BelongsTo(() => Sucursal, 'co_sucu')
  sucursal: Sucursal;

  @BelongsTo(() => ProductoLinea, 'co_lin')
  linea: ProductoLinea;

  @BelongsTo(() => ProductoSubLinea, 'co_lin')
  sublinea: ProductoSubLinea;

  static scope(name: string = 'defaultScope'): typeof Producto {
    return super.scope.call(this, name);
  }
}
