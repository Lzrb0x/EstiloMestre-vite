import { useParams } from "react-router-dom"
import { useBookingStore } from "../store/bookingStore";
import { useEffect } from "react";



export default function BookingFlow() {

    const { barbershopId } = useParams<{ barbershopId: string }>();
    const { updateBookingData } = useBookingStore();

    useEffect(() => {
        if (barbershopId) {
            updateBookingData({barbershopId})
        }
    }, [barbershopId, updateBookingData])

 

    return (
        <div className="min-h-screen cta-section">
            <h1 className="text-4xl font-bold text-center my-8">Booking Flow for Barbershop {barbershopId}</h1>
            {/* Booking flow content goes here */}
            <p className="text-center">This is where the booking flow will be implemented.</p>
        </div>
    )
}