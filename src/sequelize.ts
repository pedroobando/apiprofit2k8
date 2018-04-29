import {Sequelize} from 'sequelize-typescript';

export const sequelize = new Sequelize({
  // Usuarios Linux
  // dialect: 'postgres',
  // database: 'movies',
  // username: 'postgres',
  // password: 'postgres',
  dialect: 'mssql',
  database: 'GRASA_ADEMO',
  // database: 'DEMO',
  username: 'profit',
  password: 'profit',
  host: 'grasacaccs.ddns.net',
  // host: 'grasacanetuno.ddns.net',
  // host: 'grasacasatelca.ddns.net',
  // port: 1435,
  modelPaths: [__dirname + '/models']
});
