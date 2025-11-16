// src/components/booking/ServiceStep.tsx

import { useBookingStore } from "../store/bookingStore";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Scissors, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { BarbershopServiceList, type BarbershopService } from "../../../components/BarbershopServiceList";

interface ApiBarbershopService {
    barbershopServiceId: number;
    price: number;
    duration: string;
    descriptionOverride: string;
    serviceId: number;
}

export default function ServiceStep() {
    const { nextStep, reset, updateBookingData, bookingData } = useBookingStore();
    const navigate = useNavigate();
    const barbershopId = bookingData.barbershopId;

    const {
        data: services,
        isLoading,
        isError,
        error
    } = useQuery<BarbershopService[], Error>({
        queryKey: ['barbershopServices', barbershopId],
        queryFn: async ({ signal }) => {
            const response = await fetch(`http://localhost:5008/barbershop/${barbershopId}/barbershop-services`, { signal });
            if (!response.ok) {
                throw new Error('Erro ao buscar os serviços.');
            }
            const data: { barbershopServices: ApiBarbershopService[] } = await response.json();
            return data.barbershopServices.map(service => ({
                id: String(service.barbershopServiceId),
                price: String(service.price),
                description: service.descriptionOverride,
                duration: service.duration,
            }));
        },
        enabled: !!barbershopId,
    });

    const handleSelectService = (serviceId: string, serviceDescription: string, servicePrice: number) => {
        updateBookingData({
            barbershopServiceId: serviceId,
            barbershopServiceDescription: serviceDescription,
            barbershopServicePrice: servicePrice,
        });
        nextStep();
    };

    const handleCancel = () => {
        reset();
        if (barbershopId) {
            navigate(`/barbershop/${barbershopId}/barbershopDetails`);
        }
    };

    return (
        <Card className="border-0 shadow-lg">
            <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-xl">
                    <Scissors className="h-5 w-5 text-primary" />
                    Escolha um Serviço
                </CardTitle>
            </CardHeader>
            <CardContent>
                <BarbershopServiceList
                    isLoading={isLoading}
                    isError={isError}
                    error={error}
                    services={services}
                    selectedServiceId={bookingData.barbershopServiceId || undefined}
                    onSelectService={(service) => {
                        handleSelectService(service.id, service.description, parseFloat(service.price));
                    }}
                />
                <Button onClick={handleCancel} className="w-full mt-6">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Voltar
                </Button>
            </CardContent>
        </Card>
    );
}