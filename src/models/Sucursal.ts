import {
  Model, Table, BelongsToMany, Scopes, CreatedAt, UpdatedAt,
  Column, PrimaryKey, AllowNull, Default, Unique 
} from "sequelize-typescript";
import { DataTypeUUID } from "sequelize";

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
@Table({tableName: 'almacen'})
export class Sucursal extends Model<Sucursal> {

  @PrimaryKey
  @Column
  @AllowNull(false)
  'co_alma': string;

  @Column
  @AllowNull(false)
  @Default('')
  'alma_des': string;

  @Column
  @Unique
  @Default(0)
  @AllowNull(false)
  'nro_fact': number;
  
  @Column
  @AllowNull(false)
  'num_fac_ini': number;

  @Column
  @AllowNull(false)
  'num_fac_fin': number;

  @Column
  @Default('')
  @AllowNull(false)
  'campo1': string;

  @Column
  @Default('')
  @AllowNull(false)
  'campo2': string;

  @Column
  @Default('')
  @AllowNull(false)
  'campo3': string;

  @Column
  @Default('')
  @AllowNull(false)
  'campo4': string;

  @Column
  @Default('00')
  @AllowNull(false)
  'co_us_in': string;

  @Column
  @Default(_dateparse)
  'fe_us_in': Date;

  @Column
  @Default('00')
  @AllowNull(false)
  'co_us_mo': string;

  @Column
  @Default(_dateparse)
  'fe_us_mo': Date;

  @Column
  @Default('00')
  @AllowNull(false)
  'co_us_el': string;

  @Column
  @Default(_dateparse)
  'fe_us_el': Date;

  @Column
  @Default('')
  @AllowNull(false)
  'revisado': string;

  @Column
  @Default('')
  @AllowNull(false)
  'trasnfe': string;

  @Column
  @Default('02')
  @AllowNull(false)
  'co_sucu': string;

  @Column
  @AllowNull(false)
  'rowguid': DataTypeUUID;

  @Column
  @AllowNull(false)
  @Default(0)
  'nc_num': number;

  @Column
  @AllowNull(false)
  @Default(0)
  'nd_num': number;

  @Column
  @AllowNull(false)
  @Default(0)
  'ajus_num': number;

  @Column
  @AllowNull(false)
  @Default(0)
  'tras_num': number;

  @Column
  @AllowNull(false)
  @Default(0)
  'fisi_num': number;

  @Column
  @AllowNull(false)
  @Default(0)
  'num_kit': number;

  @Column
  @AllowNull(false)
  @Default(0)
  'genk_num': number;

  @Column
  @AllowNull(false)
  @Default(0)
  'cotc_num': number;

  @Column
  @AllowNull(false)
  @Default(0)
  'ped_num': number;

  @Column
  @AllowNull(false)
  @Default(0)
  'devc_num': number;

  @Column
  @AllowNull(false)
  @Default(0)
  'nde_num': number;
  
  @Column
  @AllowNull(false)
  @Default(0)
  'ndd_num': number;

  @Column
  @AllowNull(false)
  @Default(0)
  'post_num': number;

  @Column
  @AllowNull(false)
  @Default(0)
  'cfxg_num': number;

  @Column
  @AllowNull(false)
  @Default(0)
  'chdv_num': number;

  @Column
  @AllowNull(false)
  @Default(0)
  'ndr_num': number;

  @Column
  @AllowNull(false)
  @Default(0)
  'postcppnum': number;

  @Column
  @AllowNull(false)
  @Default(0)
  'ccxg_num': number;

  @Column
  @AllowNull(false)
  @Default(0)
  'chdvcppnum': number;

  @Column
  @AllowNull(false)
  @Default(0)
  'girocppnum': number;
  
  @Column
  @AllowNull(false)
  @Default(0)
  'nccpp_num': number;

  @Column
  @AllowNull(false)
  @Default(0)
  'ndcpp_num': number;

  @Column
  @AllowNull(false)
  @Default(0)
  'retencppnum': number;

  @Column
  @AllowNull(false)
  @Default(0)
  'pg_num': number;

  @Column
  @AllowNull(false)
  @Default(0)
  'aju_posm': number;

  @Column
  @AllowNull(false)
  @Default(0)
  'aju_posa': number;

  @Column
  @AllowNull(false)
  @Default(0)
  'aju_negm': number;
  
  @Column
  @AllowNull(false)
  @Default(0)
  'aju_nega': number;

  @Column
  @AllowNull(false)
  @Default(0)
  'aju_posmc': number;

  @Column
  @AllowNull(false)
  @Default(0)
  'aju_negmc': number;

  @Column
  @AllowNull(false)
  @Default(0)
  'pventa': number;

  @Column
  @AllowNull(false)
  @Default(0)
  'turnosic': number;

  @Column
  @AllowNull(false)
  @Default(0)
  'plv_num': number;

  @Column
  @AllowNull(false)
  @Default(0)
  'plc_num': number;

  @Column
  @AllowNull(false)
  @Default(0)
  'tabislr': number;

  @Column
  @AllowNull(false)
  @Default(0)
  'imp_num': number;

  @Column
  @AllowNull(false)
  @Default(0)
  'rma_cli': number;

  @Column
  @AllowNull(false)
  @Default(0)
  'rma_prov': number;
  
  @Column
  @AllowNull(false)
  @Default(0)
  'rma_entc': number;

  @Column
  @AllowNull(false)
  @Default(0)
  'rma_entp': number;

  @Column
  @AllowNull(false)
  @Default(0)
  'rma_regs': number;

