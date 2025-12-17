# Inventario PTM

Aplicación web para la gestión de inventario de productos, desarrollada con **Spring Boot** (backend) y **React** (frontend).

---

## 📦 Requisitos

Antes de comenzar, asegúrate de tener instalado:

- Java 17 o superior
- Node.js y npm
- MySQL
- Git

---

## 🚀 Instalación y ejecución

### 1️⃣ Clonar el repositorio

```bash
git clone https://github.com/ancorzize0250/inventarioptm.git
```

---

### 2️⃣ Configurar la base de datos

1. Crear una base de datos en MySQL con el nombre:

```sql
crud_app
```

2. Ejecutar el script:

```sql
script_base_de_datos.sql
```

Esto creará la tabla **Producto**.

---

### 3️⃣ Ejecutar el backend

Desde la carpeta `inventario_tpm`, ejecuta:

```bash
java -jar crud_backend_ptm-0.0.1-SNAPSHOT.jar --server.port=8081
```

#### 🔹 Alternativa
Si el comando anterior no funciona:

- Abre el proyecto `crud_backend_ptm` en **IntelliJ IDEA**
- Ejecuta la clase principal:

```
CrudBackendPtmApplication
```

---

### 4️⃣ Ejecutar el frontend

Desde otra consola, entra a la carpeta `inventory_front` y ejecuta:

```bash
npm install
npm run dev
```

---

### 5️⃣ Variables de entorno

El archivo `.env` del frontend debe apuntar al puerto **8081**.

Si no se cambió el puerto del backend, no es necesario modificar las variables.

---

### 6️⃣ Abrir la aplicación

En el navegador, accede a:

```
http://localhost:5173/
```

---

## ✅ Listo

La aplicación debería estar funcionando correctamente.

---

## 🛠️ Tecnologías utilizadas

- **Backend:** Spring Boot, Java, MySQL
- **Frontend:** React, Vite, Tailwind CSS
- **Otros:** Axios, REST API

