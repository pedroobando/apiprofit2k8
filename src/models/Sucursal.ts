import {
  Model, Table, BelongsToMany, Scopes, CreatedAt, UpdatedAt,
  Column, PrimaryKey, AllowNull, Default, Unique, IsUUID, DataType, HasMany, DefaultScope } from 'sequelize-typescript';

import { Almacen } from './Almacen';

const _dateparse = new Date();
const _rowGuidExport =  '00000000-0000-0000-0000-000000000000';

@Scopes({
  almacens: {
    include: [
      {
        model: () => Almacen,
        through: {attributes: []},
      },
    ],
  },
})

@DefaultScope({
  attributes: ['co_alma', 'alma_des', 'co_sucu', 'campo1', 'campo2', 'campo3', 'campo4']
})
@Table({tableName: 'almacen'})
export class Sucursal extends Model<Sucursal> {

  @PrimaryKey
  @Column({
    type: DataType.CHAR(6)
  })
  'co_alma': string;

  @AllowNull(false)
  // @Default('')
  @Default('')
  @Column
  'alma_des': string;

  // @Unique
  @Default(0)
  @AllowNull(false)
  @Column
  'nro_fact': number;
  
  @AllowNull(false)
  @Default(0)
  @Column
  'num_fac_ini': number;

  @AllowNull(false)
  @Default(0)
  @Column
  'num_fac_fin': number;

  @Default("")
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
  @Column
  'co_sucu': string;

  @IsUUID(4)
  @AllowNull(false)
  @Default(_rowGuidExport)
  @Column
  'rowguid': string;

  @AllowNull(false)
  @Default(0)
  @Column
  'nc_num': number;

  @AllowNull(false)
  @Default(0)
  @Column
  'nd_num': number;
    
  @AllowNull(false)
  @Default(0)
  @Column
  'ajus_num': number;

  @AllowNull(false)
  @Default(0)
  @Column
  'tras_num': number;

  @AllowNull(false)
  @Default(0)
  @Column
  'fisi_num': number;

  @AllowNull(false)
  @Default(0)
  @Column
  'num_kit': number;

  @AllowNull(false)
  @Default(0)
  @Column
  'genk_num': number;

  @AllowNull(false)
  @Default(0)
  @Column
  'cotc_num': number;

  @AllowNull(false)
  @Default(0)
  @Column
  'ped_num': number;

  @AllowNull(false)
  @Default(0)
  @Column
  'devc_num': number;

  @AllowNull(false)
  @Default(0)
  @Column
  'nde_num': number;
  
  @AllowNull(false)
  @Default(0)
  @Column
  'ndd_num': number;

  @AllowNull(false)
  @Default(0)
  @Column
  'post_num': number;

  @AllowNull(false)
  @Default(0)
  @Column
  'cfxg_num': number;

  @AllowNull(false)
  @Default(0)
  @Column
  'chdv_num': number;

  @AllowNull(false)
  @Default(0)
  @Column
  'ndr_num': number;

  @AllowNull(false)
  @Default(0)
  @Column
  'postcppnum': number;

  @AllowNull(false)
  @Default(0)
  @Column
  'ccxg_num': number;

  @AllowNull(false)
  @Default(0)
  @Column
  'chdvcppnum': number;

  @AllowNull(false)
  @Default(0)
  @Column
  'girocppnum': number;
  
  @AllowNull(false)
  @Default(0)
  @Column
  'nccpp_num': number;

  @AllowNull(false)
  @Default(0)
  @Column
  'ndcpp_num': number;

  @AllowNull(false)
  @Default(0)
  @Column
  'retencppnum': number;

  @AllowNull(false)
  @Default(0)
  @Column
  'pg_num': number;

  @AllowNull(false)
  @Default(0)
  @Column
  'aju_posm': number;

  @AllowNull(false)
  @Default(0)
  @Column
  'aju_posa': number;

  @AllowNull(false)
  @Default(0)
  @Column
  'aju_negm': number;
  
  @AllowNull(false)
  @Default(0)
  @Column
  'aju_nega': number;

  @AllowNull(false)
  @Default(0)
  @Column
  'aju_posmc': number;

  @AllowNull(false)
  @Default(0)
  @Column
  'aju_negmc': number;

