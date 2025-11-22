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
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { PartialLoginDialog } from "@/components/auth/PartialLoginDialog";

export default function ConfirmationStep() {
  const { bookingData, reset, prevStep } = useBookingStore();
  const navigate = useNavigate();
  const { isAuthenticated, getAccessToken } = useAuth();
  const [showLoginDialog, setShowLoginDialog] = useState(false);

  const handleConfirm = async () => {
    // Verificar se o usuário está autenticado
    if (!isAuthenticated) {
      setShowLoginDialog(true);
      return;
    }

    // Processar o agendamento com o token
    await processBooking();
  };

  const processBooking = async () => {
    try {
      const token = getAccessToken();
      
      
      if (!token) {
        throw new Error('Token de autenticação não encontrado');
      }

      // Validar dados obrigatórios
      if (!bookingData.barbershopId || !bookingData.barbershopServiceId || 
          !bookingData.employeeId || !bookingData.date || !bookingData.time) {
        throw new Error('Dados incompletos para realizar o agendamento');
      }

      // Preparar dados para envio
      const bookingPayload = {
        barbershopId: parseInt(bookingData.barbershopId),
        barbershopServiceId: parseInt(bookingData.barbershopServiceId),
        employeeId: parseInt(bookingData.employeeId),
        date: bookingData.date,
        startTime: bookingData.time
      };


      // Fazer requisição para criar agendamento
      const response = await fetch('https://kena-ungrovelling-amphiboly.ngrok-free.dev/booking', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          'ngrok-skip-browser-warning': 'true'
        },
        body: JSON.stringify(bookingPayload)
      });

      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Erro do servidor:', errorText);
        
        let errorData;
        try {
          errorData = JSON.parse(errorText);
        } catch {
          errorData = { message: errorText };
        }
        
        throw new Error(errorData?.message || `Falha ao criar agendamento (Status: ${response.status})`);
      }

      const result = await response.json();
      console.log('Agendamento criado:', result);
      
      alert("🎉 Agendamento realizado com sucesso!\n\nVocê receberá uma confirmação por WhatsApp.");
      
      const barbershopId = bookingData.barbershopId;
      reset();
      
      if (barbershopId) {
        navigate(`/barbershop/${barbershopId}/barbershopDetails`);
      }
    } catch (error) {
      console.error('Erro ao processar agendamento:', error);
      const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
      alert(`Erro ao processar agendamento: ${errorMessage}\n\nPor favor, tente novamente.`);
    }
  };

  const handleLoginSuccess = (token: string) => {
    // Após login bem-sucedido, processar o agendamento com o token recebido
    processBookingWithToken(token);
  };

  const processBookingWithToken = async (token: string) => {
    try {
      
      // Validar dados obrigatórios
      if (!bookingData.barbershopId || !bookingData.barbershopServiceId || 
          !bookingData.employeeId || !bookingData.date || !bookingData.time) {
        throw new Error('Dados incompletos para realizar o agendamento');
      }

      // Preparar dados para envio
      const bookingPayload = {
        barbershopId: parseInt(bookingData.barbershopId),
        barbershopServiceId: parseInt(bookingData.barbershopServiceId),
        employeeId: parseInt(bookingData.employeeId),
        date: bookingData.date,
        startTime: bookingData.time
      };


      // Fazer requisição para criar agendamento
      const response = await fetch('https://kena-ungrovelling-amphiboly.ngrok-free.dev/booking', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          'ngrok-skip-browser-warning': 'true'
        },
        body: JSON.stringify(bookingPayload)
      });

      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Erro do servidor:', errorText);
        
        let errorData;
        try {
          errorData = JSON.parse(errorText);
        } catch {
          errorData = { message: errorText };
        }
        
        throw new Error(errorData?.message || `Falha ao criar agendamento (Status: ${response.status})`);
      }

      const result = await response.json();
      console.log('Agendamento criado:', result);
      
      alert("🎉 Agendamento realizado com sucesso!\n\nVocê receberá uma confirmação por WhatsApp.");
      
      const barbershopId = bookingData.barbershopId;
      reset();
      
      if (barbershopId) {
        navigate(`/barbershop/${barbershopId}/barbershopDetails`);
      }
    } catch (error) {
      console.error('Erro ao processar agendamento:', error);
      const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
      alert(`Erro ao processar agendamento: ${errorMessage}\n\nPor favor, tente novamente.`);
    }
  };

  // Buscar dados para exibição
  const selectedServiceDescription = bookingData.barbershopServiceDescription;
  const selectedServicePrice = bookingData.barbershopServicePrice;
  const selectedProfessionalName = bookingData.employeeName;
  const selectedBarbershopName = bookingData.barbershopName;
  const selectedBarbershopAddress = bookingData.barbershopAddress;


  const formattedDate = bookingData.date
    ? format(new Date(`${bookingData.date}T00:00:00`), "EEEE, dd 'de' MMMM 'de' yyyy", { 
        locale: ptBR 
      })
    : 'N/A';

  return (
    <>
      <PartialLoginDialog 
        open={showLoginDialog} 
        onOpenChange={setShowLoginDialog}
        onSuccess={handleLoginSuccess}
      />
      <Card className="border-0 shadow-lg">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-xl">
          <Check className="h-5 w-5 text-primary" />
          Confirme seu Agendamento
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="bg-muted/30 rounded-lg p-4 space-y-4">
          <h3 className="font-semibold text-sm text-primary uppercase tracking-wide">
            Resumo do Agendamento
          </h3>
          
          <div className="flex items-center justify-between py-2">
            <div className="flex items-center gap-3">
              <Scissors className="w-5 h-5 text-primary" />
              <div>
                <p className="text-sm text-primary">Serviço</p>
                <p className="font-medium">{selectedServiceDescription || 'N/A'}</p>
              </div>
            </div>
            <div className="flex items-center gap-1 font-semibold text-primary">
              <DollarSign className="w-4 h-4" />
              {selectedServicePrice !== null ? selectedServicePrice.toFixed(2) : 'N/A'}
            </div>
          </div>
          
          <Separator />
          
          <div className="flex items-center gap-3 py-2">
            <User className="w-5 h-5 text-primary" />
            <div>
              <p className="text-sm text-primary">Profissional</p>
              <p className="font-medium">{selectedProfessionalName || 'N/A'}</p>
            </div>
          </div>
          
          <Separator />
          
          <div className="flex items-center gap-3 py-2">
            <Calendar className="w-5 h-5 text-primary" />
            <div>
              <p className="text-sm text-primary">Data</p>
              <p className="font-medium capitalize">{formattedDate}</p>
            </div>
          </div>
          
          <Separator />
          
          <div className="flex items-center gap-3 py-2">
            <Clock className="w-5 h-5 text-primary" />
            <div>
              <p className="text-sm text-primary">Horário</p>
              <p className="font-medium">{bookingData.time || 'N/A'}</p>
            </div>
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <MapPin className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="font-medium text-blue-900">{selectedBarbershopName || 'N/A'}</p>
              <p className="text-sm text-blue-700">
                {selectedBarbershopAddress || 'N/A'}
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
    </>
  );
}