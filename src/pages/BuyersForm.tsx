import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import bonlifeLogo from "@/assets/bonlife-logo.png";

const formSchema = z.object({
  rnc: z.string().min(9, "RNC debe tener al menos 9 dígitos").max(11, "RNC debe tener máximo 11 dígitos"),
  companyName: z.string().min(2, "Nombre de la empresa es requerido").max(200),
  address: z.string().min(5, "Dirección completa es requerida").max(300),
  contactName: z.string().min(2, "Nombre del contacto es requerido").max(100),
  contactPhone: z.string().min(10, "Teléfono es requerido").max(20),
  contactEmail: z.string().email("Email inválido"),
  businessType: z.string().min(1, "Tipo de negocio es requerido"),
  product: z.string().min(1, "Seleccione un producto"),
  quantity: z.string().min(1, "Cantidad es requerida"),
  deliveryAddress: z.string().max(300).optional(),
  notes: z.string().max(500).optional(),
  signedBy: z.string().min(2, "Nombre del firmante es requerido").max(100),
  signedTitle: z.string().min(2, "Cargo del firmante es requerido").max(100),
});

type FormValues = z.infer<typeof formSchema>;

const BuyersForm = () => {
  const navigate = useNavigate();
  const [paymentTerms, setPaymentTerms] = useState<string>("");

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      rnc: "",
      companyName: "",
      address: "",
      contactName: "",
      contactPhone: "",
      contactEmail: "",
      businessType: "",
      product: "",
      quantity: "",
      deliveryAddress: "",
      notes: "",
      signedBy: "",
      signedTitle: "",
    },
  });

  const onSubmit = (values: FormValues) => {
    console.log("Form submitted:", values);
    toast.success("Formulario enviado exitosamente. Nos pondremos en contacto pronto.");
    form.reset();
    setPaymentTerms("");
  };

  const handleQuantityChange = (value: string) => {
    const qty = parseInt(value) || 0;
    if (qty < 10) {
      setPaymentTerms("Al Contado (Sin Crédito)");
    } else {
      setPaymentTerms("Crédito 30 Días");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <Button
          variant="ghost"
          onClick={() => navigate("/")}
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Volver al Inicio
        </Button>

        <div className="max-w-4xl mx-auto">
          <div className="bg-card rounded-lg shadow-lg p-6 md:p-8 mb-8">
            <div className="text-center mb-8">
              <img 
                src={bonlifeLogo} 
                alt="Bonlife Logo" 
                className="h-16 md:h-20 mx-auto mb-4"
              />
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                Formulario de Nuevo Cliente
              </h1>
              <p className="text-muted-foreground">Bonlife - Aceites Premium</p>
            </div>

            <div className="bg-accent/10 border border-border rounded-lg p-4 md:p-6 mb-8">
              <h2 className="font-semibold text-lg mb-3">Información de la Empresa</h2>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p><strong className="text-foreground">Razón Social:</strong> Apidra Group P&E SRL</p>
                <p><strong className="text-foreground">RNC:</strong> 131141463</p>
                <p><strong className="text-foreground">Dirección:</strong> Calle Benigno del Castillo #5, Santo Domingo, Dominican Republic</p>
              </div>
            </div>

            <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 md:p-6 mb-8">
              <h3 className="font-semibold text-lg mb-3">Términos de Pago</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• <strong className="text-foreground">Menos de 10 unidades:</strong> Al Contado (Sin Crédito)</li>
                <li>• <strong className="text-foreground">10 unidades o más:</strong> Crédito a 30 Días</li>
              </ul>
            </div>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="rnc"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>RNC *</FormLabel>
                        <FormControl>
                          <Input placeholder="131141463" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="companyName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nombre de la Empresa *</FormLabel>
                        <FormControl>
                          <Input placeholder="Mi Empresa SRL" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Dirección Fiscal *</FormLabel>
                      <FormControl>
                        <Input placeholder="Calle, Número, Sector, Ciudad" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="border-t border-border pt-6">
                  <h3 className="font-semibold text-lg mb-4">Datos del Contacto</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="contactName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nombre Completo *</FormLabel>
                          <FormControl>
                            <Input placeholder="Juan Pérez" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="contactPhone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Teléfono *</FormLabel>
                          <FormControl>
                            <Input placeholder="809-555-1234" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="contactEmail"
                    render={({ field }) => (
                      <FormItem className="mt-6">
                        <FormLabel>Email *</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="contacto@empresa.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="border-t border-border pt-6">
                  <h3 className="font-semibold text-lg mb-4">Información del Negocio</h3>
                  
                  <FormField
                    control={form.control}
                    name="businessType"
                    render={({ field }) => (
                      <FormItem className="mb-6">
                        <FormLabel>Tipo de Negocio *</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Seleccione tipo de negocio" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="restaurant">Restaurante</SelectItem>
                            <SelectItem value="hotel">Hotel</SelectItem>
                            <SelectItem value="bakery">Panadería</SelectItem>
                            <SelectItem value="supermarket">Supermercado</SelectItem>
                            <SelectItem value="distributor">Distribuidor</SelectItem>
                            <SelectItem value="catering">Catering</SelectItem>
                            <SelectItem value="other">Otro</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="product"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Producto *</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Seleccione producto" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="aceite-girasol">Aceite de Girasol</SelectItem>
                              <SelectItem value="aceite-soya">Aceite de Soya</SelectItem>
                              <SelectItem value="manteca">Manteca</SelectItem>
                              <SelectItem value="margarina">Margarina</SelectItem>
                              <SelectItem value="aceite-palma">Aceite de Palma</SelectItem>
                              <SelectItem value="papas-fritas">Papas Fritas</SelectItem>
                              <SelectItem value="chips">Chips/Papitas</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="quantity"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Cantidad (Unidades) *</FormLabel>
                          <FormControl>
                            <Input 
                              type="number" 
                              placeholder="10" 
                              {...field}
                              onChange={(e) => {
                                field.onChange(e);
                                handleQuantityChange(e.target.value);
                              }}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {paymentTerms && (
                    <div className="mt-4 p-4 bg-primary/10 border border-primary/20 rounded-lg">
                      <p className="text-sm font-medium">
                        <strong>Términos de Pago Aplicables:</strong> {paymentTerms}
                      </p>
                    </div>
                  )}
                </div>

                <FormField
                  control={form.control}
                  name="deliveryAddress"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Dirección de Entrega (si es diferente)</FormLabel>
                      <FormControl>
                        <Input placeholder="Dirección de entrega..." {...field} />
                      </FormControl>
                      <FormDescription>
                        Opcional: solo si es diferente a la dirección fiscal
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="notes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Notas Adicionales</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Cualquier información adicional relevante..."
                          className="resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="border-t border-border pt-6 mt-6">
                  <h3 className="font-semibold text-lg mb-4">Firma y Sello</h3>
                  <div className="bg-accent/10 border border-border rounded-lg p-4 mb-6">
                    <p className="text-sm text-muted-foreground mb-2">
                      <strong className="text-foreground">Importante:</strong> Este formulario debe ser firmado y sellado con el sello oficial de la empresa.
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Al imprimir este formulario, asegúrese de colocar el sello de la empresa en el espacio designado abajo.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="signedBy"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Firmado por (Nombre Completo) *</FormLabel>
                          <FormControl>
                            <Input placeholder="Nombre del representante legal" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="signedTitle"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Cargo *</FormLabel>
                          <FormControl>
                            <Input placeholder="Gerente General, Director, etc." {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="border-2 border-dashed border-border rounded-lg p-6 bg-accent/5">
                      <div className="text-center mb-3">
                        <p className="text-sm font-medium text-muted-foreground mb-2">ESPACIO PARA FIRMA</p>
                        <div className="border-b-2 border-foreground/20 w-full h-16 mb-2"></div>
                        <p className="text-xs text-muted-foreground">Firma del Representante Legal</p>
                      </div>
                    </div>

                    <div className="border-2 border-dashed border-border rounded-lg p-6 bg-accent/5">
                      <div className="text-center mb-3">
                        <p className="text-sm font-medium text-muted-foreground mb-2">ESPACIO PARA SELLO</p>
                        <div className="border-2 border-foreground/20 rounded-full w-24 h-24 mx-auto mb-2 flex items-center justify-center">
                          <p className="text-xs text-muted-foreground text-center">Coloque aquí<br/>el sello<br/>de la empresa</p>
                        </div>
                        <p className="text-xs text-muted-foreground">Sello Oficial de la Empresa</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 p-4 bg-primary/5 border border-primary/20 rounded-lg">
                    <p className="text-xs text-muted-foreground">
                      <strong className="text-foreground">Nota:</strong> Este documento tiene validez legal cuando está debidamente firmado y sellado. 
                      Se recomienda imprimir dos copias: una para Apidra Group P&E SRL y otra para sus registros.
                    </p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 pt-6">
                  <Button type="submit" size="lg" className="flex-1">
                    Enviar Solicitud
                  </Button>
                  <Button 
                    type="button" 
                    variant="outline" 
                    size="lg"
                    onClick={() => window.print()}
                    className="flex-1"
                  >
                    Imprimir Formulario
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyersForm;