import {Sequelize} from 'sequelize-typescript';

export const sequelize = new Sequelize({
  dialect: 'postgres',
  database: 'movies',
  username: 'postgres',
  password: '',
  modelPaths: [__dirname + '/models']
});
