import { useBookingStore } from "../store/bookingStore";
import { Button } from "@/components/ui/button";

const services = [
  { id: "service1", name: "Corte de Cabelo", price: "R$ 50,00" },
  { id: "service2", name: "Barba", price: "R$ 30,00" },
  { id: "service3", name: "Corte e Barba", price: "R$ 75,00" },
];

export default function Step1() {
  const { nextStep, updateBookingData, bookingData } = useBookingStore();

  const handleSelectService = (serviceId: string) => {
    updateBookingData({ barbershopServiceId: serviceId });
    nextStep();
  };

  return (
    <div className="space-y-4">
      {services.map((service) => (
        <Button
          key={service.id}
          onClick={() => handleSelectService(service.id)}
          variant={
            bookingData.barbershopServiceId === service.id ? "default" : "outline"
          }
          className="w-full h-auto justify-between p-4 text-base"
        >
          <span className="font-semibold">{service.name}</span>
          <span className="font-normal">{service.price}</span>
        </Button>
      ))}
    </div>
  );
}