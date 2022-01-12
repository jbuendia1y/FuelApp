# FuelApp

Aplicación para el seguimiento y reportería del abastecimiento de combustible.

## Instalación

Debe tener instalado :

- Docker y docker-compose
- Python y pipenv
- NodeJS

## Windows

...Proximamente

## Linux

Las aplicaciones deben tener el archivo `.env` siguiendo el `.env.example`.

### Iniciando aplicaciones

### Backend Local

El backend está en la carpeta `apps/fuel_app_backend`.

Los siguientes scripts inician el entorno de python. \
El comando ``pipenv run migrate` crea las tablas en la base de datos sqLite.

```.bash
pipenv shell
pipenv install
pipenv run migrate
```

Para ejecutar el siguiente comando necesita tener sus archivos de excel el la carpeta `apps/fuel_app_backend/data`

```.bash
pipenv run init_data
```

El comando `init_data` inyecta los datos de sus archivos de excel en su base de datos sqLite

Todo está listo para iniciar su backend solo necesita ejecutar el commando :

```.bash
pipenv run dev
```

El servidor se ejecuta en el `http://localhost:8000`

### Frotend Local

El frontend se encuentra en la carpeta `apps/frontend`.

Debe ejecutar los siguientes scripts:

El comando `npm ci` sirve para instalar las dependencias desde el `package-lock.json`

```.bash
npm ci
```

Para finalizar debe iniciar la aplicación con el comando:

```.bash
npm run dev
```

## Producción

Para la ejecución en producción, utilizaremos docker-compose:

En la carpeta raíz debe ejecutar los siguientes comandos:

```.bash
docker-compose build
docker-compose up -d
```
