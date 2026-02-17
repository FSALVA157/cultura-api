# API Cultura 🎭

API REST desarrollada con NestJS para la gestión de actividades culturales, convocatorias e inscripciones.

[![NestJS](https://img.shields.io/badge/NestJS-10.0-red?logo=nestjs)](https://nestjs.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue?logo=typescript)](https://www.typescriptlang.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-8.16-blue?logo=postgresql)](https://www.postgresql.org/)
[![TypeORM](https://img.shields.io/badge/TypeORM-0.3-orange)](https://typeorm.io/)

## Descripción

Sistema backend para la gestión integral de actividades culturales que permite:

- **Gestión de Personas**: Registro de personas físicas y jurídicas con información completa
- **Convocatorias Culturales**: Creación y administración de convocatorias con descripción, reglamento y ubicación
- **Sistema de Inscripciones**: Control de inscripciones con estados (activo, pendiente, inactivo)
- **Catálogos**: Gestión de actividades, tipos de convocatorias y datos demográficos
- **Documentación Interactiva**: API completamente documentada con Swagger/OpenAPI
- **Validación de Datos**: Validación automática de DTOs con class-validator
- **Seguridad**: Contraseñas encriptadas con bcrypt

## Características Principales

- ✅ API RESTful con arquitectura modular
- ✅ Documentación automática con Swagger
- ✅ Validación de datos con class-validator
- ✅ ORM con TypeORM para PostgreSQL
- ✅ Sistema de seeders para datos iniciales
- ✅ CORS habilitado
- ✅ Variables de entorno con @nestjs/config
- ✅ Timestamps automáticos (created_at, updated_at)
- ✅ Relaciones entre entidades (ManyToOne)
- ✅ Tipos enumerados para estados y categorías

## Tecnologías Utilizadas

- **Framework**: NestJS 10.x
- **Lenguaje**: TypeScript 5.9
- **Base de Datos**: PostgreSQL
- **ORM**: TypeORM 0.3
- **Documentación**: Swagger/OpenAPI
- **Validación**: class-validator, class-transformer
- **Seguridad**: bcrypt para hashing de passwords

## Requisitos Previos

- Node.js >= 18.x
- npm >= 9.x
- PostgreSQL >= 12.x

## Instalación

1. **Clonar el repositorio**

```bash
git clone <repository-url>
cd cultura-api
```

2. **Instalar dependencias**

```bash
npm install
```

3. **Configurar variables de entorno**

Crear un archivo `.env` en la raíz del proyecto basándose en `.env template`:

```env
DB_HOST=localhost
DB_PORT=5434
DB_NAME=cultura-db
DB_USER=postgres
DB_PASSWORD=tu_password
PORT=3000
NODE_ENV=development
```

4. **Crear la base de datos**

```bash
# Conectarse a PostgreSQL
psql -U postgres

# Crear la base de datos
CREATE DATABASE "cultura-db";
```

5. **Ejecutar migraciones y seeders**

```bash
# Las tablas se crean automáticamente con synchronize en desarrollo
npm run start:dev

# Opcionalmente, ejecutar seeders para datos iniciales
npm run seed
```

## Variables de Entorno

| Variable | Descripción | Valor por defecto |
|----------|-------------|-------------------|
| `DB_HOST` | Host de PostgreSQL | localhost |
| `DB_PORT` | Puerto de PostgreSQL | 5434 |
| `DB_NAME` | Nombre de la base de datos | cultura-db |
| `DB_USER` | Usuario de PostgreSQL | postgres |
| `DB_PASSWORD` | Contraseña de PostgreSQL | - |
| `PORT` | Puerto del servidor | 3000 |
| `NODE_ENV` | Entorno de ejecución | development |

## Scripts Disponibles

### Desarrollo

```bash
# Modo desarrollo con hot-reload
npm run start:dev

# Modo desarrollo normal
npm run start

# Modo debug
npm run start:debug
```

### Producción

```bash
# Compilar para producción
npm run build

# Ejecutar en producción
npm run start:prod

# Ejecutar seeder en producción
npm run seed:prod
```

### Base de Datos

```bash
# Ejecutar seeders en desarrollo
npm run seed

# Ejecutar seeders en producción
npm run seed:prod
```

### Testing

```bash
# Tests unitarios
npm run test

# Tests en modo watch
npm run test:watch

# Tests e2e
npm run test:e2e

# Cobertura de tests
npm run test:cov
```

### Calidad de Código

```bash
# Ejecutar linter
npm run lint

# Formatear código
npm run format
```

## Estructura del Proyecto

```
cultura-api/
├── src/
│   ├── actividad/           # Módulo de actividades
│   ├── convocatoria/         # Módulo de convocatorias
│   ├── inscripciones/        # Módulo de inscripciones
│   ├── persona/              # Módulo de personas
│   ├── sexo/                 # Módulo catálogo de sexos
│   ├── tipo_convocatoria/    # Módulo tipos de convocatoria
│   ├── database/
│   │   ├── seeder.ts         # Script principal de seeders
│   │   └── seeds/            # Definición de seeds
│   ├── app.module.ts         # Módulo principal
│   └── main.ts               # Punto de entrada
├── test/                     # Tests e2e
├── .env template             # Template de variables de entorno
└── package.json              # Dependencias y scripts
```

### Estructura de Módulos

Cada módulo sigue el patrón estándar de NestJS:

```
modulo/
├── dto/
│   ├── create-modulo.dto.ts
│   └── update-modulo.dto.ts
├── entities/
│   └── modulo.entity.ts
├── modulo.controller.ts
├── modulo.service.ts
└── modulo.module.ts
```

## API Endpoints

La API está completamente documentada con Swagger. Una vez que la aplicación esté en ejecución, accede a:

```
http://localhost:3000/api/docs
```

### Endpoints Principales

#### Personas
- `GET /persona` - Listar todas las personas
- `GET /persona/:id` - Obtener una persona por ID
- `POST /persona` - Crear nueva persona
- `PATCH /persona/:id` - Actualizar persona
- `DELETE /persona/:id` - Eliminar persona

#### Convocatorias
- `GET /convocatoria` - Listar convocatorias
- `GET /convocatoria/:id` - Obtener convocatoria por ID
- `POST /convocatoria` - Crear convocatoria
- `PATCH /convocatoria/:id` - Actualizar convocatoria
- `DELETE /convocatoria/:id` - Eliminar convocatoria

#### Inscripciones
- `GET /inscripciones` - Listar inscripciones
- `GET /inscripciones/:id` - Obtener inscripción por ID
- `POST /inscripciones` - Crear inscripción
- `PATCH /inscripciones/:id` - Actualizar inscripción
- `DELETE /inscripciones/:id` - Eliminar inscripción

#### Catálogos
- `GET /sexo` - Catálogo de sexos
- `GET /actividad` - Catálogo de actividades
- `GET /tipo` - Tipos de convocatoria

## Modelo de Datos

### Entidad Persona

```typescript
{
  id_persona: number;
  email: string;              // Único
  nombre: string;
  apellido: string;
  password: string;           // Encriptado
  dni: number;                // Único
  cuil_cuit: string;
  rol_id: number;
  es_admin: boolean;
  area_id: number;
  sexo_id: number;
  fecha_nacimiento: Date;
  direccion: string;
  localidad: string;
  provincia: string;
  telefono: string;
  tipo_persona: 'humana' | 'juridica';
  nombre_razon_social: string;
  actividad_id: number;
  created_at: Date;
  updated_at: Date;
}
```

### Entidad Convocatoria

```typescript
{
  id_convocatoria: number;
  convocatoria: string;
  tipo_id: number;
  descripcion: string;
  reglamento: string;
  fecha: Date;
  ubicacion: string;
  referente: string;
  tel_referente: string;
  created_at: Date;
  updated_at: Date;
}
```

### Entidad Inscripciones

```typescript
{
  id_inscripcion: number;
  persona_id: number;
  convocatoria_id: number;
  estado: 'activo' | 'pendiente' | 'inactivo';
  fecha_inscripcion: Date;
  updated_at: Date;
}
```

## Relaciones entre Entidades

```
Persona ──┬─── ManyToOne ───> Sexo
          ├─── ManyToOne ───> Actividad
          └─── OneToMany ──-> Inscripciones

Convocatoria ──┬─── ManyToOne ───> Tipo
               └─── OneToMany ──-> Inscripciones

Inscripciones ──┬─── ManyToOne ───> Persona
                └─── ManyToOne ───> Convocatoria
```

## Validaciones

El sistema implementa validaciones automáticas usando class-validator:

- **Email**: Formato válido y único
- **DNI**: Único en el sistema
- **Passwords**: Encriptados con bcrypt
- **Campos requeridos**: Validación automática
- **Tipos de datos**: Validación estricta de tipos
- **Enums**: Validación de valores permitidos

## Seeders

El proyecto incluye un sistema de seeders para poblar la base de datos con datos iniciales:

```bash
# Desarrollo
npm run seed

# Producción
npm run seed:prod
```

Los seeders crean datos para:
- Catálogo de sexos
- Catálogo de actividades
- Tipos de convocatoria
- Datos de ejemplo (opcional)

## Deployment

### Render.com

1. **Crear servicio PostgreSQL en Render**
2. **Configurar variables de entorno** en el dashboard de Render
3. **Configurar el servicio web**:
   - Build Command: `npm install && npm run build`
   - Start Command: `npm run start:prod`
4. **Ejecutar seeders** (opcional):
   ```bash
   npm run seed:prod
   ```

### Variables de Entorno en Producción

Asegúrate de configurar:
- `NODE_ENV=production`
- `DB_HOST`, `DB_PORT`, `DB_NAME`, `DB_USER`, `DB_PASSWORD` (de Render PostgreSQL)
- `PORT` (automático en Render)

## Seguridad

- ✅ Passwords encriptados con bcrypt
- ✅ Validación de datos en DTOs
- ✅ Whitelist de propiedades en DTOs
- ✅ SSL habilitado en producción
- ✅ CORS configurado
- ✅ Variables de entorno protegidas

## Testing

El proyecto incluye configuración para:

- **Unit Tests**: Tests unitarios con Jest
- **E2E Tests**: Tests end-to-end
- **Coverage**: Reporte de cobertura de código

```bash
# Ejecutar todos los tests
npm test

# Ver cobertura
npm run test:cov
```

## Troubleshooting

### Error de conexión a base de datos

```bash
# Verificar que PostgreSQL esté corriendo
sudo systemctl status postgresql

# Verificar variables de entorno
echo $DB_HOST $DB_PORT $DB_NAME
```

### Puerto ya en uso

```bash
# Cambiar el puerto en .env
PORT=3001
```

### Error en seeders

```bash
# Asegurarse de que la base de datos existe
npm run start:dev  # Esto creará las tablas
npm run seed       # Luego ejecutar seeders
```

## Documentación Adicional

- [NestJS Documentation](https://docs.nestjs.com)
- [TypeORM Documentation](https://typeorm.io)
- [Swagger Documentation](https://swagger.io/docs/)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)

## Contribuir

1. Fork el proyecto
2. Crear una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abrir un Pull Request

## Autor

Fernando - [GitHub](https://github.com/tu-usuario)

## Licencia

Este proyecto es privado y no tiene licencia de código abierto.

---

**Nota**: Este proyecto fue desarrollado como parte de un curso de desarrollo backend con NestJS.
