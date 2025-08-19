import { useBookingStore } from "../store/bookingStore";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Scissors, DollarSign, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const SERVICES = [
    {
        id: "service1",
        name: "Corte de Cabelo",
        price: "R$ 50,00",
        description: "Corte moderno e estiloso",
        duration: "45 min"
    },
    {
        id: "service2",
        name: "Barba",
        price: "R$ 30,00",
        description: "Aparar e modelar a barba",
        duration: "30 min"
    },
    {
        id: "service3",
        name: "Corte e Barba",
        price: "R$ 75,00",
        description: "Pacote completo",
        duration: "75 min"
    },
];

export default function ServiceStep() {
    const { nextStep, reset, updateBookingData, bookingData } = useBookingStore();
    const navigate = useNavigate();

    const handleSelectService = (serviceId: string) => {
        updateBookingData({ barbershopServiceId: serviceId });
        nextStep();
    };

    const handleCancel = () => {
        const barbershopId = bookingData.barbershopId;
        reset();

        if (barbershopId) {
            navigate(`/barbershop/${barbershopId}/barbershopDetails`);
        }
    }

    return (
        <Card className="border-0 shadow-lg">
            <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-xl">
                    <Scissors className="h-5 w-5 text-primary" />
                    Escolha um Serviço
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
                {SERVICES.map((service) => (
                    <Button
                        key={service.id}
                        onClick={() => handleSelectService(service.id)}
                        variant={
                            bookingData.barbershopServiceId === service.id
                                ? "default"
                                : "outline"
                        }
                        className="w-full h-auto p-4 text-left justify-start"
                    >
                        <div className="flex-1 space-y-1">
                            <div className="flex items-center justify-between">
                                <span className="font-semibold text-base">
                                    {service.name}
                                </span>
                                <div className="flex items-center gap-1 text-primary font-bold">
                                    <DollarSign className="h-4 w-4" />
                                    {service.price}
                                </div>
                            </div>
                            <div className="flex items-center justify-between text-sm text-muted-foreground">
                                <span>{service.description}</span>
                                <span>{service.duration}</span>
                            </div>
                        </div>
                    </Button>
                ))}

                <Button
                    onClick={handleCancel}
                    className="w-full mt-6"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Voltar
                </Button>
            </CardContent>
        </Card>
    );
}
