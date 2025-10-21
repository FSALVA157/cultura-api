import { DataSource } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Sexo } from '../../sexo/entities/sexo.entity';
import { Actividad } from '../../actividad/entities/actividad.entity';
import { Tipo } from '../../tipo_convocatoria/tipo/entities/tipo.entity';
import { Persona, TipoPersona } from '../../persona/entities/persona.entity';
import { Convocatoria } from '../../convocatoria/entities/convocatoria.entity';
import {
  Inscripciones,
  EstadoInscripcion,
} from '../../inscripciones/entities/inscripciones.entity';

export async function runSeeds(dataSource: DataSource) {
  console.log('🌱 Starting database seeding...');

  // Repositories
  const sexoRepo = dataSource.getRepository(Sexo);
  const actividadRepo = dataSource.getRepository(Actividad);
  const tipoRepo = dataSource.getRepository(Tipo);
  const personaRepo = dataSource.getRepository(Persona);
  const convocatoriaRepo = dataSource.getRepository(Convocatoria);
  const inscripcionesRepo = dataSource.getRepository(Inscripciones);

  try {
    // 1. SEED SEXOS
    console.log('📌 Seeding Sexos...');
    const sexos = await sexoRepo.save([
      { sexo: 'Masculino' },
      { sexo: 'Femenino' },
      { sexo: 'No binario' },
      { sexo: 'Prefiero no decir' },
    ]);
    console.log(`✅ Created ${sexos.length} sexos`);

    // 2. SEED ACTIVIDADES
    console.log('📌 Seeding Actividades...');
    const actividades = await actividadRepo.save([
      { actividad: 'Música' },
      { actividad: 'Danza' },
      { actividad: 'Teatro' },
      { actividad: 'Artes Plásticas' },
      { actividad: 'Literatura' },
      { actividad: 'Cine y Audiovisual' },
      { actividad: 'Fotografía' },
      { actividad: 'Artesanía' },
      { actividad: 'Diseño' },
      { actividad: 'Gastronomía Cultural' },
    ]);
    console.log(`✅ Created ${actividades.length} actividades`);

    // 3. SEED TIPOS DE CONVOCATORIA
    console.log('📌 Seeding Tipos de Convocatoria...');
    const tipos = await tipoRepo.save([
      { tipo_convocatoria: 'Festival' },
      { tipo_convocatoria: 'Concurso' },
      { tipo_convocatoria: 'Taller' },
      { tipo_convocatoria: 'Beca' },
      { tipo_convocatoria: 'Exposición' },
      { tipo_convocatoria: 'Residencia Artística' },
    ]);
    console.log(`✅ Created ${tipos.length} tipos de convocatoria`);

    // 4. SEED PERSONAS
    console.log('📌 Seeding Personas...');
    const saltRounds = 10;

    const personas = await personaRepo.save([
      {
        email: 'admin@cultura.gob.ar',
        nombre: 'María',
        apellido: 'González',
        password: await bcrypt.hash('admin123', saltRounds),
        dni: 35123456,
        cuil_cuit: '27-35123456-8',
        es_admin: true,
        sexo_id: sexos[1].id_sexo, // Femenino
        fecha_nacimiento: new Date('1990-03-15'),
        direccion: 'Av. Corrientes 1234',
        localidad: 'Ciudad Autónoma de Buenos Aires',
        provincia: 'Buenos Aires',
        telefono: '+54 11 4321-5678',
        tipo_persona: TipoPersona.HUMANA,
        actividad_id: actividades[0].id_actividad, // Música
      },
      {
        email: 'juan.perez@ejemplo.com',
        nombre: 'Juan',
        apellido: 'Pérez',
        password: await bcrypt.hash('password123', saltRounds),
        dni: 28456789,
        cuil_cuit: '20-28456789-5',
        es_admin: false,
        sexo_id: sexos[0].id_sexo, // Masculino
        fecha_nacimiento: new Date('1985-07-22'),
        direccion: 'Calle San Martín 567',
        localidad: 'Rosario',
        provincia: 'Santa Fe',
        telefono: '+54 341 456-7890',
        tipo_persona: TipoPersona.HUMANA,
        actividad_id: actividades[2].id_actividad, // Teatro
      },
      {
        email: 'laura.martinez@ejemplo.com',
        nombre: 'Laura',
        apellido: 'Martínez',
        password: await bcrypt.hash('password123', saltRounds),
        dni: 32987654,
        cuil_cuit: '27-32987654-1',
        es_admin: false,
        sexo_id: sexos[1].id_sexo, // Femenino
        fecha_nacimiento: new Date('1992-11-08'),
        direccion: 'Av. Libertador 890',
        localidad: 'Córdoba',
        provincia: 'Córdoba',
        telefono: '+54 351 789-0123',
        tipo_persona: TipoPersona.HUMANA,
        actividad_id: actividades[3].id_actividad, // Artes Plásticas
      },
      {
        email: 'asociacion.cultural@ejemplo.com',
        nombre_razon_social: 'Asociación Cultural Arte Vivo',
        password: await bcrypt.hash('password123', saltRounds),
        dni: 20123456,
        cuil_cuit: '30-20123456-7',
        es_admin: false,
        sexo_id: sexos[3].id_sexo, // Prefiero no decir
        direccion: 'Pasaje Cultural 123',
        localidad: 'Mendoza',
        provincia: 'Mendoza',
        telefono: '+54 261 234-5678',
        tipo_persona: TipoPersona.JURIDICA,
        actividad_id: actividades[4].id_actividad, // Literatura
      },
      {
        email: 'carlos.rodriguez@ejemplo.com',
        nombre: 'Carlos',
        apellido: 'Rodríguez',
        password: await bcrypt.hash('password123', saltRounds),
        dni: 30456123,
        cuil_cuit: '20-30456123-9',
        es_admin: false,
        sexo_id: sexos[0].id_sexo, // Masculino
        fecha_nacimiento: new Date('1988-05-12'),
        direccion: 'Calle Belgrano 456',
        localidad: 'La Plata',
        provincia: 'Buenos Aires',
        telefono: '+54 221 567-8901',
        tipo_persona: TipoPersona.HUMANA,
        actividad_id: actividades[5].id_actividad, // Cine
      },
    ]);
    console.log(`✅ Created ${personas.length} personas`);

    // 5. SEED CONVOCATORIAS
    console.log('📌 Seeding Convocatorias...');
    const convocatorias = await convocatoriaRepo.save([
      {
        convocatoria: 'Festival Nacional de Música 2025',
        tipo_id: tipos[0].id_tipo, // Festival
        descripcion:
          'Festival que reúne a artistas musicales de todo el país para celebrar la diversidad cultural argentina',
        reglamento:
          'Pueden participar músicos mayores de 16 años. Inscripción gratuita. Se aceptan todas las categorías musicales.',
        fecha: new Date('2025-11-15'),
        ubicacion: 'Teatro Colón, Buenos Aires',
        referente: 'María González',
        tel_referente: '+54 11 4321-5678',
      },
      {
        convocatoria: 'Concurso de Artes Plásticas 2025',
        tipo_id: tipos[1].id_tipo, // Concurso
        descripcion:
          'Convocatoria para artistas plásticos emergentes. Premios en efectivo y exposición.',
        reglamento:
          'Obras originales. Máximo 3 piezas por artista. Categorías: pintura, escultura, instalación.',
        fecha: new Date('2025-10-20'),
        ubicacion: 'Museo de Arte Moderno, Buenos Aires',
        referente: 'Roberto Silva',
        tel_referente: '+54 11 5555-1234',
      },
      {
        convocatoria: 'Taller de Teatro Comunitario',
        tipo_id: tipos[2].id_tipo, // Taller
        descripcion:
          'Taller gratuito de teatro para la comunidad. Todos los niveles.',
        reglamento: 'Inscripción abierta. Cupos limitados a 30 personas.',
        fecha: new Date('2025-09-01'),
        ubicacion: 'Centro Cultural Kirchner, Buenos Aires',
        referente: 'Ana López',
        tel_referente: '+54 11 6666-7890',
      },
      {
        convocatoria: 'Becas de Formación en Cine',
        tipo_id: tipos[3].id_tipo, // Beca
        descripcion:
          'Programa de becas para estudios de cine y audiovisual en instituciones reconocidas.',
        reglamento:
          'Presentar portfolio. Entrevista personal. Menores de 30 años.',
        fecha: new Date('2025-12-01'),
        ubicacion: 'Instituto Nacional de Cine',
        referente: 'Diego Fernández',
        tel_referente: '+54 11 7777-8901',
      },
      {
        convocatoria: 'Exposición Colectiva de Fotografía',
        tipo_id: tipos[4].id_tipo, // Exposición
        descripcion:
          'Convocatoria abierta para fotógrafos. Temática: Identidad Argentina.',
        reglamento:
          'Máximo 5 fotografías por artista. Formato digital. Resolución mínima 300dpi.',
        fecha: new Date('2025-11-01'),
        ubicacion: 'Galería Nacional, Buenos Aires',
        referente: 'Claudia Torres',
        tel_referente: '+54 11 8888-9012',
      },
    ]);
    console.log(`✅ Created ${convocatorias.length} convocatorias`);

    // 6. SEED INSCRIPCIONES
    console.log('📌 Seeding Inscripciones...');
    const inscripciones = await inscripcionesRepo.save([
      {
        persona_id: (personas[1] as any).id_persona, // Juan Pérez
        convocatoria_id: (convocatorias[2] as any).id_convocatoria, // Taller Teatro
        estado: EstadoInscripcion.ACTIVO,
      },
      {
        persona_id: (personas[2] as any).id_persona, // Laura Martínez
        convocatoria_id: (convocatorias[1] as any).id_convocatoria, // Concurso Artes
        estado: EstadoInscripcion.ACTIVO,
      },
      {
        persona_id: (personas[3] as any).id_persona, // Asociación
        convocatoria_id: (convocatorias[0] as any).id_convocatoria, // Festival Música
        estado: EstadoInscripcion.PENDIENTE,
      },
      {
        persona_id: (personas[4] as any).id_persona, // Carlos
        convocatoria_id: (convocatorias[3] as any).id_convocatoria, // Becas Cine
        estado: EstadoInscripcion.ACTIVO,
      },
      {
        persona_id: (personas[2] as any).id_persona, // Laura
        convocatoria_id: (convocatorias[4] as any).id_convocatoria, // Expo Fotografía
        estado: EstadoInscripcion.ACTIVO,
      },
      {
        persona_id: (personas[1] as any).id_persona, // Juan
        convocatoria_id: (convocatorias[0] as any).id_convocatoria, // Festival Música
        estado: EstadoInscripcion.INACTIVO,
      },
    ]);
    console.log(`✅ Created ${inscripciones.length} inscripciones`);

    console.log('\n🎉 Database seeding completed successfully!');
    console.log('\n📊 Summary:');
    console.log(`   - ${sexos.length} sexos`);
    console.log(`   - ${actividades.length} actividades`);
    console.log(`   - ${tipos.length} tipos de convocatoria`);
    console.log(`   - ${personas.length} personas`);
    console.log(`   - ${convocatorias.length} convocatorias`);
    console.log(`   - ${inscripciones.length} inscripciones`);
  } catch (error) {
    console.error('❌ Error during seeding:', error);
    throw error;
  }
}
