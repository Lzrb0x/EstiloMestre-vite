import { useBookingStore } from "../store/bookingStore";
import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Calendar as CalendarIcon, ArrowLeft, Loader2 } from "lucide-react";
import { format, addDays, isBefore, startOfDay } from "date-fns";
import { ptBR } from "date-fns/locale";

// Função para simular a busca de horários na API
const fetchAvailableTimes = async (date: Date): Promise<string[]> => {
  console.log("Buscando horários para:", format(date, "yyyy-MM-dd"));
  return new Promise((resolve) => {
    setTimeout(() => {
      // Simulação de horários baseada no dia da semana
      const dayOfWeek = date.getDay();
      if (dayOfWeek === 0) { // Domingo
        resolve([]);
      } else if (dayOfWeek === 6) { // Sábado
        resolve(["09:00", "10:00", "11:00", "12:00", "13:00", "14:00"]);
      } else { // Dias de semana
        resolve(["09:00", "10:00", "11:00", "12:00", "14:00", "15:00", "16:00", "17:00", "18:00"]);
      }
    }, 1000); // Simula 1 segundo de delay da rede
  });
};

export default function DateStep() {
  const { nextStep, prevStep, updateBookingData, bookingData } = useBookingStore();
  
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    bookingData.date ? new Date(bookingData.date) : undefined
  );
  const [availableTimes, setAvailableTimes] = useState<string[]>([]);
  const [selectedTime, setSelectedTime] = useState<string | null>(bookingData.time || null);
  const [isLoadingTimes, setIsLoadingTimes] = useState(false);

  const today = startOfDay(new Date());
  const maxDate = addDays(today, 60);

  const handleDateSelect = useCallback(async (date: Date | undefined, isInitialLoad = false) => {
    if (!date) return;

    setSelectedDate(date);
    setIsLoadingTimes(true);
    setAvailableTimes([]);
    if (!isInitialLoad) {
      setSelectedTime(null); // Limpa a hora ao selecionar nova data
      updateBookingData({ time: null });
    }

    const formattedDate = format(date, 'yyyy-MM-dd');
    updateBookingData({ date: formattedDate });

    const times = await fetchAvailableTimes(date);
    setAvailableTimes(times);
    setIsLoadingTimes(false);
  }, [updateBookingData]);

  // Efeito para buscar horários se uma data já estiver selecionada ao montar o componente
  useEffect(() => {
    if (selectedDate) {
      handleDateSelect(selectedDate, true);
    }
  }, [selectedDate, handleDateSelect]);

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
    updateBookingData({ time });
  };

  const handleContinue = () => {
    if (selectedDate && selectedTime) {
      nextStep();
    }
  };

  const isDateDisabled = (date: Date) => {
    return isBefore(date, today) || date > maxDate;
  };

  return (
    <Card className="border-0 shadow-lg">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-xl">
          <CalendarIcon className="h-5 w-5 text-primary" />
          Escolha Data e Horário
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Calendar Component */}
          <div className="flex-1">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={(date) => handleDateSelect(date)}
              disabled={isDateDisabled}
              locale={ptBR}
              className="rounded-md border border-border w-full" 
              classNames={{
                month: "space-y-4 w-full flex flex-col",
                day: "h-10 w-10 p-0 font-normal aria-selected:opacity-100 mx-auto text-base", 
                day_today: "bg-accent text-accent-foreground",
              }}
            />
          </div>

          {/* Available Times */}
          {selectedDate && (
            <div className="flex-1 space-y-4">
              <div className="text-center font-semibold text-lg border-b pb-2">
                {format(selectedDate, "EEEE, dd 'de' MMMM", { locale: ptBR })}
              </div>
              {isLoadingTimes && (
                <div className="flex items-center justify-center h-32">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
              )}
              {!isLoadingTimes && availableTimes.length > 0 && (
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                  {availableTimes.map((time) => (
                    <Button
                      key={time}
                      variant={selectedTime === time ? "default" : "outline"}
                      onClick={() => handleTimeSelect(time)}
                      className="w-full"
                    >
                      {time}
                    </Button>
                  ))}
                </div>
              )}
              {!isLoadingTimes && availableTimes.length === 0 && (
                <div className="text-center text-destructive py-4">
                  Nenhum horário disponível para esta data.
                </div>
              )}
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-3 pt-4 border-t">
          <Button 
            onClick={handleContinue}
            disabled={!selectedDate || !selectedTime || isLoadingTimes}
            className="w-full"
          >
            Continuar
          </Button>
          
          <Button 
            onClick={prevStep} 
            variant="ghost" 
            className="w-full"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
