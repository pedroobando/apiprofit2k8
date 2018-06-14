import {Sequelize} from 'sequelize-typescript';

export const sequelize = new Sequelize({
  // Usuarios Linux
  // dialect: 'postgres',
  // database: 'movies',
  // username: 'postgres',
  // password: 'postgres',
  dialect: 'mssql',
  database: 'GRASA_A',
  username: 'profit',
  password: 'profit',
  // host: 'grasacaccs.ddns.net',
  host: 'grasacanetuno.ddns.net',
  logging: false, // no muestra la instruccion sql por consola
  // host: 'grasacasatelca.ddns.net',
  // port: 1435,
  modelPaths: [__dirname + '/models']
});