  @AllowNull(false)
  @Default(0)
  @Column
  'pventa': number;

  @AllowNull(false)
  @Default(0)
  @Column
  'turnosic': number;

  @AllowNull(false)
  @Default(0)
  @Column
  'plv_num': number;

  @AllowNull(false)
  @Default(0)
  @Column
  'plc_num': number;

  @AllowNull(false)
  @Default(0)
  @Column
  'tabislr': number;

  @AllowNull(false)
  @Default(0)
  @Column
  'imp_num': number;

  @AllowNull(false)
  @Default(0)
  @Column
  'rma_cli': number;

  @AllowNull(false)
  @Default(0)
  @Column
  'rma_prov': number;
  
  @AllowNull(false)
  @Default(0)
  @Column
  'rma_entc': number;

  @AllowNull(false)
  @Default(0)
  @Column
  'rma_entp': number;

  @AllowNull(false)
  @Default(0)
  @Column
  'rma_regs': number;

  @AllowNull(false)
  @Default('')
  @Column
  'fact_s1': string;

  @AllowNull(false)
  @Default('')
  @Column
  'fact_s2': string;

  @AllowNull(false)
  @Default('')
  @Column
  'fact_s3': string;

  @AllowNull(false)
  @Default('')
  @Column
  'fact_s4': string;

  @AllowNull(false)
  @Default('')
  @Column
  'fact_s5': string;

  @AllowNull(false)
  @Default('')
  @Column
  'nde_s1': string;

  @AllowNull(false)
  @Default('')
  @Column
  'nde_s2': string;

  @AllowNull(false)
  @Default('')
  @Column
  'nde_s3': string;

  @AllowNull(false)
  @Default('')
  @Column
  'nde_s4': string;

  @AllowNull(false)
  @Default('')
  @Column
  'nde_s5': string;

  @AllowNull(false)
  @Default('')
  @Column
  'nc_s1': string;

  @AllowNull(false)
  @Default('')
  @Column
  'nc_s2': string;

  @AllowNull(false)
  @Default('')
  @Column
  'nc_s3': string;

  @AllowNull(false)
  @Default('')
  @Column
  'nc_s4': string;

  @AllowNull(false)
  @Default('')
  @Column
  'nc_s5': string;

  @AllowNull(false)
  @Default(0)
  @Column
  'fact_f1': number;

  @AllowNull(false)
  @Default(0)
  @Column
  'fact_f2': number;

  @AllowNull(false)
  @Default(0)
  @Column
  'fact_f3': number;

  @AllowNull(false)
  @Default(0)
  @Column
  'fact_f4': number;

  @AllowNull(false)
  @Default(0)
  @Column
  'nde_f1': number;

  @AllowNull(false)
  @Default(0)
  @Column
  'nde_f2': number;

  @AllowNull(false)
  @Default(0)
  @Column
  'nde_f3': number;

  @AllowNull(false)
  @Default(0)
  @Column
  'nde_f4': number;

  @AllowNull(false)
  @Default(0)
  @Column
  'nc_f1': number;

  @AllowNull(false)
  @Default(0)
  @Column
  'nc_f2': number;

  @AllowNull(false)
  @Default(0)
  @Column
  'nc_f3': number;

  @AllowNull(false)
  @Default(0)
  @Column
  'nc_f4': number;

  @AllowNull(false)
  @Default(0)
  @Column
  'nd_f1': number;

  @AllowNull(false)
  @Default(0)
  @Column
  'nd_f2': number;

  @AllowNull(false)
  @Default(0)
  @Column
  'nd_f3': number;

  @AllowNull(false)
  @Default(0)
  @Column
  'nd_f4': number;
  
  @AllowNull(false)
  @Default(1)
  @Column
  'fact_p1': number;

  @AllowNull(false)
  @Default(1)
  @Column
  'fact_p2': number;

  @AllowNull(false)
  @Default(1)
  @Column
  'fact_p3': number;

  @AllowNull(false)
  @Default(1)
  @Column
  'fact_p4': number;

  @AllowNull(false)
  @Default(1)
  @Column
  'fact_p5': number;
  
  @AllowNull(false)
  @Default(1)
  @Column
  'nde_p1': number;

