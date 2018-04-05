import {
    Model, Table, BelongsToMany, Scopes, CreatedAt, UpdatedAt,
    Column, PrimaryKey, AllowNull, Default, Unique, IsUUID, DataType, BelongsTo 
  } from "sequelize-typescript";
import { Sucursal } from "./Sucursal";
  
  
  // import {Movie} from "./Movie";
  // import {MovieActor} from "./MovieActor";
  // @Scopes({
  //   movies: {
  //     include: [
  //       {
  //         model: () => Movie,
  //         through: {attributes: []},
  //       },
  //     ],
  //   },
  // })
  
  const _dateparse = new Date('01/01/1900');
  
  @Table({tableName: 'sub_alma'})
  export class Almacen extends Model<Almacen> {
  
    @PrimaryKey
    @Column({
      type: DataType.CHAR(6)
    })
    'co_sub': string;
  
    @AllowNull(false)
    @Default('')
    @Column
    'des_sub': string;
  
    @Default('02')
    @AllowNull(false)
    @Column({
      type: DataType.CHAR(6)
    })
    'co_alma': number;

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
  
    @Default('02')
    @AllowNull(false)
    @Column({
      type: DataType.CHAR(6)
    })
    'co_sucu': string;
  
    @AllowNull(false)
    @IsUUID(4)
    @Column
    'rowguid': string;
  
    @Default(false)
    @Column
    'noventa': boolean;
  
    @Default(false)
    @Column
    'nocompra': boolean;

    @Default(false)
    @Column
    'materiales': boolean;
      
    @Default(false)
    @Column
    'produccion': boolean;
    
    // @CreatedAt
    // @Column
    // createdAt: Date;
  
    // @UpdatedAt
    // @Column
    // updatedAt: Date;

    @BelongsTo(() => Sucursal, 'co_alma')
    sucursal: Sucursal;
  
    static scope(name: string = 'defaultScope'): typeof Almacen {
      return super.scope.call(this, name);
    }
  }
  
