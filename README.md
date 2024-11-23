# TO-DO APP: DONE!

Una TO-DO APP realizada para la materia Taller Web 2

## BACKEND

Para el back, localmente fue desplegado con Node v22.11.0 y esta utilizando las dependencias:

    "dependencies": {
    "bcrypt": "^5.1.1",
    "body-parser": "^1.20.3",
    "connect-session-sequelize": "^7.1.7",
    "cors": "^2.8.5",
    "dotenv": "^16.4.5",
    "express": "^4.21.1",
    "express-session": "^1.18.1",
    "mssql": "^11.0.1",
    "sequelize": "^6.37.5"
    }

La division de carpetas es una convencion basica de API REST para Express - Node.js

## FRONTEND
Para el front, localmente fue creado con angular 18 pero con el modo --no-standalone
ng new frontend --no-standalone
Esto fue realizado de esta manera para trabajar con angular < 18 y su metodologia de trabajo no standalone, asi es coincidente con los tutoriales del profesor y demases.

## DATABASE

Para la database hay un archivo db-config.env donde se deberan setear las configuraciones locales de cada uno con SQL SERVER, hay otro archivo mas llamado db-connection.js que hara de rol intermediario para manejar la configuracion en codigo de la conexion y abrir el ConnectionPool, esta exportado como modulo para ser consumido dentro de index.js.

**IMPORTANTE: DATOS A TENER EN CUENTA** (esto es configurable pero para que levante rapidamente dejarlo asi)

    DB_PORT=1433
    DB_USER=third_party_apps
    DB_PASSWORD=mG3~S6,mC70$p.VnJL]A
    DB_SERVER=localhost(o el de la PC)
    DB_NAME=to-do-app
   ### Instrucciones para levantar la DB
   

 - Dentro de `backend/db-script` se encuentra el script para la creacion
   de las tablas e insercion de algunas task:
	 - Importar la db a    traves del script
	 - Crear y asignar el usuario third-party-apps con sus permisos a la db:
		 - `USE [master];
GO
CREATE LOGIN third_party_apps WITH PASSWORD = 'mG3~S6,mC70$p.VnJL]A';
GO
USE [to-do-app];
CREATE USER third_party_apps FOR LOGIN third_party_apps;
GO
EXECT sp_addrolemember N'db_owner', N'third_party_apps';
GO`
	 - Habilitar en el SQL Server Configuration Manager el TCP/IP para el servicio activo de  		MSSQLSERVER
	 - Habilitar desde la config de las properties de la conexion que puedan realizarse por 	  Autenticación de windows y también de SQL Server (Autenticación Mixta, porque la app entra por usuario no por certificado)
	 - Los datos de la conexión deben ser colocados en db-config.env (**el mas importante, el atributo de SERVER=XXXXX**)
