import { useBookingStore } from "../store/bookingStore";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const employees = [
  { id: "emp1", name: "João" },
  { id: "emp2", name: "Carlos" },
  { id: "emp3", name: "Pedro" },
];

export default function Step2() {
  const { nextStep, prevStep, updateBookingData, bookingData } = useBookingStore();

  const handleSelectEmployee = (employeeId: string) => {
    updateBookingData({ employeeId });
    nextStep();
  };

  return (
    <div>
      <div className="space-y-4">
        {employees.map((employee) => (
          <Button
            key={employee.id}
            onClick={() => handleSelectEmployee(employee.id)}
            variant={bookingData.employeeId === employee.id ? "default" : "outline"}
            className="w-full justify-start p-4 text-base"
          >
            {employee.name}
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