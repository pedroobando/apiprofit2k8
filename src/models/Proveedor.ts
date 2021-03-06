import {
  Model, Table, BelongsToMany, Scopes, CreatedAt, UpdatedAt,
  Column, PrimaryKey, AllowNull, Default, Unique, IsUUID, DataType, BelongsTo, DefaultScope
} from "sequelize-typescript";
import { Sucursal } from "./Sucursal";
import { Segmento } from "./Segmento";
import { Zona } from './Zona';
// import { ProductoLinea } from "./ProductoLinea";
// import { ProductoSubLinea } from "./ProductoSubLinea";
// import { ProductoCategoria } from "./ProductoCategoria";

const _dateparse = new Date();
const _rowGuidExport =  '00000000-0000-0000-0000-000000000000';

@DefaultScope({
  attributes: ['co_prov', 'prov_des', 'co_seg', 'co_zon', 'inactivo', 'direc1', 'direc2',
  'telefonos', 'respons', 'co_sucu', 'co_pais', 'ciudad', 'zip', 'fecha_reg',
  'campo1', 'campo2', 'campo3', 'campo4', 'campo5', 'campo6', 'campo7', 'campo8',
  'rowguid' ]
  // 'fecha_reg', 'procedenci'
})
@Table({tableName: 'prov'})
export class Proveedor extends Model<Proveedor> {

  @PrimaryKey
  @Column({
    type: DataType.CHAR(6)
  })
  'co_prov': string;

  @AllowNull(false)
  @Default('')
  @Column
  'prov_des': string;

  @Default('00')
  @AllowNull(false)
  @Column({
    type: DataType.CHAR(6)
  })
  'co_seg': string;

  @Default('00')
  @AllowNull(false)
  @Column({
    type: DataType.CHAR(6)
  })
  'co_zon': string;

  @Default(false)
  @AllowNull(false)
  @Column({
    type: DataType.BOOLEAN
  })
  'inactivo': boolean;

  @Default('')
  @AllowNull(false)
  @Column({
    type: DataType.STRING
  })
  'direc1': string;

  @Default('')
  @AllowNull(false)
  @Column({
    type: DataType.STRING
  })
  'direc2': string;

  @Default('')
  @AllowNull(false)
  @Column({
    type: DataType.STRING
  })
  'telefonos': string;

  @Default('')
  @AllowNull(false)
  @Column({
    type: DataType.STRING
  })
  'respons': string;

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

  @Default('VE')
  @AllowNull(false)
  @Column({
    type: DataType.CHAR(6)
  })
  'co_pais': string;  

  @Default('')
  @AllowNull(false)
  @Column({
    type: DataType.STRING
  })
  'ciudad': string;  

  @Default('')
  @AllowNull(false)
  @Column({
    type: DataType.STRING
  })
  'zip': string;
  
  // @Default('')
  // @AllowNull(false)
  // @Column({
  //   type: DataType.STRING
  // })
  // 'procedenci': string; 
  
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

  @BelongsTo(() => Segmento, {foreignKey: 'co_seg', targetKey: 'co_seg'})
  segmento: Segmento;

  @BelongsTo(() => Zona, {foreignKey: 'co_zon', targetKey: 'co_zon'})
  zona: Zona;

  // @BelongsTo(() => ProductoCategoria, 'co_cat')
  // categoria: ProductoCategoria;

  // @BelongsTo(() => ProductoSubLinea, 'co_subl')
  // sublinea: ProductoSubLinea;

  static scope(name: string = 'defaultScope'): typeof Proveedor {
    return super.scope.call(this, name);
  }
}
