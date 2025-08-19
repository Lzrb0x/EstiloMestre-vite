import { useNavigate } from "react-router-dom";
import { useBookingStore } from "../store/bookingStore";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Scissors, User, Calendar, Clock, Check } from "lucide-react";

// Dados mockados para exibir nomes em vez de IDs
const services = [ { id: "service1", name: "Corte de Cabelo" }, { id: "service2", name: "Barba" }, { id: "service3", name: "Corte e Barba" }];
const employees = [ { id: "emp1", name: "João" }, { id: "emp2", name: "Carlos" }, { id: "emp3", name: "Pedro" }];

export default function ConfirmationStep() {
  const { bookingData, reset, prevStep } = useBookingStore();
  const navigate = useNavigate();

  const handleConfirm = () => {
    console.log("Agendamento confirmado:", bookingData);
    alert("Agendamento realizado com sucesso!");
    const barbershopId = bookingData.barbershopId;
    reset();
    if (barbershopId) {
      navigate(`/barbershop/${barbershopId}/barbershopDetails`);
    }
  };

  // Encontrando os nomes para exibição (em um app real, viria do estado ou API)
  const serviceName = services.find(s => s.id === bookingData.barbershopServiceId)?.name || 'N/A';
  const employeeName = employees.find(e => e.id === bookingData.employeeId)?.name || 'N/A';
  const formattedDate = bookingData.date 
    ? new Date(bookingData.date).toLocaleDateString("pt-BR", { weekday: 'long', day: '2-digit', month: 'long', timeZone: 'UTC' }) 
    : 'N/A';

  return (
    <div>
      <div className="border rounded-lg p-6 bg-slate-50 space-y-4">
        <div className="flex items-center">
          <Scissors className="w-5 h-5 mr-4 text-primary" />
          <div className="flex justify-between w-full">
            <span className="text-muted-foreground">Serviço:</span>
            <span className="font-semibold">{serviceName}</span>
          </div>
        </div>
        <Separator />
        <div className="flex items-center">
          <User className="w-5 h-5 mr-4 text-primary" />
          <div className="flex justify-between w-full">
            <span className="text-muted-foreground">Profissional:</span>
            <span className="font-semibold">{employeeName}</span>
          </div>
        </div>
        <Separator />
        <div className="flex items-center">
          <Calendar className="w-5 h-5 mr-4 text-primary" />
          <div className="flex justify-between w-full">
            <span className="text-muted-foreground">Data:</span>
            <span className="font-semibold">{formattedDate}</span>
          </div>
        </div>
        <Separator />
        <div className="flex items-center">
          <Clock className="w-5 h-5 mr-4 text-primary" />
          <div className="flex justify-between w-full">
            <span className="text-muted-foreground">Horário:</span>
            <span className="font-semibold">{bookingData.startTime}</span>
          </div>
        </div>
      </div>

      <div className="mt-8 flex flex-col sm:flex-row justify-end gap-3">
        <Button onClick={prevStep} variant="outline" className="w-full sm:w-auto">
          Voltar
        </Button>
        <Button onClick={handleConfirm} className="w-full sm:w-auto">
          <Check className="w-4 h-4 mr-2" />
          Confirmar Agendamento
        </Button>
      </div>
    </div>
  );
}