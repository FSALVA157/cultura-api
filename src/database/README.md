# 🌱 Database Seeder - API Cultura

Este seeder precarga la base de datos con datos de ejemplo para desarrollo y testing.

## 📊 Datos que se crean

### 1. **Sexos** (4 registros)
- Masculino
- Femenino
- No binario
- Prefiero no decir

### 2. **Actividades** (10 registros)
- Música
- Danza
- Teatro
- Artes Plásticas
- Literatura
- Cine y Audiovisual
- Fotografía
- Artesanía
- Diseño
- Gastronomía Cultural

### 3. **Tipos de Convocatoria** (6 registros)
- Festival
- Concurso
- Taller
- Beca
- Exposición
- Residencia Artística

### 4. **Personas** (5 registros)
- **Admin**: admin@cultura.gob.ar / password: `admin123`
- **Juan Pérez**: juan.perez@ejemplo.com / password: `password123`
- **Laura Martínez**: laura.martinez@ejemplo.com / password: `password123`
- **Asociación Cultural Arte Vivo**: asociacion.cultural@ejemplo.com / password: `password123`
- **Carlos Rodríguez**: carlos.rodriguez@ejemplo.com / password: `password123`

### 5. **Convocatorias** (5 registros)
- Festival Nacional de Música 2025
- Concurso de Artes Plásticas 2025
- Taller de Teatro Comunitario
- Becas de Formación en Cine
- Exposición Colectiva de Fotografía

### 6. **Inscripciones** (6 registros)
- Relaciones entre personas y convocatorias con diferentes estados

---

## 🚀 Cómo ejecutar el seeder

### **Desarrollo Local:**

```bash
# Ejecutar el seeder en desarrollo
npm run seed
```

### **Producción (Render):**

Tienes **dos opciones** para ejecutar el seeder en producción:

#### **Opción 1: Ejecutar manualmente desde Shell** (Recomendado)

1. Ve a tu Web Service en Render
2. Abre la pestaña **"Shell"**
3. Ejecuta:
   ```bash
   npm run seed:prod
   ```

#### **Opción 2: Ejecutar automáticamente en el primer deploy**

Modifica tu **Build Command** en Render a:
```bash
npm install && npm run build && npm run seed:prod
```

⚠️ **CUIDADO**: Esto ejecutará el seeder en cada deploy. Úsalo solo para el primer deploy y luego revierte al comando original.

---

## ⚠️ Notas importantes

1. **El seeder NO borra datos existentes** - Solo agrega nuevos registros
2. **Puede generar errores de duplicados** si los datos ya existen (emails/DNIs únicos)
3. **Las contraseñas están hasheadas** con bcrypt
4. **Todas las fechas son relativas a 2025**

---

## 🔄 Limpiar y volver a seed

Si quieres borrar todos los datos y volver a ejecutar el seeder:

### **Opción Manual:**
Conéctate a PostgreSQL y ejecuta:
```sql
TRUNCATE TABLE inscripciones, convocatoria, persona, tipo, actividad, sexo RESTART IDENTITY CASCADE;
```

### **Con TypeORM synchronize:**
Si tienes `synchronize: true`, simplemente reinicia la aplicación y ejecuta el seeder.

---

## 📝 Personalizar datos

Para agregar o modificar los datos del seeder, edita el archivo:
```
src/database/seeds/seed.ts
```

---

## 🧪 Probar endpoints con datos semilla

Una vez ejecutado el seeder, puedes probar:

```bash
# Listar todas las personas
GET http://localhost:3000/persona

# Login con admin
POST http://localhost:3000/auth/login
{
  "email": "admin@cultura.gob.ar",
  "password": "admin123"
}

# Listar convocatorias
GET http://localhost:3000/convocatoria

# Ver inscripciones
GET http://localhost:3000/inscripciones
```

---

## 📚 Swagger Documentation

Visita `/api/docs` para ver y probar todos los endpoints con los datos precargados.
