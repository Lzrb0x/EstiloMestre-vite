import { useBookingStore } from "../store/bookingStore";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User, Star, ArrowLeft } from "lucide-react";

const PROFESSIONALS = [
  { 
    id: "emp1", 
    name: "João Silva", 
    specialty: "Especialista em cortes modernos",
    rating: 4.9,
    reviews: 127
  },
  { 
    id: "emp2", 
    name: "Carlos Santos", 
    specialty: "Expert em barbas",
    rating: 4.8,
    reviews: 89
  },
  { 
    id: "emp3", 
    name: "Pedro Oliveira", 
    specialty: "Cortes clássicos e estilosos",
    rating: 4.7,
    reviews: 156
  },
];

export default function ProfessionalStep() {
  const { nextStep, prevStep, updateBookingData, bookingData } = useBookingStore();

  const handleSelectProfessional = (employeeId: string) => {
    updateBookingData({ employeeId });
    nextStep();
  };

  return (
    <Card className="border-0 shadow-lg">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-xl">
          <User className="h-5 w-5 text-primary" />
          Escolha um Profissional
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-3">
          {PROFESSIONALS.map((professional) => (
            <Button
              key={professional.id}
              onClick={() => handleSelectProfessional(professional.id)}
              variant={
                bookingData.employeeId === professional.id 
                  ? "default" 
                  : "outline"
              }
              className="w-full h-auto p-4 text-left justify-start"
            >
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-base">
                    {professional.name}
                  </span>
                  <div className="flex items-center gap-1 text-sm">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium">{professional.rating}</span>
                    <span className="text-muted-foreground">
                      ({professional.reviews})
                    </span>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground text-left">
                  {professional.specialty}
                </p>
              </div>
            </Button>
          ))}
        </div>

        <Button 
          onClick={prevStep} 
          className="w-full mt-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar
        </Button>
      </CardContent>
    </Card>
  );
}
