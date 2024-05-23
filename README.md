# SmartContract CRUD 📖 

Ejemplo base de como implementar un CRUD en un contrato intelignete de NEAR usando JS.

## Creación de cuenta y herramientas de desarrollo

### 1. Creación de cuenta de testnet

    https://testnet.mynearwallet.com/

### 2. Instalar NodeJS

    https://nodejs.org/en/download/package-manager

### 3. Instalar NodeJS

```bash
npm install -g near-cli
```

## Configuración y despliegue de contrato

Ejecutar los siguientes comandos en la raíz del proyecto:

### 1. Iniciar sesión con cuenta de NEAR en el proyecto

```bash
near login
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Compilar contrato

```bash
npm run build
```

### 4. Desplegar contrato

```bash
npm run deploy
```

## Métodos de prueba de contrato:

ID=crud2.testnet
echo $ID

### 1. Obtener el total de los registros almacenados

```bash
near view $ID get_total_records 
```

### 2. Obtener todos los registros almacenados

```bash
near view $ID get_all_records 
```

### 3. Obtener un registro específico por su ID

```bash
near view $ID get_record '{"id": 1}'
```

### 4. Crear un nuevo registro

```bash
near call $ID new_record '{"prop1": "Valor 1"}' --accountId yairnava.testnet
```

### 5. Actualizar un registro existente por su ID

```bash
near call $ID update_record '{"id": 1, "new_prop1": "Valor MOD"}' --accountId yairnava.testnet
```

### 6. Eliminar un registro existente por su ID

```bash
near call $ID delete_record '{"id": 1}' --accountId yairnava.testnet
```