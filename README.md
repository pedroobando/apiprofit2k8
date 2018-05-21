# Api-RESTful Profit2k8
Esto es una sencilla Api-restful, de la base de dato del sistema administrativo [Profit 2k8](http://www.miprofit.com/administrativo/)

### Proposito
Es ampliar el sistema profit 2k8 y aprovechar su base de datos. Creando nuevas aplicaciones e integrandolo a otros sistema(s) que estaran en desarrollo:
* aplicacion de solicitudes a almacen.
* aplicacion de ordenes de trabajo.

### Desarollado bajo
    node.js (v8.10.0)
    express
    sequelize

### Base de datos
    Microsoft SQLServer 2008R2
    postgres (opcional)

### Comentario
Mi opinión personal, el sistema es muy bueno como sistema administrativo, cumple un 90% el estándar de la empresa, también se debe a los buenos integradores que conocen bien la herramienta (profit) y han logrado adaptarlo a la empresa.

Por otra parte la estructura de la base de datos es un porquería, no esta pensado en crecer o en integrase a otras aplicaciones existen en una organización, fue concebido desde un punto que todo depende del personal de la empresa SoftTech (creadora y administradora de este sistema), posiblemente el esquema de la base de datos fue cambiado en la versión 2k12 - debe estar mejor desarrollado.

### Nota sobre el lenguaje
Esta version alfa, esta escrita en TypeScript, es muy parecida a la anterior escrita es puro JavaScript. Contendra los mismo parametros y reglas que la anterior, lo unico que cambia es el lenguaje en el cual fue escrita. La otra version no tendra mas soporte.

### Proyecto Base
Proyecto plantilla de Robin Buschamann [sequelize-typescript](https://github.com/RobinBuschmann/sequelize-typescript) para typescript
