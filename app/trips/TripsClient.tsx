"use client"

import { useRouter } from "next/navigation";
import Container from "../components/Container";
import Heading from "../components/Heading";
import { SafeReservation, SafeUser } from "../types";
import { useCallback, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import ListingCard from "../components/listings/ListingCard";

interface TripsClientProps {
    reservations: SafeReservation[];
    currentUser?: SafeUser | null;
};

const TripsClient = ({
    reservations,
    currentUser,
}: TripsClientProps) => {

    const router = useRouter();
    const [deletingId, setDeletingId] = useState("");

    const onCancel = useCallback((id: string) => {
        setDeletingId(id);

        axios.delete(`/api/reservations/${id}`)
            .then(() => {
                toast.success("Reservation canceled")
                router.refresh()
            })
            .catch((err) => toast.error(err?.response?.data?.error))
            .finally(() => setDeletingId(""));
    }, [router]);

    return (
        <Container>
            <Heading title="Trips" subtitle="Where you're going" />
            <div
                className="
                    mt-10 gap-8
                    grid grid-cols-1
                    sm:grid-cols-2
                    md:grid-cols-3
                    lg:grid-cols-4
                    xl:grid-cols-5
                    2xl:grid-cols-6
                "
            >
                {reservations.map((reservation => (
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
                )))}
            </div>
        </Container>
    )
};

export default TripsClient;
