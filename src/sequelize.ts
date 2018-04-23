import {Sequelize} from 'sequelize-typescript';

export const sequelize = new Sequelize({
  // Usuarios Linux
  dialect: 'postgres',
  database: 'movies',
  username: 'postgres',
  password: 'postgres',
  // dialect: 'mssql',
  // database: 'demo',
  // username: 'profit',
  // password: 'profit',
  host: '10.20.180.4',
  // port: 1433,
  modelPaths: [__dirname + '/models']
});
