import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Link, useParams } from "react-router-dom";
import { useBookingStore } from "./store/bookingStore";
import { useEffect, useState } from "react";
import { BarberIcon } from "@/components/BarberIcon";

export default function BarbershopDetails() {
  const { barbershopId } = useParams<{ barbershopId: string }>();
  const { bookingData, updateBookingData, reset } = useBookingStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBarbershopDetails = async (id: string) => {
      try {
        const response = await fetch(`https://kena-ungrovelling-amphiboly.ngrok-free.dev/barbershop/${id}/details`, {
          headers: {
            'ngrok-skip-browser-warning': 'true'
          }
        });
        if (!response.ok) {
          throw new Error("Failed to fetch barbershop details");
        }
        const data = await response.json();
        updateBookingData({
          barbershopId: id,
          barbershopName: data.barbershopName,
          barbershopAddress: data.address,
          // Adicionei campos relevantes ao estado
          barbershopPhone: data.phone,
          barbershopServices: data.services,
          barbershopEmployees: data.employees.employees,
        });
      } catch (error) {
        console.error("Error fetching barbershop details:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (!barbershopId || bookingData.barbershopId !== barbershopId) {
      reset();
      if (barbershopId) {
        fetchBarbershopDetails(barbershopId);
      }
    } else {
      setIsLoading(false);
    }
  }, [barbershopId, bookingData.barbershopId, reset, updateBookingData]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <Header />

      {/* Cabeçalho da Barbearia */}
      <div className="container mx-auto px-4 pt-8 pb-12">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-42 h-42 bg-gradient-to-br from-blue-400 via-indigo-500 to-purple-600 rounded-full mb-4 shadow-2xl relative overflow-hidden">
            <BarberIcon />
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-2">
            {bookingData.barbershopName}
          </h1>
          <p className="text-gray-600 text-lg">Estilo e Qualidade em Cada Corte</p>
        </div>

        <div className="text-center mb-12">
          <Link to={`/barbershop/${barbershopId}/booking`}>
            <Button className="font-bold px-12 py-6 text-lg shadow-lg hover:shadow-xl transition-all">
              AGENDAR
            </Button>
          </Link>
        </div>

        {/* Grid de Informações */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {/* Endereço e Contato */}
          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all border border-gray-100">
            <div className="flex items-center mb-6">
              {/* <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl mr-4 shadow-md">
                📍
              </div> */}
              <h3 className="text-2xl font-bold text-gray-900">Localização</h3>
            </div>
            <div className="text-gray-700 border-t border-b-gray-200 pt-4 space-y-4">
              <p className="text-lg leading-relaxed font-bold">📍 {bookingData.barbershopAddress}</p>
              <div className="flex items-center pt-2">
                <span className="text-yellow-500 text-2xl mr-2">★</span>
                <span className="text-lg font-semibold">4.8</span>
                <span className="text-gray-500 ml-2">(Avaliação dos clientes)</span>
              </div>
            </div>
          </div>

          {/* Serviços */}
          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all border border-gray-100">
            <div className="flex items-center mb-6">
              {/* <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center text-white text-2xl mr-4 shadow-md">
                ✨
              </div> */}
              <h3 className="text-2xl font-bold text-gray-900">Nossos Serviços</h3>
            </div>
            <div className="border-t border-b-gray-200 pt-2">
              {bookingData.barbershopServices ? bookingData.barbershopServices.map((service) => (
                <div className="flex items-center p-3 rounded-lg hover:bg-slate-50 transition-colors" key={service.barbershopServiceId}>
                  <span className="text-purple-600 mr-3 text-xl">✦</span>
                  <span className="text-gray-800 text-lg font-bold">{service.descriptionOverride}</span>
                </div>
              )) : <p className="text-gray-500">Nenhum serviço encontrado.</p>}
            </div>
          </div>
        </div>

        {/* Profissionais */}
        <div className="bg-white rounded-2xl p-8 md:p-12 shadow-lg border border-gray-100">
          <div className="text-center mb-10">
            <h3 className="text-3xl font-bold text-gray-900 mb-2">Nossa Equipe</h3>
            <p className="text-gray-600">Profissionais experientes e qualificados</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {bookingData.barbershopEmployees ? bookingData.barbershopEmployees.map((employee, index) => {
              const gradients = [
                'from-blue-500 to-purple-600',
                'from-purple-500 to-pink-600',
                'from-pink-500 to-red-600',
                'from-orange-500 to-yellow-600',
                'from-green-500 to-teal-600',
                'from-teal-500 to-blue-600'
              ];
              const gradient = gradients[index % gradients.length];
              const initials = employee.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();

              return (
                <div className="group" key={employee.userId}>
                  <div className="bg-slate-50 rounded-xl p-6 text-center hover:bg-white transition-all duration-300 border border-gray-100 hover:shadow-lg">
                    <div className={`w-28 h-28 mx-auto mb-4 rounded-full bg-gradient-to-br ${gradient} flex items-center justify-center text-white text-3xl font-bold shadow-lg group-hover:scale-110 transition-transform`}>
                      {initials}
                    </div>
                    <h4 className="font-bold text-gray-900 text-lg mb-1">{employee.name}</h4>
                  </div>
                </div>
              );
            }) : <p className="col-span-full text-center text-gray-500">Nenhum profissional encontrado.</p>}
          </div>
        </div>

        {/* CTA Final */}
        <div className="text-center mt-12">
          <Link to={`/barbershop/${barbershopId}/booking`}>
            <Button className="font-bold px-16 py-7 text-xl shadow-xl hover:shadow-2xl transition-all">
              AGENDAR MEU HORÁRIO
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}