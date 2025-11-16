import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Link, useParams } from "react-router-dom";
import { useBookingStore } from "./store/bookingStore";
import { useEffect, useState } from "react";

export default function BarbershopDetails() {
  const { barbershopId } = useParams<{ barbershopId: string }>();
  const { bookingData, updateBookingData, reset } = useBookingStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBarbershopDetails = async (id: string) => {
      try {
        const response = await fetch(`http://localhost:5008/barbershop/${id}/details`);
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
    <div className="min-h-screen cta-section">
      <Header />

      {/* banner */}
      <div className="hero-bg relative h-[50vh] flex items-center justify-center overflow-hidden animate-[fadeInUp_1s_ease-out_forwards] opacity-0">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-16 h-16 bg-white/10 rounded-full animate-float"></div>
          <div className="absolute top-3/4 right-1/4 w-20 h-20 bg-white/10 rounded-full animate-float"></div>
          <div className="absolute bottom-1/4 left-1/3 w-12 h-12 bg-white/10 rounded-full animate-float"></div>
        </div>
        <div className="relative z-10 text-center px-4">
          <h1 className="text-4xl md:text-6xl font-black text-white mb-4 animate-pulse-slow">
            Foto Barbearia
          </h1>
          <p className="text-xl md:text-2xl text-white/90 font-light tracking-wider">
            {bookingData.barbershopName}
          </p>
        </div>
      </div>

      <div className="text-center mt-10">
        <Link to={`/barbershop/${barbershopId}/booking`}>
          <Button className="font-bold w-1/2 py-10 xs:text-xs md:text-md xl:text-xl">
            QUERO AGENDAR AGORA!
          </Button>
        </Link>
      </div>

      {/* detalhes da barbearia */}
      <section className="container mx-auto px-4 py-16 animate-[slideUp_0.8s_ease-out_0.6s_forwards] opacity-0">
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="glass-effect rounded-2xl p-8 card-hover border bg-white border-gray-200">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white text-2xl mr-4">
                📍
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Endereço e Contato</h3>
            </div>
            <div className="space-y-3 text-gray-700">
              <p className="text-lg">{bookingData.barbershopAddress}</p>
              {/* <p className="text-lg font-semibold text-primary">{bookingData.phone}</p> */}
              <div className="flex items-center">
                <span className="text-yellow-500 text-xl mr-2">★</span>
                <span className="text-lg font-semibold">4.8 (Avaliação)</span>
              </div>
            </div>
          </div>

          <div className="glass-effect rounded-2xl p-8 card-hover border bg-white border-gray-200">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white text-2xl mr-4">
                ✨
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Especialidades</h3>
            </div>
            <div className="space-y-3">
              {bookingData.barbershopServices ? bookingData.barbershopServices.map((service) => (
                <div className="flex items-center" key={service.barbershopServiceId}>
                  <span className="text-primary mr-3">✦</span>
                  <span className="text-gray-700 text-lg">{service.descriptionOverride}</span>
                </div>
              )) : <p>Nenhum serviço encontrado.</p>}
            </div>
          </div>
        </div>

        <div className="mb-16">
          <h3 className="text-2xl font-semibold text-gray-900 text-center mb-8">Nossos Profissionais</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {bookingData.barbershopEmployees ? bookingData.barbershopEmployees.map((employee) => (
              <div className="bg-white rounded-xl p-6 text-center" key={employee.userId}>
                <div className="text-3xl mb-3 border rounded-2xl p-10 py-20">photo</div>
                <h4 className="font-semibold text-gray-900 mb-1">{employee.name}</h4>
                <p className="text-gray-600 text-sm">Descrição do profissional</p>
              </div>
            )) : <p>Nenhum profissional encontrado.</p>}
          </div>
        </div>

        <div className="text-center">
          <Link to={`/barbershop/${barbershopId}/booking`}>
            <Button className="font-bold w-1/2 py-10 xs:text-xs md:text-md xl:text-xl">
              QUERO AGENDAR AGORA!
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}