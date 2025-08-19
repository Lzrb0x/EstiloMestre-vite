import { create } from "zustand";

interface BookingData {
  barbershopId: string | null;
  barbershopServiceId: string | null;
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
    barbershopServiceId: null,
    employeeId: null,
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

