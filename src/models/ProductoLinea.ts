import {
    Model, Table, BelongsToMany, Scopes, CreatedAt, UpdatedAt,
    Column, PrimaryKey, AllowNull, Default, Unique, IsUUID, DataType, BelongsTo, DefaultScope
  } from "sequelize-typescript";
import { Sucursal } from "./Sucursal";
  
const _dateparse = new Date();
const _rowGuidExport =  '00000000-0000-0000-0000-000000000000';

@Scopes({
    sucursals: {
      include: [
        {
          model: () => Sucursal,
          through: {attributes: []},
        },
      ],
    },
  })

@DefaultScope({
  attributes: ['co_lin', 'lin_des', 'co_sucu',
    'campo1', 'campo2', 'campo3', 'campo4']
})
@Table({tableName: 'lin_art'})
export class ProductoLinea extends Model<ProductoLinea> {

  @PrimaryKey
  @Column({
    type: DataType.CHAR(6)
  })
  'co_lin': string;

  @AllowNull(false)
  @Default('')
  @Column
  'lin_des': string;

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
  @AllowNull(true)
  @Column
  'dis_cen': string;  

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

  @AllowNull(false)
  @Default('')
  @Column({
      type: DataType.CHAR(15)
  })
  'co_imun': string;  
 
  @AllowNull(false)
  @Default('')
  @Column({
      type: DataType.CHAR(6)
  })
  'co_reten': string;  
 
  @AllowNull(false)
  @Default(0)
  @Column({
      type: DataType.FLOAT
  })
  'comi_lin': number; 
  
  @AllowNull(false)
  @Default(0)
  @Column({
      type: DataType.FLOAT
  })
  'comi_lin2': number; 

  // @CreatedAt
  // @Column
  // createdAt: Date;

  // @UpdatedAt
  // @Column
  // updatedAt: Date;

  @BelongsTo(() => Sucursal, 'co_sucu')
  sucursal: Sucursal;

  static scope(name: string = 'defaultScope'): typeof ProductoLinea {
    return super.scope.call(this, name);
  }
}
