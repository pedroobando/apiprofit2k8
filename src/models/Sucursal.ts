// https://github.com/RobinBuschmann/sequelize-typescript

import {Model, Column, Table, PrimaryKey, BelongsToMany, Scopes, CreatedAt, UpdatedAt} from "sequelize-typescript";
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
@Table({tableName: 'almacen'})
export class Sucursal extends Model<Sucursal> {

  @PrimaryKey
  @Column
  'co_alma': string;

  @Column
  'alma_des': string;

  @Column
  'nro_fact': number;
  
  @Column
  'co_sucu': string;

  // @Column
  // 'alma_des': string;

  // @Column
  // 'alma_des': string;

  // @Column
  // 'alma_des': string;

  // @Column
  // 'alma_des': string;

  // @BelongsToMany(() => Movie, () => MovieActor)
  // movies?: Movie[];

  @CreatedAt
  @Column
  createdAt: Date;

  @UpdatedAt
  @Column
  updatedAt: Date;

  static scope(name: string = 'defaultScope'): typeof Sucursal {
    return super.scope.call(this, name);
  }
}




