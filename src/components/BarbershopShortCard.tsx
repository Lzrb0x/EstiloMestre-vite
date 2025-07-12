import { MapPin, Clock, Calendar, ChevronRight } from "lucide-react";

type Barber = {
  name: string;
  address: string;
  distance?: string;
  nextAvailableTime?: string;
  specialties?: string[];
};

type BarbershopShortCardProps = {
  barbers: Barber[];
};

export default function BarbershopShortCard({ barbers }: BarbershopShortCardProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
      {barbers.map((barber, index) => (
        <div
          key={barber.name}
         
          className="animate-fade-in-slide-up bg-slate-50 hover:bg-white border border-slate-200 rounded-xl p-6 transition-all duration-300 hover:shadow-lg group"
          style={{ animationDelay: `${index * 600}ms` }}
        >
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-lg font-semibold text-slate-800 mb-1">{barber.name}</h3>
              <p className="text-slate-600 text-sm">{barber.address}</p>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-1 text-slate-600 text-sm mb-1">
                <MapPin size={14} />
                {"1.2km"}
              </div>
              <div className="flex items-center gap-1 text-green-600 text-sm font-medium">
                <Clock size={14} />
                {"10:00"}
              </div>
            </div>
          </div>
          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 group">
            <Calendar size={18} />
            Ver Horários
            <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      ))}
    </div>
  );
}

