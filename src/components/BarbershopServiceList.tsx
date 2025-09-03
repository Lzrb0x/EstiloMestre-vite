import { Loader2, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface BarbershopService {
    id: string;
    price: string;
    description: string;
    duration: string;
}

interface ServiceListProps {
    services?: BarbershopService[];
    isLoading: boolean;
    isError: boolean;
    error: Error | null;
    selectedServiceId?: string;
    onSelectService: (serviceId: string) => void;
}

export function BarbershopServiceList({
    services,
    isLoading,
    isError,
    error,
    selectedServiceId,
    onSelectService,
}: ServiceListProps) {
    if (isLoading) {
        return (
            <div className="flex justify-center items-center py-10">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    if (isError) {
        return (
            <p className="text-red-500 text-center">
                {error?.message || 'Ocorreu um erro desconhecido.'}
            </p>
        );
    }

    if (!services || services.length === 0) {
        return <p className="text-muted-foreground text-center">Nenhum serviço encontrado.</p>;
    }

    return (
        <div className="space-y-3">
            {services.map((service) => (
                <Button
                    key={service.id}
                    onClick={() => onSelectService(service.id)}
                    variant={selectedServiceId === service.id ? "default" : "outline"}
                    className="w-full h-auto p-4 text-left justify-start"
                >
                    <div className="flex-1 space-y-1">
                        <div className="flex items-center justify-between">
                            <span className="font-semibold text-base">
                                {service.description}
                            </span>
                            <div className="flex items-end font-bold">
                                <DollarSign className="h-4 w-4" />
                                {service.price}
                            </div>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                            <span>{service.duration} min</span>
                        </div>
                    </div>
                </Button>
            ))}
        </div>
    );
}