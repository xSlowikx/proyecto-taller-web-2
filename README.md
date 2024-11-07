# TO-DO APP: DONE!
Una TO-DO APP realizada para la materia Taller Web 2
## BACKEND
Para el back, localmente fue desplegado con Node v22.11.0 y esta utilizando las dependencias

    "dependencies": {
      "body-parser": "^1.20.3",
      "dotenv": "^16.4.5",
      "express": "^4.21.1",
      "mssql": "^11.0.1"
      }
La idea es armar una API REST pero aun la convencion para la division de las carpetas/archivos no esta definida, pero seguramente terminara siendo algo parecido a lo que hicimos en Taller I con controllers, services, etc. Seria genial poder tener un ORM, queda pendiente de investigacion.
## FRONTEND
Para el front, localmente fue creado con

    ng new frontend --no-standalone
Esto fue realizado de esta manera para trabajar con angular < 18 y su metodologia de trabajo no standalone, asi es coincidente con los tutoriales del profesor y demases.

## DATABASE
Para la database hay un archivo db-config.env donde se deberan setear las configuraciones locales de cada uno con SQL SERVER, hay otro archivo mas llamado db-connection.js que hara de rol intermediario para manejar la configuracion en codigo de la conexion y abrir el ConnectionPool, esta exportado como modulo para ser consumido dentro de index.js.

    PORT=3000
    DB_USER=sa
    DB_PASSWORD=YourStrongPassword!123
    DB_SERVER=localhost
    DB_NAME=todo_db
    
## DOCKER
La idea es poder crear una imagen contenedora de Docker que levante todo lo necesario para que la app funcione sin la necesidad de una base de datos o motor en especifico y que se encargue ella misma de todo lo necesario para funcionar
