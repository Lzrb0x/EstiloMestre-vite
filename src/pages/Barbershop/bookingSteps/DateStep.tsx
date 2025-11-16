import { useBookingStore } from "../store/bookingStore";
import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Calendar as CalendarIcon, ArrowLeft, Loader2 } from "lucide-react";
import { format, addDays, isBefore, startOfDay } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useQuery } from "@tanstack/react-query";

interface SlotDto {
  time: string;
}

interface ResponseEmployeeSlotsJson {
  slots: SlotDto[];
  isDayOff: boolean;
}

export default function DateStep() {
  const { nextStep, prevStep, updateBookingData, bookingData } = useBookingStore();

  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    bookingData.date ? startOfDay(new Date(`${bookingData.date}T00:00:00`)) : undefined
  );
  const [selectedTime, setSelectedTime] = useState<string | null>(bookingData.time || null);

  const today = startOfDay(new Date());
  const maxDate = addDays(today, 60);

  const {
    data: availableTimes = [],
    isLoading: isLoadingTimes,
  } = useQuery<string[]>(
    {
      queryKey: ["availableTimes", selectedDate, bookingData.barbershopServiceId],
      queryFn: async ({ signal }: { signal?: AbortSignal }) => {
        if (!selectedDate || !bookingData.barbershopServiceId) return [];

        const formattedDate = format(selectedDate, "yyyy/MM/dd");
        const response = await fetch(
          `http://localhost:5008/barbershop/1/employees/1/available-slots?date=${formattedDate}&barbershopServiceId=${bookingData.barbershopServiceId}`,
          { signal }
        );

        if (!response.ok) {
          throw new Error("Erro ao buscar horários disponíveis");
        }

        const data: ResponseEmployeeSlotsJson = await response.json();

        if (data.isDayOff) {
          return []; // Retorna vazio se for um dia de folga
        }

        return data.slots.map((slot) => slot.time.slice(0, 5)); 
      },
      enabled: !!selectedDate && !!bookingData.barbershopServiceId,
    }
  );

  const handleDateSelect = useCallback(
    (date: Date | undefined) => {
      if (!date) return;

      setSelectedDate(date);
      setSelectedTime(null); // Limpa a hora ao selecionar nova data
      updateBookingData({
        date: format(startOfDay(date), "yyyy-MM-dd"), // Garante que a data seja no início do dia
        time: null,
      });
    },
    [updateBookingData]
  );

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
              {!isLoadingTimes && Array.isArray(availableTimes) && availableTimes.length > 0 && (
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                  {availableTimes.map((time: string) => (
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
              {!isLoadingTimes && Array.isArray(availableTimes) && availableTimes.length === 0 && (
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
