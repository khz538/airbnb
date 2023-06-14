import prisma from "@/app/libs/prismadb";


interface IParams {
    listingId?: string;
    userId?: string;
    authorId?: string;
}

const getReservations = async ( params: IParams ) => {
    try {
        const { listingId, userId, authorId } = params;

        const query: any = {};

        if (listingId) query.listingId = listingId; // find all reservations for this listing
        if (userId) query.userId = userId; // find all trips a user has reserved
        if (authorId) query.listing = { userId: authorId }; // find all reservations others have made for my properties

        const reservations = await prisma.reservation.findMany({
            where: query,
            include: { listing: true },
            orderBy: { createdAt: "desc" },
        });

        const safeReservations = reservations.map(reservation => ({
            ...reservation,
            createdAt: reservation.createdAt.toISOString(),
            startDate: reservation.startDate.toISOString(),
            endDate: reservation.endDate.toISOString(),
            listing: {
                ...reservation.listing,
                createdAt: reservation.listing.createdAt.toISOString()
            }
        }));

        return safeReservations;
    } catch (error:any) { throw new Error(error); }
}

export default getReservations;
