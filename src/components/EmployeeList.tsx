import { Loader2 } from "lucide-react";
import { Button } from "./ui/button";



export interface Employee {
    id: string;
    barbershopId: string;
}

interface EmployeeListProps {
    employees?: Employee[];
    isLoading: boolean;
    isError: boolean;
    error?: Error | null;
    selectedEmployeeId?: string;
    onSelectEmployee: (employeeId: string) => void;
}



export function EmployeeList({
    employees,
    isLoading,
    isError,
    error,
    selectedEmployeeId,
    onSelectEmployee
}: EmployeeListProps) {
    if (isLoading) {
        return (
            <div className="flex justify-center items-center py-10">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        )
    }

    if (isError) {
        return (
            <p className="text-red-500 text-center">
                {error?.message || 'Ocorreu um erro desconhecido.'}
            </p>
        );
    }

    if (!employees || employees.length === 0) {
        return (
            <p className="text-destructive text-center">
                Nenhum funcionário encontrado.
            </p>
        );
    }


    return (
        <div className="space-y-3">
            {employees.map((employee) => (
                <Button
                    key={employee.id}
                    onClick={() => onSelectEmployee(employee.id)}
                    variant={selectedEmployeeId === employee.id ? "default" : "outline"}
                    className="w-full h-auto p-4 text-left justify-start"
                >
                    <div className="flex-1 space-y-1">
                        <div className="flex items-center justify-between">
                            <span className="font-semibold text-base">
                                id do employee {employee.id}
                            </span>
                            <div className="flex items-end font-bold">
                                id da barbearia {employee.barbershopId}
                            </div>
                        </div>
                    </div>
                </Button>
            ))}
        </div>
    );


}