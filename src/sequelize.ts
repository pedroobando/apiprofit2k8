import {Sequelize} from 'sequelize-typescript';

export const sequelize = new Sequelize({
  // Usuarios Linux
  // dialect: 'postgres',
  // database: 'movies',
  // username: 'postgres',
  // password: 'postgres',
  dialect: 'mssql',
  database: 'demo',
  username: 'sa',
  password: 'S3rver2008r2',
  host: 'VENGCSERVP03',
  // port: 1433,
  modelPaths: [__dirname + '/models']
});