  @AllowNull(false)
  @Default(1)
  @Column
  'nde_p2': number;

  @AllowNull(false)
  @Default(1)
  @Column
  'nde_p3': number;

  @AllowNull(false)
  @Default(1)
  @Column
  'nde_p4': number;

  @AllowNull(false)
  @Default(1)
  @Column
  'nde_p5': number;
    
  @AllowNull(false)
  @Default(1)
  @Column
  'nc_p1': number;

  @AllowNull(false)
  @Default(1)
  @Column
  'nc_p2': number;

  @AllowNull(false)
  @Default(1)
  @Column
  'nc_p3': number;

  @AllowNull(false)
  @Default(1)
  @Column
  'nc_p4': number;

  @AllowNull(false)
  @Default(1)
  @Column
  'nc_p5': number;

  @AllowNull(false)
  @Default(1)
  @Column
  'nd_p1': number;

  @AllowNull(false)
  @Default(1)
  @Column
  'nd_p2': number;

  @AllowNull(false)
  @Default(1)
  @Column
  'nd_p3': number;

  @AllowNull(false)
  @Default(1)
  @Column
  'nd_p4': number;

  @AllowNull(false)
  @Default(1)
  @Column
  'nd_p5': number;

  @AllowNull(false)
  @Default(0)
  @Column
  'fact_num2': number;

  @AllowNull(false)
  @Default(0)
  @Column
  'fact_num3': number;

  @AllowNull(false)
  @Default(0)
  @Column
  'fact_num4': number;

  @AllowNull(false)
  @Default(0)
  @Column
  'fact_num5': number;

  @AllowNull(false)
  @Default(0)
  @Column
  'nde_num2': number;

  @AllowNull(false)
  @Default(0)
  @Column
  'nde_num3': number;

  @AllowNull(false)
  @Default(0)
  @Column
  'nde_num4': number;

  @AllowNull(false)
  @Default(0)
  @Column
  'nde_num5': number;
  
  @AllowNull(false)
  @Default(0)
  @Column
  'nd_num2': number;

  @AllowNull(false)
  @Default(0)
  @Column
  'nd_num3': number;

  @AllowNull(false)
  @Default(0)
  @Column
  'nd_num4': number;

  @AllowNull(false)
  @Default(0)
  @Column
  'nd_num5': number;

  @Default(false)
  @Column
  'serie2': boolean;

  @Default(false)
  @Column
  'serie3': boolean;

  @Default(false)
  @Column
  'serie4': boolean;

  @Default(false)
  @Column
  'serie5': boolean;

  @Default(0)
  @Column
  'emp_num': number;

  @Default(0)
  @Column
  'dmc_num': number;

  @Default(0)
  @Column
  'tax_num': number;

  @Default(0)
  @Column
  'ced_num': number;

  @Default(0)
  @Column
  'ent_num': number;

  @Default(0)
  @Column
  'cie_num': number;

  @Default(0)
  @Column
  'odp_num': number;

  @Default(0)
  @Column
  'req_num': number;

  @Default(0)
  @Column
  'dev_num': number;

  @Default(0)
  @Column
  'exp_num': number;

  @Default(0)
  @Column
  'inp_num': number;

  @Default(0)
  @Column
  'cost_num': number;

  @Default(0)
  @Column
  'par_num': number;

  @Default(0)
  @Column
  'esc_num': number;

  @Default(0)
  @Column
  'pla_num': number;

  @Default(0)
  @Column
  'men_num': number;

  @Default(0)
  @Column
  'dist_num': number;

  @Default(0)
  @Column
  'exp_numi': number;
  
  // @CreatedAt
  // @Column
  // createdAt: Date;

  // @UpdatedAt
  // @Column
  // updatedAt: Date;

  @HasMany(() => Almacen, 'co_alma')
    almacenes: Almacen[];

  static scope(name: string = 'defaultScope'): typeof Sucursal {
    return super.scope.call(this, name);
  }
}



// sucursal.associate = function(models) {
//   // associations can be defined here
//   sucursal.hasMany(models.almacen,  {as: 'almacen', foreignKey: 'co_alma'}) //, {as: 'Measure', foreignKey: 'id'})
//   // lineaProducto.belongsTo(models.recipelineaProducto)
// }