  @Column
  @AllowNull(false)
  @Default('')
  'fact_s1': string;

  @Column
  @AllowNull(false)
  @Default('')
  'fact_s2': string;

  @Column
  @AllowNull(false)
  @Default('')
  'fact_s3': string;

  @Column
  @AllowNull(false)
  @Default('')
  'fact_s4': string;

  @Column
  @AllowNull(false)
  @Default('')
  'fact_s5': string;

  @Column
  @AllowNull(false)
  @Default('')
  'nde_s1': string;

  @Column
  @AllowNull(false)
  @Default('')
  'nde_s2': string;

  @Column
  @AllowNull(false)
  @Default('')
  'nde_s3': string;

  @Column
  @AllowNull(false)
  @Default('')
  'nde_s4': string;

  @Column
  @AllowNull(false)
  @Default('')
  'nde_s5': string;

  @Column
  @AllowNull(false)
  @Default('')
  'nc_s1': string;

  @Column
  @AllowNull(false)
  @Default('')
  'nc_s2': string;

  @Column
  @AllowNull(false)
  @Default('')
  'nc_s3': string;

  @Column
  @AllowNull(false)
  @Default('')
  'nc_s4': string;

  @Column
  @AllowNull(false)
  @Default('')
  'nc_s5': string;

  @Column
  @AllowNull(false)
  @Default(0)
  'fact_f1': number;

  @Column
  @AllowNull(false)
  @Default(0)
  'fact_f2': number;

  @Column
  @AllowNull(false)
  @Default(0)
  'fact_f3': number;

  @Column
  @AllowNull(false)
  @Default(0)
  'fact_f4': number;

  @Column
  @AllowNull(false)
  @Default(0)
  'nde_f1': number;

  @Column
  @AllowNull(false)
  @Default(0)
  'nde_f2': number;

  @Column
  @AllowNull(false)
  @Default(0)
  'nde_f3': number;

  @Column
  @AllowNull(false)
  @Default(0)
  'nde_f4': number;

  @Column
  @AllowNull(false)
  @Default(0)
  'nc_f1': number;

  @Column
  @AllowNull(false)
  @Default(0)
  'nc_f2': number;

  @Column
  @AllowNull(false)
  @Default(0)
  'nc_f3': number;

  @Column
  @AllowNull(false)
  @Default(0)
  'nc_f4': number;

  @Column
  @AllowNull(false)
  @Default(0)
  'nd_f1': number;

  @Column
  @AllowNull(false)
  @Default(0)
  'nd_f2': number;

  @Column
  @AllowNull(false)
  @Default(0)
  'nd_f3': number;

  @Column
  @AllowNull(false)
  @Default(0)
  'nd_f4': number;
  
  @Column
  @AllowNull(false)
  @Default(1)
  'fact_p1': number;

  @Column
  @AllowNull(false)
  @Default(1)
  'fact_p2': number;

  @Column
  @AllowNull(false)
  @Default(1)
  'fact_p3': number;

  @Column
  @AllowNull(false)
  @Default(1)
  'fact_p4': number;

  @Column
  @AllowNull(false)
  @Default(1)
  'fact_p5': number;
  
  @Column
  @AllowNull(false)
  @Default(1)
  'nde_p1': number;

  @Column
  @AllowNull(false)
  @Default(1)
  'nde_p2': number;

  @Column
  @AllowNull(false)
  @Default(1)
  'nde_p3': number;

  @Column
  @AllowNull(false)
  @Default(1)
  'nde_p4': number;

  @Column
  @AllowNull(false)
  @Default(1)
  'nde_p5': number;
    
  @Column
  @AllowNull(false)
  @Default(1)
  'nc_p1': number;

  @Column
  @AllowNull(false)
  @Default(1)
  'nc_p2': number;

  @Column
  @AllowNull(false)
  @Default(1)
  'nc_p3': number;

  @Column
  @AllowNull(false)
  @Default(1)
  'nc_p4': number;

  @Column
  @AllowNull(false)
  @Default(1)
  'nc_p5': number;
  
  nd_p1: {
    type: DataTypes.INTEGER,
    defaultValue: 1
  },
  nd_p2: {
    type: DataTypes.INTEGER,
    defaultValue: 1
  },
  nd_p3: {
    type: DataTypes.INTEGER,
    defaultValue: 1
  },
  nd_p4: {
    type: DataTypes.INTEGER,
    defaultValue: 1
  },
  nd_p5: {
    type: DataTypes.INTEGER,
    defaultValue: 1
  },
  fact_num2: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  fact_num3: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  fact_num4: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  fact_num5: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  nde_num2: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },    
  nde_num3: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },    
  nde_num4: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },    
  nde_num5: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  nd_num2: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },    
  nd_num3: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },    
  nd_num4: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },    
  nd_num5: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  serie2: {
    type: DataTypes.BOOLEAN,
    defaultValue: 0
  },
  serie3: {
    type: DataTypes.BOOLEAN,
    defaultValue: 0
  },
  serie4: {
    type: DataTypes.BOOLEAN,
    defaultValue: 0
  },
  serie5: {
    type: DataTypes.BOOLEAN,
    defaultValue: 0
  },
  emp_num: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  dmc_num: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  tax_num: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  ced_num: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  ent_num: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  cie_num: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  odp_num: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  req_num: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  dev_num: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  exp_num: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  inp_num: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  cost_num: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  par_num: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  esc_num: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  pla_num: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  men_num: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  dist_num: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  exp_numi: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  }

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
