import {Sequelize} from 'sequelize-typescript';

export const sequelize = new Sequelize({
  // Usuarios Linux
  // dialect: 'postgres',
  // database: 'movies',
  // username: 'postgres',
  // password: 'postgres',
  dialect: 'mssql',
<<<<<<< HEAD
  database: 'GRASA_A',
=======
  database: 'GRASA_ADEMO',
  // database: 'DEMO',
>>>>>>> 486bce34e9d29635fd7be9669099f3e4f970cca2
  username: 'profit',
  password: 'profit',
  // host: 'grasacaccs.ddns.net',
  host: 'grasacanetuno.ddns.net',
  // host: 'grasacasatelca.ddns.net',
  // port: 1435,
  modelPaths: [__dirname + '/models']
});
