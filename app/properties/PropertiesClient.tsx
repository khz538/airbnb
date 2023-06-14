"use client"

import { useRouter } from "next/navigation";
import Container from "../components/Container";
import Heading from "../components/Heading";
import { SafeListing, SafeUser } from "../types";
import { useCallback, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import ListingCard from "../components/listings/ListingCard";

interface PropertiesClientProps {
    listings: SafeListing[];
    currentUser?: SafeUser | null;
};

const PropertiesClient = ({
    listings,
    currentUser,
}: PropertiesClientProps) => {

    const router = useRouter();
    const [deletingId, setDeletingId] = useState("");

    const onCancel = useCallback((id: string) => {
        setDeletingId(id);

        axios.delete(`/api/listings/${id}`)
            .then(() => {
                toast.success("Property deleted")
                router.refresh()
            })
            .catch((err) => toast.error(err?.response?.data?.error))
            .finally(() => setDeletingId(""));
    }, [router]);

    return (
        <Container>
            <Heading title="Properties" subtitle="Airbnbs you're hosting" />
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
                {listings.map((listing => (
                    <ListingCard
                        data={listing}
                        key={listing.id}
                        actionId={listing.id}
                        onAction={onCancel}
                        disabled={deletingId === listing.id}
                        actionLabel="Remove property"
                        currentUser={currentUser}
                    />
                )))}
            </div>
        </Container>
    )
};

export default PropertiesClient;
