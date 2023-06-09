"use client"

import {FC, useCallback, useState} from "react";
import { SafeReservation, SafeUser } from "../types"
import Container from "../components/Container";
import Heading from "../components/Heading";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";
import ListingCard from "../components/listings/ListingCard";

interface TripsClientProps {
    reservations: SafeReservation[];
    currentUser?: SafeUser | null;

};

const TripsClient: FC<TripsClientProps> = ({ reservations, currentUser }) => {

    const router = useRouter();
    const [deletingId, setDeletingId] = useState('');

    const onCancel = useCallback((id: string) => {
        setDeletingId(id);
        axios.delete(`/api/reservations/${id}`)
            .then(() => {
                toast.success("Reservation canceled")
                router.refresh()
            })
            .catch((error) => toast.error(error?.response?.data?.error))
            .finally(() => setDeletingId(''))
    }, [router])

    return (
        <Container>
            <Heading title="Trips" subtitle="Where you've been and where you're going" />
            <div className="grid grid-cols-1 mt-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
                {reservations.map(reservation => (
                    <ListingCard
                      data={reservation.listing}
                      key={reservation.id}
                      reservation={reservation}
                      actionId={reservation.id}
                      onAction={onCancel}
                      disabled={deletingId === reservation.id}
                      actionLabel="Cancel reservation"
                      currentUser={currentUser}
                    />
                ))}
            </div>
        </Container>
    )
}

export default TripsClient
