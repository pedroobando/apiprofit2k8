import {Sequelize} from 'sequelize-typescript';

export const sequelize = new Sequelize({
  dialect: 'postgres',
  database: 'movies',
  username: 'postgres',
  password: 'postgres',
  // host: '10.20.180.4',
  modelPaths: [__dirname + '/models']
});

