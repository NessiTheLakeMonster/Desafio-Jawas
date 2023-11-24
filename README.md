# Desafío Jawas :gem:
Integrantes
  - [Inés Mª Barrera Llerena](https://github.com/NessiTheLakeMonster)
  - [Patricia Mota](https://github.com/patrimj)
  - [Jaime](https://github.com/jornu99)

-------
# Manual de Servidor :closed_lock_with_key:
## Registrar usuario

## Iniciar sesión

## LOTE

#### Listar lotes

- URL: `http://127.0.0.1:8000/api/lote/listar`
- Método: `GET`

#### Crear lote

- URL: `http://127.0.0.1:8000/api/lote/crear`
- Método: `POST`
- Datos requeridos:
  - `id_usuario`: ID del usuario (integer, requerido)
  - `lugar_recogida`: Lugar de recogida del lote (string, requerido)

##### Ejemplo de solicitud para guardar lote

```json
{
    "id_usuario": 1,
    "lugar_recogida": "40.712776, -74.005974",
    "entregado": false,
    "cancelado": false
}
```

#### Mostrar lote

- URL: `http://127.0.0.1:8000/api/lote/mostrar/{id}`
- Método: `GET`
- Parámetros de ruta:
  - `id`: ID del lote (integer, requerido)

#### Modificar lote

- URL: `http://127.0.0.1:8000/api/lote/modificar/{id}`
- Método: `PUT`
- Parámetros de ruta:
  - `id`: ID del lote (integer, requerido)
- Datos requeridos:
  - `id_usuario`: ID del usuario (integer, requerido)
  - `lugar_recogida`: Lugar de recogida del lote (string, requerido)
  - `entregado`: Estado de entrega del lote (boolean, requerido)
  - `cancelado`: Estado de cancelación del lote (boolean, requerido)

##### Ejemplo de solicitud para modificar lote

```json
{
    "id_usuario": 1,
    "lugar_recogida": "40.712776, -74.005974",
    "entregado": true,
    "cancelado": false
}
```
#### Eliminar lote

- URL: `http://127.0.0.1:8000/api/lote/eliminar/{id}`
- Método: `DELETE`
- Parámetros de ruta:
  - `id`: ID del lote (integer, requerido)

#### Comprobar lotes entregados
- URL: `http://127.0.0.1:8000/api/lote/entregados`
- Método: `GET`

#### Cancelar Lotes
- URL: `http://127.0.0.1:8000/api/lote/cancelar/{id}` 
- Método: `PUT`
- Parámetros de ruta:
  - `id`: ID del lote que deseas cancelar.

## INFO LOTE

#### Desguazar y clasificar el lote

- URL: `http://127.0.0.1:8000/api/info_lote/desguazar`
- Método: `POST`
- Datos requeridos:
  - `idLote`: ID del lote (integer, requerido)
  - `idComponente`: ID del componente (integer, requerido)
  - `descripcion`: Descripción del componente (string, requerido)
  - `cantidad`: Cantidad de componentes (integer, requerido)

##### Ejemplo de solicitud para desguazar y clasificar el lote

```json
{
    "idLote": 1,
    "idComponente": 1,
    "descripcion": "gominola",
    "cantidad": 10
}
```
#### Listar todos los componentes del lote desguazado

- URL: `http://127.0.0.1:8000/api/info_lote/listar/{idLote}`
- Método: `GET`

## COMPONENTES

#### Listar todos los componentes

- URL: `http://127.0.0.1:8000/api/componentes/listar`
- Método: `GET`

#### Mostrar un componente específico

- URL: `http://127.0.0.1:8000/api/componentes/mostrar/{id}`
- Método: `GET`

#### Crear un nuevo componente

- URL: `http://127.0.0.1:8000/api/componentes/crear`
- Método: `POST`
- Datos requeridos:
  - `nombre`: Nombre del componente (string, requerido)
  - `hardware`: Indica si el componente es hardware (booleano, requerido)

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
- Datos requeridos:
  - `nombre`: Nuevo nombre del componente (string, requerido)
  - `hardware`: Indica si el componente es hardware (booleano, requerido)

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

#### Verificar si un componente es hardware
- URL: `http://127.0.0.1:8000/api/componentes/esHardware/{id}`
- Método: `GET`

## JOYAS

#### Listar todas las joyas

- URL: `http://127.0.0.1:8000/api/joya/listar`
- Método: `GET`

#### Mostrar una joya específica

- URL: `http://127.0.0.1:8000/api/joya/mostrar/{id}`
- Método: `GET`

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
  "idTipoJoya": 1
}
```
#### Verificar si hay suficientes componentes en el inventario
- URL: `http://127.0.0.1:8000/api/joya/componentes/{id}`
- Método: `GET`
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

#### Crear una nueva receta

- URL: `http://127.0.0.1:8000/api/receta/crear`
- Método: `POST`
- Datos requeridos:
  - `idUsuario`: ID del usuario (integer, requerido)

##### Ejemplo de solicitud para crear una receta

```json
{
  "idUsuario": 7
}
```

#### Modificar una receta existente

- URL: `http://127.0.0.1:8000/api/receta/modificar/{id}`
- Método: `PUT`
- Datos requeridos:
  - `idUsuario`: ID del usuario (integer, requerido)

##### Ejemplo de solicitud para modificar una receta

```json
{
  "idUsuario": 7
}
```

#### Eliminar una receta

- URL: `http://127.0.0.1:8000/api/receta/eliminar/{id}`
- Método: `DELETE`

## INGREDIENTES

#### Listar todas los ingredientes

- URL: `http://127.0.0.1:8000/api/ingrediente/listar`
- Método: `GET`

#### Mostrar un ingrediente específico

- URL: `http://127.0.0.1:8000/api/ingrediente/mostrar/{id}`
- Método: `GET`

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
