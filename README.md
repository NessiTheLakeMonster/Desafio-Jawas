## Lote

#### Listar lotes

- URL: `http://127.0.0.1:8000/api/lote/listar`
- Método: `GET`

#### Guardar lote

- URL: `http://127.0.0.1:8000/api/lote/guardar`
- Método: `POST`
- Datos requeridos:
  - `id_usuario`: ID del usuario (integer, requerido)
  - `lugar_recogida`: Lugar de recogida del lote (string, requerido)
  - `entregado`: Estado de entrega del lote (boolean, requerido)
  - `cancelado`: Estado de cancelación del lote (boolean, requerido)

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

#### Entregar Lotes
- URL: `http://127.0.0.1:8000/api/entregar/{id}`
- Método: `PUT`
- Parámetros de ruta:
  - `id`: ID del lote que deseas entregar.

#### Cancelar Lotes
- URL: `http://127.0.0.1:8000/api/lote/cancelar/{id}` 
- Método: `PUT`
- Parámetros de ruta:
  - `id`: ID del lote que deseas cancelar.

## Info Lote

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

#### Mostrar un lote específico

- URL: `http://127.0.0.1:8000/api/info_lote/mostrar/{id}`
- Método: `GET`

#### Listar todos los lotes

- URL: `http://127.0.0.1:8000/api/info_lote/listar`
- Método: `GET`

## Componentes

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

## joyas

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

#### Modificar una joya existente

- URL: `http://127.0.0.1:8000/api/joya/modificar/{id}`
- Método: `PUT`
- Datos requeridos:
  - `foto`: foto de la joya (string, requerido)
  - `idTipoJoya`: ID del tipo de joya (integer, requerido)
  - `idReceta`: ID de la receta (integer, requerido)

##### Ejemplo de solicitud para modificar una joya

```json
{
  "foto": "prueba",
  "idTipoJoya": 5,
  "idReceta": 6
}
```

#### Eliminar una joya

- URL: `http://127.0.0.1:8000/api/joya/eliminar/{id}`
- Método: `DELETE`
