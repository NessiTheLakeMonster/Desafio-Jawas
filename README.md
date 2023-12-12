# Desafío Jawas :gem:
Integrantes
  - [Inés Mª Barrera Llerena](https://github.com/NessiTheLakeMonster)
  - [Patricia Mota](https://github.com/patrimj)
  - [Jaime Ortega](https://github.com/jornu99)

-------
# Ejecución del código

## BASE DE DATOS

Los siguientes comandos deben ejecutarse en la carpeta `backend`

```bash
  php artisan update -> Este comando debe ejecutarse para la carpeta vendor
  php artisan key:generate

  php artisan migrate

  php artisan db:seed --class=UserSeeder
  php artisan db:seed --class=RolSeeder
  php artisan db:seed --class=RolAsignadoSeeder
  php artisan db:seed --class=ComponenteSeeder
  php artisan db:seed --class=TipoJoyaSeeder
```

En caso de tener problemas con AWS, se recomienda la ejecución de los siguientes comandos.
```bash
  composer require aws/aws-sdk-php   
  composer require aws/aws-sdk-php-laravel
  composer require league/flysystem-aws-s3-v3
```

Se ha creado un usuario por defecto, estos son los datos en caso de querer inciar sesión con él.
```
  nombre => admin
  apellido => admin
  email => admin@gmail.com
  contraseña => admin123
```

## SERVIDOR WEBPACK

Los siguientes comandos deben ejecutarse en la carpeta `frontend`

```bash
  npm install -> Este comando debe ejecutarse para crear la carpeta node_modules
  npm run build -> Este comando debe ejecutarse para crear la carpeta dist
  npm run config
  npm run watch
```

`run config` y `run watch` deben estar ejecutándose al mismo tiempo

-------
# Manual de Servidor :closed_lock_with_key:


# USUARIOS
#### Registrar usuario

- URL: `http://127.0.0.1:8000/api/registro`
- Método: `POST`
- Datos requeridos:
  - `fotoPerfil`: Foto que va a tener el usuario (string)
  - `nombre`: Nombre del usuario (string, requerido)
  - `apellido`: Apellido del usuario (string, requerido)
  - `email`: Email del usuario (string, requerido, único)
  - `password`: Contraseña del usuario (string, requerido)

##### Ejemplo de solicitud para registrar usuario
```json
{
  "fotoPerfil": "url_Foto",
  "nombre": "Ines",
  "apellido": "Barrera",
  "email": "inesmballe@gmail.com",
  "password": "admin123"
}
```

#### Iniciar sesión

- URL: `http://127.0.0.1:8000/api/login`
- Método: `POST`
- Datos requeridos:
  - `email`: Email del usuario (string, requerido, único)
  - `password`: Contraseña del usuario (string, requerido)
  - `Bearer Token`

##### Ejemplo de solicitud para iniciar sesión
```json
{
  "email": "inesmballe@gmail.com",
  "password": "admin123"
}
```

#### Cerrar Sesión

- URL: `http://127.0.0.1:8000/api/logout/{id}`
- Método: `POST`
- Datos requeridos:
  - `id`: ID del Usuario que tiene cuenta y token
  - `Bearer Token`

##### Ejemplo de solicitud para cerrar sesión
```json
{
  "id_usuario": 1
}
```

#### Subir Foto Perfil

- URL: `http://127.0.0.1:8000/api/subir`
- Método: `POST`
- Datos requeridos:
  - `foto`: archivo de foto
  - `Bearer Token`

# PERFIL

#### Mostrar Usuario de perfil buscado por ID
- URL: `http://127.0.0.1:8000/api/perfil/buscar/{id}`
- Método: `GET`
- Datos requeridos:
  - `id`: ID del Usuario que tiene cuenta y token
  - `Bearer Token`

#### Subir Foto Perfil

- URL: `http://127.0.0.1:8000/api/perfil/modificarFoto/{id}`
- Método: `POST`
- Datos requeridos:
  - `id`: ID del Usuario que tiene cuenta y token
  - `foto`: archivo de foto
  - `Bearer Token`

#### Modificar datos de tu Usuario
- URL: `http://127.0.0.1:8000/api/perfil/modificar/{id}`
- Método: `PUT`
- Datos requeridos:
  - `id`: ID del Usuario que tiene cuenta y token
  - `Bearer Token`

##### Ejemplo de solicitud para registrar usuario
```json
{
  "nombre": "Ines Maria",
  "apellido": "Llerena"
}
```

#### Modificar contraseña de tu Usuario
- URL: `http://127.0.0.1:8000/api/perfil/modificarPasswd/{id}`
- Método: `PUT`
- Datos requeridos:
  - `id`: ID del Usuario que tiene cuenta y token
  - `Bearer Token`

##### Ejemplo de solicitud para registrar usuario
```json
{
  "password" : "nuevaPasswd"
}
```

# ADMINISTRADOR

## ASIGNACIÓN DE ROL

#### Asignar un nuevo Rol al usuario
- URL: `http://127.0.0.1:8000/api/asignarRol/{idUsuario}/{idRol}`
- Método: `POST`
- Datos requeridos:
  - `id`: ID del Usuario que tiene cuenta y token
  - `idRol`: ID del Rol el cual puede consultarse en Rol_Asignado
  - `Bearer Token`

#### Ver Roles asignados a un usuario
- URL: `http://127.0.0.1:8000/api/roles/{id}`
- Método: `GET`
- Datos requeridos:
  - `id`: ID del Usuario que tiene cuenta y token
  - `Bearer Token`

#### Listar todos los roles
- URL: `http://127.0.0.1:8000/api/roles`
- Método: `GET`
- Datos requeridos:
  - `Bearer Token`

## GESTIÓN DE USUARIOS

#### Listar Usuarios
- URL: `http://127.0.0.1:8000/api/usuario/listar`
- Método: `GET`
- Datos requeridos:
  - `Bearer Token`

#### Mostrar Usuario buscado por ID
- URL: `http://127.0.0.1:8000/api/usuario/mostrar/{id}`
- Método: `GET`
- Datos requeridos:
  - `id`: ID del Usuario que tiene cuenta y token
  - `Bearer Token`
  
#### Modificar un Usuario
- URL: `http://127.0.0.1:8000/api/usuario/modificar/{id}`
- Método: `PUT`
- Datos requeridos:
  - `id`: ID del Usuario que tiene cuenta y token
  - `Bearer Token`

##### Ejemplo de solicitud para registrar usuario
```json
{
  "nombre": "Ines Maria",
  "apellido": "Llerena"
}
```

#### Eliminar un Usuario
- URL: `http://127.0.0.1:8000/api/usuario/eliminar/{id}`
- Método: `DELETE`
- Datos requeridos:
  - `id`: ID del Usuario que tiene cuenta y token
  - `Bearer Token`

#### Crear un usuario
- URL: `http://127.0.0.1:8000/api/usuario/registro`
- Método: `POST`
- Datos requeridos:
  - `fotoPerfil`: Foto que va a tener el usuario (string)
  - `nombre`: Nombre del usuario (string, requerido)
  - `apellido`: Apellido del usuario (string, requerido)
  - `email`: Email del usuario (string, requerido, único)
  - `password`: Contraseña del usuario (string, requerido)
  - `Bearer Token`

##### Ejemplo de solicitud para registrar usuario
```json
{
  "fotoPerfil": "url_Foto",
  "nombre": "Ines",
  "apellido": "Barrera",
  "email": "inesmballe@gmail.com",
  "password": "admin123"
}
```

## COMPONENTES

#### Listar todos los componentes

- URL: `http://127.0.0.1:8000/api/componentes/listar`
- Método: `GET`
- Datos requeridos:
  - `Bearer Token`

#### Mostrar un componente específico

- URL: `http://127.0.0.1:8000/api/componentes/mostrar/{id}`
- Método: `GET`
- Parámetros de ruta:
  - `id`: ID del componente (integer, requerido) 
  - `Bearer Token`

#### Crear un nuevo componente

- URL: `http://127.0.0.1:8000/api/componentes/crear`
- Método: `POST`
- Datos requeridos:
  - `nombre`: Nombre del componente (string, requerido)
  - `hardware`: Indica si el componente es hardware (booleano, requerido)
  - `Bearer Token`

##### Ejemplo de solicitud para crear un componente

```json
{
    "nombre": "Cable de red",
    "hardware": true
}
```

#### Modificar un componente existente

- URL: `http://127.0.0.1:8000/api/componentes/modificar/{id}`
- Método: `PUT`
- Parámetros de ruta:
  - `id`: ID del componente (integer, requerido) 
- Datos requeridos:
  - `nombre`: Nuevo nombre del componente (string, requerido)
  - `hardware`: Indica si el componente es hardware (booleano, requerido)
  - `Bearer Token`

##### Ejemplo de solicitud para modificar un componente

```json
{
    "nombre": "Papelera",
    "hardware": true
}
```

#### Eliminar un componente

- URL: `http://127.0.0.1:8000/api/componentes/eliminar/{id}`
- Método: `DELETE`
- Parámetros de ruta:
  - `id`: ID del componente (integer, requerido) 
- Datos requeridos:
  - `Bearer Token`

## INVENTARIO

#### Listar Inventario
- URL: `http://127.0.0.1:8000/api/inventario/mostrar`
- Método: `GET`
- Datos requeridos:
  - `Bearer Token`

#### Modificar Inventario 

- URL: `http://127.0.0.1:8000/api/inventario/modificar/{id}`
- Método: `PUT`
- Parámetros de ruta:
  - `id`: ID del inventario (integer, requerido)
- Datos requeridos:
  - `cantidad`: ID del inventario (integer, requerido)
  - `Bearer Token`

#### Eliminar Componentes del Inventario

- URL: `http://127.0.0.1:8000/api/inventario/eliminar/{id}`
- Método: `DELETE`
- Parámetros de ruta:
  - `id`: ID del inventario (integer, requerido) 
- Datos requeridos:
  - `Bearer Token`

# COLABORADOR

## LOTE

#### Listar lotes

- URL: `http://127.0.0.1:8000/api/lote/listar`
- Método: `GET`
- Datos requeridos:
  - `Bearer Token`

#### Crear lote

- URL: `http://127.0.0.1:8000/api/lote/crear`
- Método: `POST`
- Datos requeridos:
  - `id_usuario`: ID del usuario (integer, requerido)
  - `latitud`: latutud de recogida del lote (integer, requerido)
  - `longitud`: longitud de recogida del lote (integer, requerido)
  - `Bearer Token`
  

##### Ejemplo de solicitud para guardar lote

```json
{
    "id_usuario": 1,
    "latitud":  -74.005974,
    "longitud": -74.005974,
}
```

#### Mostrar lote

- URL: `http://127.0.0.1:8000/api/lote/mostrar/{id}`
- Método: `GET`
- Parámetros de ruta:
  - `id`: ID del lote (integer, requerido)
  - `Bearer Token`

#### Modificar lote

- URL: `http://127.0.0.1:8000/api/lote/modificar/{id}`
- Método: `PUT`
- Parámetros de ruta:
  - `id`: ID del lote (integer, requerido)
- Datos requeridos:
  - `id_lote`: ID del lote (integer, requerido)
  - `latitud`: latutud de recogida del lote (integer, requerido)
  - `longitud`: longitud de recogida del lote (integer, requerido)
  - `entregado`: Estado de entrega del lote (boolean, requerido)
  - `cancelado`: Estado de cancelación del lote (boolean, requerido)
  - `Bearer Token`

##### Ejemplo de solicitud para modificar lote

```json
{
    "id_usuario": 1,
    "latitud":  -74.005974,
    "longitud": -74.005974,
    "entregado": true,
    "cancelado": false
}
```
#### Eliminar lote

- URL: `http://127.0.0.1:8000/api/lote/eliminar/{id}`
- Método: `DELETE`
- Parámetros de ruta:
  - `id`: ID del lote (integer, requerido)
  - `Bearer Token`

#### Comprobar lotes entregados
- URL: `http://127.0.0.1:8000/api/lote/entregados/{idUsuario}`
- Método: `GET`
- Datos requeridos:
  - `Bearer Token`

#### Cancelar Lotes
- URL: `http://127.0.0.1:8000/api/lote/cancelar/{id}` 
- Método: `PUT`
- Parámetros de ruta:
  - `id`: ID del lote que deseas cancelar.
  - `Bearer Token`

## CLASIFICADOR

## INFO LOTE

#### Desguazar y clasificar el lote

- URL: `http://127.0.0.1:8000/api/info_lote/desguazar/{idLote}`
- Método: `POST`
- Parámetros de ruta:
  - `idLote`: ID del lote (integer, requerido) 
- Datos requeridos:
  - `idComponente`: ID del componente (integer, requerido)
  - `descripcion`: Descripción del componente (string, requerido)
  - `cantidad`: Cantidad de componentes (integer, requerido)
  - `Bearer Token`

##### Ejemplo de solicitud para desguazar y clasificar el lote

```json
{
    "idComponente": 1,
    "descripcion": "gominola",
    "cantidad": 10
}
```
#### Listar todos los componentes del lote desguazado

- URL: `http://127.0.0.1:8000/api/info_lote/listar/{idLote}`
- Método: `GET`
- Parámetros de ruta:
  - `idLote`: ID del lote (integer, requerido) 
  - `Bearer Token`

#### Listar todos los lotes entregados para clasificar

- URL: `http://127.0.0.1:8000/api/info_lote/listar`
- Método: `GET`

#### Listar todos los lotes a despiezar

- URL: `http://127.0.0.1:8000/api/info_lote/lotes/{id}`
- Método: `GET`

#### Crear desguace

- URL: `http://127.0.0.1:8000/api/info_lote/crear`
- Método: `POST`
- Datos requeridos:
  - `idComponente`: ID del componente (integer, requerido)
  - `descripcion`: Descripción del componente (string, requerido)
  - `cantidad`: Cantidad de componentes (integer, requerido)

##### Ejemplo de solicitud para crear desguace

```json
{
    "idComponente": 1,
    "descripcion": "gominola",
    "cantidad": 10
}
```


## JOYAS

#### Listar todas las joyas

- URL: `http://127.0.0.1:8000/api/joya/listar`
- Método: `GET`

#### Mostrar una joya específica

- URL: `http://127.0.0.1:8000/api/joya/mostrar/{id}`
- Método: `GET`
- Parámetros de ruta:
  - `id`: ID de la joya (integer, requerido) 

#### Crear una nueva joya

- URL: `http://127.0.0.1:8000/api/joya/crear`
- Método: `POST`
- Datos requeridos:
  - `foto`: foto de la joya (string, requerido)
  - `idTipoJoya`: ID del tipo de joya (integer, requerido)
  - `idReceta`: ID de la receta (integer, requerido)

##### Ejemplo de solicitud para crear una joya

```json
{
  "foto": "prueba",
  "idTipoJoya": 5,
  "idReceta": 6
}
```

#### Modificar la imagen de una joya existente

- URL: `http://127.0.0.1:8000/api/joya/modificar/{id}`
- Método: `PUT`
- Parámetros de ruta:
  - `id`: ID de la joya (integer, requerido) 
- Datos requeridos:
  - `foto`: foto de la joya (string, requerido)

##### Ejemplo de solicitud para modificar una joya

```json
{
  "foto": "prueba",
}
```

#### Eliminar una joya

- URL: `http://127.0.0.1:8000/api/joya/eliminar/{id}`
- Método: `DELETE`
- Parámetros de ruta:
  - `id`: ID de la joya (integer, requerido) 

#### Generador de Joyas Aleatorios

- URL: `http://127.0.0.1:8000/api/joya/generar`
- Método: `POST`
- Datos requeridos:
  - `foto`: foto de la joya (string, requerido)
  - `idTipoJoya`: ID del tipo de joya (integer, requerido)
  - `idReceta`: ID de la receta (integer, requerido)
 
##### Ejemplo de solicitud para generar una joya

```json
{
  "idTipoJoya": 1,
  "foto": "ruta/a/la/foto.jpg"
}
```
#### Verificar si hay suficientes componentes en el inventario
- URL: `http://127.0.0.1:8000/api/joya/componentes/{idReceta}`
- Método: `GET`
- Parámetros de ruta:
  - `id`: ID del componente (integer, requerido) 
- Datos requeridos:
  - `id_receta`: ID de la receta (integer, requerido)

##### Ejemplo de respuesta exitosa

```json
{
    "message": "Hay suficientes componentes en el inventario",
    "cantidad Necesaria": 10,
    "cantidad Inventario": 20
    "Cantidad de Joyas que puedes realizar": 23
}
```
##### Ejemplo de respuesta de error

```json
{
    "error": "No hay suficientes componentes en el inventario",
    "cantidad Necesaria": 10,
    "cantidad Inventario": 5,
    "cantidad Faltante": 5
}
```

## RECETAS

#### Listar todas las recetas

- URL: `http://127.0.0.1:8000/api/receta/listar`
- Método: `GET`

#### Mostrar una receta específica

- URL: `http://127.0.0.1:8000/api/receta/mostrar/{id}`
- Método: `GET`
- Parámetros de ruta:
  - `id`: ID de la receta (integer, requerido) 

#### Crear una nueva receta

- URL: `http://127.0.0.1:8000/api/receta/crear`
- Método: `POST`
- Datos requeridos:
  - `id`: ID del usuario (integer, requerido)

##### Ejemplo de solicitud para crear una receta

```json
{
  "idUsuario": 7
}
```

#### Modificar una receta existente

- URL: `http://127.0.0.1:8000/api/receta/modificar/{id}`
- Método: `PUT`
- Parámetros de ruta:
  - `id`: ID de la receta (integer, requerido) 
- Datos requeridos:
  - `id`: ID del usuario (integer, requerido)

##### Ejemplo de solicitud para modificar una receta

```json
{
  "idUsuario": 7
}
```

#### Eliminar una receta

- URL: `http://127.0.0.1:8000/api/receta/eliminar/{id}`
- Método: `DELETE`
- Parámetros de ruta:
  - `id`: ID de la receta (integer, requerido) 

## INGREDIENTES

#### Listar todas los ingredientes

- URL: `http://127.0.0.1:8000/api/ingrediente/listar`
- Método: `GET`

#### Mostrar un ingrediente específico

- URL: `http://127.0.0.1:8000/api/ingrediente/mostrar/{id}`
- Método: `GET`
- Parámetros de ruta:
  - `id`: ID del ingrediente (integer, requerido) 

#### Crear un nuevo ingrediente

- URL: `http://127.0.0.1:8000/api/ingrediente/crear`
- Método: `POST`
- Datos requeridos:
  - `id_receta`: ID de la receta (integer, requerido)
  - `id_componente`: ID del componente (integer, requerido)
  - `cantidad`: cantidad del ingrediente

##### Ejemplo de solicitud para crear un ingrediente

```json
{
  "id_receta": 5,
  "id_componente":9,
  "cantidad":32
}
```

#### Modificar un ingrediente existente

- URL: `http://127.0.0.1:8000/api/ingrediente/modificar/{id}`
- Método: `PUT`
- Parámetros de ruta:
  - `id`: ID del ingredeinte (integer, requerido) 
- Datos requeridos:
  - `id_receta`: ID de la receta (integer, requerido)
  - `id_componente`: ID del componente (integer, requerido)
  - `cantidad`: cantidad del ingrediente

##### Ejemplo de solicitud para modificar un ingrediente

```json
{
  "id_receta": 5,
  "id_componente":9,
  "cantidad":32
}
```

#### Eliminar un ingrediente

- URL: `http://127.0.0.1:8000/api/ingrediente/eliminar/{id}`
- Método: `DELETE`
- Parámetros de ruta:
  - `id`: ID del ingredente (integer, requerido) 
