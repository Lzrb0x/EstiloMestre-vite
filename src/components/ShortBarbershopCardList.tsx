import { MapPin, Clock, Calendar, ChevronRight } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { LoadingIcon } from "./LoadingIcon";

type Barber = {
  id: bigint;
  name: string;
  address: string;
  distance?: string;
  nextAvailableTime?: string;
  specialties?: string[];
};

type FetchBarbershopsResponse = {
  barbershops: Barber[];
};


//the api must receive an optional params to limit the amount of returned barbershops
// Max will be 6
// Example: http://localhost:5008/clientdashboard?limit=6
const ShortBarbershopCardList = () => {

  const { data, error, isLoading } = useQuery<FetchBarbershopsResponse, Error>({
    queryKey: ["barbershops"],
    queryFn: async ({ signal }) => {
      const response = await fetch("http://localhost:5008/clientdashboard", { signal });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    },
  });

  if (isLoading) {
    return (
      <LoadingIcon />
    );
  }

  if (error) {
    return (
      <div className="text-red-500 text-center mt-4">
        Ocorreu um erro: {error.message}
      </div>
    );
  }

  if (!data || data.barbershops.length === 0) {
    return (
      <div className="text-center mt-4">
        Nenhuma barbearia encontrada.
      </div>
    );
  }


  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
      {data.barbershops.map((barber, index) => (
        <div
          key={barber.name}
          className="animate-fade-in-slide-up bg-slate-50 hover:bg-white border border-slate-200 rounded-xl p-6 transition-all duration-300 hover:shadow-lg group"
          style={{ animationDelay: `${index * 600}ms` }}
        >
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-lg font-semibold text-secondary mb-1">{barber.name}</h3>
              <p className="text-popover text-sm">{barber.address}</p>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-1 text-secondary text-sm mb-1">
                <MapPin size={14} />
                {"1.2km"}
              </div>
              <div className="flex items-center gap-1 text-green-600 text-sm font-medium">
                <Clock size={14} />
                {"10:00"}
              </div>
            </div>
          </div>
          <Link to={`/barbershop/${barber.id}`}>
            <Button className="w-full p-5">
              <Calendar size={18} />
              <span>Ver Horários</span>
              <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      ))}
    </div>
  );
}

export default ShortBarbershopCardList;