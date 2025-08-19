import { useBookingStore } from "../store/bookingStore";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Loader2 } from "lucide-react";

// Simula uma chamada de API
const fetchAvailableDates = async () => {
  return new Promise<string[]>((resolve) => {
    setTimeout(() => {
      // Usando datas válidas a partir da data atual
      const today = new Date();
      const dates = [
        new Date(today.setDate(today.getDate() + 2)).toISOString().split('T')[0],
        new Date(today.setDate(today.getDate() + 1)).toISOString().split('T')[0],
        new Date(today.setDate(today.getDate() + 1)).toISOString().split('T')[0],
      ];
      resolve(dates);
    }, 500);
  });
};

export default function Step3() {
  const { nextStep, prevStep, updateBookingData, bookingData } = useBookingStore();
  const [dates, setDates] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDates = async () => {
      const availableDates = await fetchAvailableDates();
      setDates(availableDates);
      setLoading(false);
    };
    loadDates();
  }, []);

  const handleSelectDate = (date: string) => {
    updateBookingData({ date });
    nextStep();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-40">
        <Loader2 className="w-8 h-8 mr-2 animate-spin text-primary" />
        <span className="text-muted-foreground">Carregando datas...</span>
      </div>
    );
  }

  return (
    <div>
      <div className="space-y-4">
        {dates.map((date) => (
          <Button
            key={date}
            onClick={() => handleSelectDate(date)}
            variant={bookingData.date === date ? "default" : "outline"}
            className="w-full justify-start p-4 text-base"
          >
            {new Date(date).toLocaleDateString("pt-BR", { 
              weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' 
            })}
          </Button>
        ))}
      </div>

      <Button onClick={prevStep} variant="ghost" className="mt-8">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Voltar
      </Button>
    </div>
  );
}