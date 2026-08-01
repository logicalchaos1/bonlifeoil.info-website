import {
  type LucideIcon,
  Filter, ThermometerSun, ShieldCheck, CheckCircle2,
  Truck, PackageCheck, Route, Wrench,
  Handshake, TrendingUp, Users, ClipboardList,
  Moon, Sun,
} from 'lucide-react';

export interface JobResponsibility {
  icon: LucideIcon;
  title: string;
  description: string;
}

export interface Job {
  slug: string;
  title: string;
  location: string;
  shift: string;
  shiftIcon: LucideIcon;
  type: string;
  summary: string;
  description: string;
  responsibilities: JobResponsibility[];
  requirements: string[];
}

export const jobs: Job[] = [
  {
    slug: 'filtracion-aceite',
    title: 'Trabajador de Filtración de Aceite',
    location: 'Bávaro, República Dominicana',
    shift: 'Turno nocturno',
    shiftIcon: Moon,
    type: 'Tiempo completo',
    summary: 'Filtración y mantenimiento de aceite de freidora durante el turno nocturno.',
    description:
      'Bonlife busca un trabajador de filtración de aceite para turno nocturno en Bávaro. Esta persona será responsable de filtrar y dar mantenimiento al aceite de freidora siguiendo nuestros protocolos de calidad, ayudando a extender su vida útil y mantener los estándares de fritura que nuestros clientes esperan.',
    responsibilities: [
      {
        icon: Filter,
        title: 'Filtración de aceite',
        description: 'Filtrar el aceite de las freidoras según el cronograma establecido (cada 8–10 horas) para maximizar su vida útil y mantener la calidad de fritura.',
      },
      {
        icon: ThermometerSun,
        title: 'Control de temperatura',
        description: 'Monitorear y registrar la temperatura del aceite durante el turno, asegurando que se mantenga dentro del rango óptimo.',
      },
      {
        icon: ShieldCheck,
        title: 'Higiene y seguridad',
        description: 'Cumplir con los protocolos de manejo seguro de aceite caliente y equipos de fritura, y mantener la estación de trabajo limpia y organizada.',
      },
      {
        icon: CheckCircle2,
        title: 'Registro de bitácora',
        description: 'Completar los registros de filtración y cambio de aceite requeridos para control de calidad interno.',
      },
    ],
    requirements: [
      'Disponibilidad para trabajar turno nocturno',
      'Experiencia previa en cocina, freidoras o mantenimiento de equipos (preferible, no obligatorio)',
      'Capacidad de seguir protocolos de seguridad e higiene alimentaria',
      'Responsable, puntual y con atención al detalle',
      'Residir en Bávaro o zonas cercanas',
    ],
  },
  {
    slug: 'chofer',
    title: 'Chofer / Repartidor',
    location: 'Bávaro, República Dominicana',
    shift: 'Turno diurno',
    shiftIcon: Sun,
    type: 'Tiempo completo',
    summary: 'Entrega de productos Bonlife a restaurantes, hoteles y negocios de la zona de Bávaro.',
    description:
      'Bonlife busca un chofer/repartidor para la zona de Bávaro, responsable de entregar productos a clientes de forma puntual y segura, manteniendo el vehículo y la mercancía en buen estado durante toda la ruta.',
    responsibilities: [
      {
        icon: Truck,
        title: 'Entrega de productos',
        description: 'Transportar y entregar pedidos a restaurantes, hoteles y negocios de foodservice según la ruta y horario asignados.',
      },
      {
        icon: Route,
        title: 'Cumplimiento de rutas',
        description: 'Seguir las rutas de entrega planificadas de forma eficiente, cumpliendo los horarios acordados con cada cliente.',
      },
      {
        icon: PackageCheck,
        title: 'Carga y documentación',
        description: 'Verificar que la carga corresponda a cada pedido, y manejar la documentación de entrega (facturas, remisiones, firmas de recibido).',
      },
      {
        icon: Wrench,
        title: 'Cuidado del vehículo',
        description: 'Mantener el vehículo limpio y en buenas condiciones, reportando cualquier desperfecto de forma oportuna.',
      },
    ],
    requirements: [
      'Licencia de conducir vigente',
      'Experiencia previa como conductor o repartidor',
      'Conocimiento de las rutas y zonas de Bávaro / Punta Cana',
      'Responsable, puntual y con buena actitud de servicio',
      'Buena condición física para carga y descarga de mercancía',
      'Disponibilidad de tiempo completo',
    ],
  },
  {
    slug: 'vendedora',
    title: 'Vendedora',
    location: 'Bávaro, República Dominicana',
    shift: 'Turno diurno',
    shiftIcon: Sun,
    type: 'Tiempo completo',
    summary: 'Ventas y atención a restaurantes, hoteles y negocios de foodservice en la zona de Bávaro.',
    description:
      'Bonlife busca una vendedora para la zona de Bávaro, encargada de visitar restaurantes, hoteles y negocios de comida, generar nuevas cuentas y dar seguimiento a clientes existentes para hacer crecer las ventas en la zona.',
    responsibilities: [
      {
        icon: Handshake,
        title: 'Visitas comerciales',
        description: 'Visitar restaurantes, hoteles y negocios de foodservice en Bávaro para presentar el catálogo de productos Bonlife.',
      },
      {
        icon: TrendingUp,
        title: 'Generación de clientes',
        description: 'Prospectar y captar nuevos clientes, y dar seguimiento a las oportunidades de venta hasta cerrarlas.',
      },
      {
        icon: Users,
        title: 'Relación con clientes',
        description: 'Mantener y fortalecer la relación con clientes actuales, asegurando su satisfacción y recompra.',
      },
      {
        icon: ClipboardList,
        title: 'Gestión de pedidos',
        description: 'Tomar y coordinar pedidos con el equipo de logística, y llevar seguimiento de metas de ventas mensuales.',
      },
    ],
    requirements: [
      'Experiencia previa en ventas (preferible en foodservice o HORECA)',
      'Excelentes habilidades de comunicación y negociación',
      'Disponibilidad para movilizarse dentro de la zona de Bávaro',
      'Orientada a resultados y cumplimiento de metas',
      'Conocimiento de la zona turística de Bávaro / Punta Cana',
      'Responsable, proactiva y con buena presencia',
    ],
  },
];

export const getJobBySlug = (slug: string | undefined) => jobs.find((job) => job.slug === slug);
