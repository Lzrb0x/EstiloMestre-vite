import { useParams } from "react-router-dom";
import { useBookingStore } from "../store/bookingStore";
import { useEffect } from "react";
import ServiceStep from "./ServiceStep";
import ProfessionalStep from "./ProfessionalStep";
import DateStep from "./DateStep";
import ConfirmationStep from "./ConfirmationStep";
import { Progress } from "@/components/ui/progress";
import { Header } from "@/components/Header";

const BOOKING_STEPS = [
    { step: 1, title: "Serviço", subtitle: "Escolha o serviço desejado" },
    { step: 2, title: "Profissional", subtitle: "Selecione o profissional" },
    { step: 3, title: "Data", subtitle: "Escolha a data e seu horário" },
    { step: 4, title: "Confirmação", subtitle: "Confirme seu agendamento" },
] as const;

export default function BookingFlow() {
    const { barbershopId } = useParams<{ barbershopId: string }>();
    const { updateBookingData, currentStep } = useBookingStore();

    useEffect(() => {
        if (barbershopId) {
            updateBookingData({ barbershopId });
        }
    }, [barbershopId, updateBookingData]);

    const progressValue = (currentStep / BOOKING_STEPS.length) * 100;
    const currentStepInfo = BOOKING_STEPS[currentStep - 1];

    const renderCurrentStep = () => {
        const stepComponents = {
            1: ServiceStep,
            2: ProfessionalStep,
            3: DateStep,
            4: ConfirmationStep,
        } as const;

        const StepComponent = stepComponents[currentStep as keyof typeof stepComponents] || ServiceStep;
        return <StepComponent />;
    };

    return (
        <div className="min-h-screen cta-section">
            <Header />

            <div className="container mx-auto px-4 py-6 max-w-lg md:max-w-2xl">
                <div className="mb-6 space-y-4">
                    <div className="text-center space-y-1">
                        <h1 className="text-2xl md:text-3xl font-bold text-foreground">
                            {currentStepInfo.title}
                        </h1>
                    </div>
                    <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                        </div>
                        <Progress
                            value={progressValue}
                            className="h-2 bg-blue-200"
                        />
                    </div>
                </div>
                <div className="mt-10 animate-[slideUp_0.8s_ease-out_0.3s_forwards] opacity-0">
                    {renderCurrentStep()}
                </div>
            </div>
        </div>
    );
}