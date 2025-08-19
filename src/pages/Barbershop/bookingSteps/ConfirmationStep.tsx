import { useNavigate } from "react-router-dom";
import { useBookingStore } from "../store/bookingStore";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Scissors, 
  User, 
  Calendar, 
  Clock, 
  Check, 
  ArrowLeft,
  MapPin,
  DollarSign
} from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

// Dados mockados para exibir nomes em vez de IDs
const SERVICES = [
  { id: "service1", name: "Corte de Cabelo", price: "R$ 50,00" },
  { id: "service2", name: "Barba", price: "R$ 30,00" },
  { id: "service3", name: "Corte e Barba", price: "R$ 75,00" }
];

const PROFESSIONALS = [
  { id: "emp1", name: "João Silva" },
  { id: "emp2", name: "Carlos Santos" },
  { id: "emp3", name: "Pedro Oliveira" }
];

export default function ConfirmationStep() {
  const { bookingData, reset, prevStep } = useBookingStore();
  const navigate = useNavigate();

  const handleConfirm = () => {
    console.log("Agendamento confirmado:", bookingData);
    
    // Simular sucesso no agendamento
    alert("🎉 Agendamento realizado com sucesso!\n\nVocê receberá uma confirmação por WhatsApp.");
    
    const barbershopId = bookingData.barbershopId;
    reset();
    
    if (barbershopId) {
      navigate(`/barbershop/${barbershopId}/barbershopDetails`);
    }
  };

  // Buscar dados para exibição
  const selectedService = SERVICES.find(s => s.id === bookingData.barbershopServiceId);
  const selectedProfessional = PROFESSIONALS.find(e => e.id === bookingData.employeeId);
  
  const formattedDate = bookingData.date
    ? format(new Date(bookingData.date), "EEEE, dd 'de' MMMM 'de' yyyy", { 
        locale: ptBR 
      })
    : 'N/A';

  return (
    <Card className="border-0 shadow-lg">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-xl">
          <Check className="h-5 w-5 text-primary" />
          Confirme seu Agendamento
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Resumo do Agendamento */}
        <div className="bg-muted/30 rounded-lg p-4 space-y-4">
          <h3 className="font-semibold text-sm text-primary uppercase tracking-wide">
            Resumo do Agendamento
          </h3>
          
          {/* Serviço */}
          <div className="flex items-center justify-between py-2">
            <div className="flex items-center gap-3">
              <Scissors className="w-5 h-5 text-primary" />
              <div>
                <p className="font-medium">{selectedService?.name || 'N/A'}</p>
                <p className="text-sm text-primary">Serviço</p>
              </div>
            </div>
            <div className="flex items-center gap-1 font-semibold text-primary">
              <DollarSign className="w-4 h-4" />
              {selectedService?.price || 'N/A'}
            </div>
          </div>
          
          <Separator />
          
          {/* Profissional */}
          <div className="flex items-center gap-3 py-2">
            <User className="w-5 h-5 text-primary" />
            <div>
              <p className="font-medium">{selectedProfessional?.name || 'N/A'}</p>
              <p className="text-sm text-primary">Profissional</p>
            </div>
          </div>
          
          <Separator />
          
          {/* Data */}
          <div className="flex items-center gap-3 py-2">
            <Calendar className="w-5 h-5 text-primary" />
            <div>
              <p className="font-medium capitalize">{formattedDate}</p>
              <p className="text-sm text-primary">Data</p>
            </div>
          </div>
          
          <Separator />
          
          {/* Horário */}
          <div className="flex items-center gap-3 py-2">
            <Clock className="w-5 h-5 text-primary" />
            <div>
              <p className="font-medium">{bookingData.time || 'N/A'}</p>
              <p className="text-sm text-primary">Horário</p>
            </div>
          </div>
        </div>

        {/* Informações Adicionais */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <MapPin className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="font-medium text-blue-900">Barbearia EstiloMestre</p>
              <p className="text-sm text-blue-700">
                Rua das Flores, 123 - Centro<br />
                São Paulo, SP - CEP: 01234-567
              </p>
            </div>
          </div>
        </div>

        {/* Botões de Ação */}
        <div className="flex flex-col gap-3 pt-2">
          <Button 
            onClick={handleConfirm} 
            className="w-full h-12 text-base font-semibold"
          >
            <Check className="w-5 h-5 mr-2" />
            Confirmar Agendamento
          </Button>
          
          <Button 
            onClick={prevStep} 
            variant="outline" 
            className="w-full h-12 text-base"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar
          </Button>
        </div>

        {/* Nota */}
        <p className="text-xs text-center text-secondary">
          Ao confirmar, você concorda com nossos termos de serviço.
          <br />
          Você pode cancelar até 2 horas antes do horário agendado.
        </p>
      </CardContent>
    </Card>
  );
}