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
