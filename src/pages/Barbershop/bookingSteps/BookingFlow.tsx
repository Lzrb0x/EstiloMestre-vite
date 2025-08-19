import { useParams } from "react-router-dom";
import { useBookingStore } from "../store/bookingStore";
import { useEffect } from "react";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import Step4 from "./Step4";
import ConfirmationStep from "./ConfirmationStep";

// Componentes UI
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Header } from "@/components/Header";

const steps = [
    { step: 1, title: "Serviço", description: "Escolha o que você precisa." },
    { step: 2, title: "Profissional", description: "Selecione o seu barbeiro preferido." },
    { step: 3, title: "Data", description: "Encontre o melhor dia para você." },
    { step: 4, title: "Horário", description: "Escolha o horário ideal." },
    { step: 5, title: "Confirmação", description: "Revise e confirme seu agendamento." },
];

export default function BookingFlow() {
    const { barbershopId } = useParams<{ barbershopId: string }>();
    const { updateBookingData, currentStep } = useBookingStore();

    useEffect(() => {
        if (barbershopId) {
            updateBookingData({ barbershopId });
        }
    }, [barbershopId, updateBookingData]);

    const progressValue = (currentStep / steps.length) * 100;
    const currentStepInfo = steps[currentStep - 1];

    const renderStep = () => {
        switch (currentStep) {
            case 1:
                return <Step1 />;
            case 2:
                return <Step2 />;
            case 3:
                return <Step3 />;
            case 4:
                return <Step4 />;
            case 5:
                return <ConfirmationStep />;
            default:
                return <Step1 />;
        }
    };

    return (
        <>
            <Header />
            <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 sm:p-6 lg:p-8">
                <Card className="w-full max-w-2xl shadow-lg">
                    <CardHeader>
                        <div className="mb-4">
                            <p className="text-sm font-medium text-primary mb-2">
                                Etapa {currentStep} de {steps.length}
                            </p>
                            <Progress value={progressValue} className="w-full" />
                        </div>
                        <CardTitle className="text-3xl font-bold">{currentStepInfo.title}</CardTitle>
                        <CardDescription>{currentStepInfo.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {renderStep()}
                    </CardContent>
                </Card>
            </div>
        </>
    );
}