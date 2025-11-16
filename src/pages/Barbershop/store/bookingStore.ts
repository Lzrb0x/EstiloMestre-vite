import { create } from "zustand";

interface BookingData {
  barbershopId: string | null;
  barbershopName: string | null;
  barbershopAddress?: string | null;
  barbershopPhone?: string | null; // Adicionado para armazenar o telefone da barbearia
  barbershopServices?: Array<{
    barbershopServiceId: number;
    price: number;
    duration: string;
    descriptionOverride: string;
    barbershopId: number;
    serviceId: number;
  }>; // Adicionado para armazenar os serviços da barbearia
  barbershopEmployees?: Array<{
    userId: number;
    name: string;
    barberShopId: number;
  }>; // Adicionado para armazenar os funcionários da barbearia
  barbershopServiceId: string | null;
  barbershopServiceDescription: string | null; 
  barbershopServicePrice: number | null;
  employeeName: string | null; 
  employeeId: string | null;
  date: string | null;
  time: string | null;
}

interface BookingState {
  currentStep: number;
  bookingData: BookingData;
  nextStep: () => void;
  prevStep: () => void;
  updateBookingData: (data: Partial<BookingData>) => void;
  reset: () => void;
}

const initialState = {
  currentStep: 1,
  bookingData: {
    barbershopId: null,
    barbershopName: null,
    barbershopAddress: null,
    barbershopPhone: null, // Inicializado como null
    barbershopServices: [], // Inicializado como array vazio
    barbershopEmployees: [], // Inicializado como array vazio
    barbershopServiceId: null,
    barbershopServiceDescription: null,
    barbershopServicePrice: null,
    employeeId: null,
    employeeName: null,
    date: null,
    time: null,
  },
};

export const useBookingStore = create<BookingState>((set) => ({
  ...initialState,
  nextStep: () => set((state) => ({ currentStep: state.currentStep + 1 })),
  prevStep: () => set((state) => ({ currentStep: state.currentStep - 1 })),
  updateBookingData: (data) =>
    set((state) => ({
      bookingData: { ...state.bookingData, ...data },
    })),
  reset: () => set(initialState),
}));

