import {Sequelize} from 'sequelize-typescript';

export const sequelize = new Sequelize({
  dialect: 'postgres',
  database: 'movies',
  username: 'postgres',
  password: 'postgres',
  // host: 'grasaca.ddns.net',
  modelPaths: [__dirname + '/models']
});

