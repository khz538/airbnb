import { NextResponse } from "next/server";

import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";

interface IParams {
    reservationId?: string;
}

export async function DELETE ( request: Request, { params }: { params: IParams } ) {
    const currentUser = await getCurrentUser();
    if (!currentUser) return NextResponse.error();

    const { reservationId } = params;

    if (!reservationId || typeof reservationId !== "string") {
        throw new Error("Invalid ID");
    }

    const reservation = await prisma.reservation.deleteMany({
        where: {
            id: reservationId,
            OR: [
                { userId: currentUser.id }, // enable the person who reserved to cancel a reservation
                { listing: { userId: currentUser.id } }, // enable the property owner to cancel a reservation
            ]
        }
    });

    return NextResponse.json(reservation);
}