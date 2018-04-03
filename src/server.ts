import {createServer} from 'http';
import {app} from './app';
import {sequelize} from './sequelize';

const port = process.env.PORT || 3000;

(async () => {
  await sequelize.sync({force: false});

  createServer(app)
    .listen(
      port, () => {
        console.log(`\n+----------------------------------+`);
        console.log(`|  Server running at port: [${port}]  |`);
        console.log(`+----------------------------------+`);
      } 
    );
})();
