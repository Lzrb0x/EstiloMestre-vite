import { EmployeeList, type Employee } from "@/components/EmployeeList";
import { useBookingStore } from "../store/bookingStore";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { User, ArrowLeft } from "lucide-react";

interface ApiEmployee {
  id: number; 
  userId: number;
  name: string;
  barberShopId: number;
}


export default function ProfessionalStep() {
  const { nextStep, prevStep, updateBookingData, bookingData } = useBookingStore();

  const barbershopId = bookingData.barbershopId;

  const {
    data: employees,
    isLoading,
    isError,
    error
  } = useQuery<Employee[], Error>({
    queryKey: ["employees", barbershopId, bookingData.barbershopServiceId],
    queryFn: async ({ signal }) => {
      const serviceId = bookingData.barbershopServiceId;
      if (!serviceId) {
        throw new Error("ID do serviço não disponível");
      }

      const response = await fetch(
        `https://kena-ungrovelling-amphiboly.ngrok-free.dev/barbershop/${barbershopId}/employee-by-service?barbershopServiceId=${serviceId}`,
        { 
          signal,
          headers: {
            'ngrok-skip-browser-warning': 'true'
          }
        }
      );

      if (!response.ok) {
        throw new Error("Falha ao buscar os profissionais");
      }
      const data: { employees: ApiEmployee[] } = await response.json();
      return data.employees.map((employee) => ({
        id: String(employee.id),
        name: employee.name,
        barbershopId: String(employee.barberShopId)
      }));
    },
    enabled: !!barbershopId && !!bookingData.barbershopServiceId,
  });

  const handleSelectProfessional = (employeeId: string, employeeName: string) => {
    updateBookingData({ 
        employeeId, 
        employeeName // Adicionando o nome do profissional ao estado
    });
    nextStep();
  };

  const handleCancel = () => {
    prevStep();
  };

  return (
    <Card className="border-0 shadow-lg">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-xl">
          <User className="h-5 w-5 text-primary" />
          Escolha um Profissional
        </CardTitle>
      </CardHeader>
      <CardContent>
        <EmployeeList
          employees={employees}
          isLoading={isLoading}
          isError={isError}
          error={error}
          selectedEmployeeId={bookingData.employeeId || undefined}
          onSelectEmployee={(employeeId) => {
            const selectedEmployee = employees?.find(employee => employee.id === employeeId);
            handleSelectProfessional(employeeId, selectedEmployee?.name || '');
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
