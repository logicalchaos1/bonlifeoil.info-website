import Navbar from "@/components/Navbar";
import { useSeo } from "@/hooks/use-seo";

const sections = [
  {
    title: "Qué datos recopilamos",
    body: [
      "Cuando llena un formulario en nuestro sitio web o en un anuncio de Facebook o Instagram, recopilamos su nombre, teléfono, correo electrónico (si lo indica), nombre y tipo de negocio, consumo aproximado de aceite, ciudad o dirección de entrega y el horario que prefiere para ser contactado.",
      "También guardamos las respuestas que nos envía por SMS, WhatsApp o en llamadas con nuestro asistente.",
    ],
  },
  {
    title: "Para qué los usamos",
    body: [
      "Para responder a su solicitud: confirmar su interés, preparar cotizaciones, coordinar muestras, entregas o visitas técnicas, y darle seguimiento como cliente.",
      "No vendemos ni alquilamos sus datos a terceros.",
    ],
  },
  {
    title: "Mensajes y llamadas automatizadas",
    body: [
      "Al enviar un formulario, acepta que Bonlife Oil le contacte por SMS, WhatsApp y llamadas telefónicas, incluidas llamadas realizadas por un asistente de voz automatizado, sobre su solicitud. Pueden aplicar cargos de su operador.",
      "Puede dejar de recibir mensajes en cualquier momento respondiendo STOP a cualquier SMS o pidiéndolo en la llamada.",
    ],
  },
  {
    title: "Proveedores que nos ayudan",
    body: [
      "Usamos proveedores para operar estos servicios: Meta (formularios de Facebook e Instagram), Supabase (almacenamiento de datos), Twilio (SMS y llamadas), ElevenLabs (asistente de voz) y Resend (correos internos). Cada uno procesa los datos solo para prestar su servicio.",
    ],
  },
  {
    title: "Cuánto tiempo los guardamos",
    body: [
      "Conservamos sus datos mientras exista una relación comercial o una solicitud abierta, y hasta 24 meses después del último contacto, salvo que la ley exija otro plazo.",
    ],
  },
  {
    title: "Sus derechos",
    body: [
      "Puede pedirnos ver, corregir o eliminar sus datos escribiendo al WhatsApp +1 (829) 987-6764. Respondemos en un plazo máximo de 30 días.",
    ],
  },
];

const Privacidad = () => {
  useSeo({
    title: "Política de Privacidad | Bonlife Oil",
    description: "Cómo Bonlife Oil recopila, usa y protege los datos de clientes y solicitudes en República Dominicana.",
    path: "/privacidad",
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="bg-[#0a1a0f] h-20" />
      <main className="container mx-auto px-4 py-12 md:py-16 max-w-3xl">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">Política de privacidad</h1>
        <p className="text-sm text-muted-foreground mb-10">Bonlife Oil · Santo Domingo, República Dominicana · Actualizada el 2 de noviembre de 2026</p>
        <div className="space-y-8">
          {sections.map((s) => (
            <section key={s.title}>
              <h2 className="text-xl font-bold text-foreground mb-3">{s.title}</h2>
              {s.body.map((p) => (
                <p key={p} className="text-muted-foreground leading-relaxed mb-3">{p}</p>
              ))}
            </section>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Privacidad;
