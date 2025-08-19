import { useBookingStore } from "../store/bookingStore";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Loader2 } from "lucide-react";

// Simula uma chamada de API
const fetchAvailableTimes = async (date: string | null) => {
  console.log("Buscando horários para:", date);
  return new Promise<string[]>((resolve) => {
    setTimeout(() => {
      resolve(["09:00", "10:00", "11:00", "14:00", "15:00", "16:00"]);
    }, 500);
  });
};

export default function Step4() {
  const { nextStep, prevStep, updateBookingData, bookingData } = useBookingStore();
  const [times, setTimes] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (bookingData.date) {
      const loadTimes = async () => {
        setLoading(true);
        const availableTimes = await fetchAvailableTimes(bookingData.date);
        setTimes(availableTimes);
        setLoading(false);
      };
      loadTimes();
    }
  }, [bookingData.date]);

  const handleSelectTime = (time: string) => {
    updateBookingData({ startTime: time });
    nextStep();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-40">
        <Loader2 className="w-8 h-8 mr-2 animate-spin text-primary" />
        <span className="text-muted-foreground">Carregando horários...</span>
      </div>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
        {times.map((time) => (
          <Button
            key={time}
            onClick={() => handleSelectTime(time)}
            variant={bookingData.startTime === time ? "default" : "outline"}
          >
            {time}
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