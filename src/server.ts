import {createServer} from 'http';
import {app} from './app';
import {sequelize} from './sequelize';

const port = process.env.PORT || 3000;
  // force = true: Crea de nuevo las tablas
  // force = false: Verifica si las tablas estas todas creadas o normalizadas, si falta algo lo creo o lo a~nade.  // 

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

