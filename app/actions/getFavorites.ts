import prisma from "@/app/libs/prismadb"
import getCurrentUser from "./getCurrentUser"


export default async function getFavorites() {
    try {
        const currentUser = await getCurrentUser();

        if (!currentUser) return [];

        const favorites = await prisma.listing.findMany({ // find all the listings where the listing id is in the current user's favoriteIds property
            where: {
                id: {
                    in: [ ...(currentUser.favoriteIds || []) ]
                }
            }
        });

        const safeFavorites = favorites.map(favorite => ({
            ...favorite,
            createdAt: favorite.createdAt.toISOString()
        }));

        return safeFavorites;
    } catch (e:any) {
        throw new Error(e)
    }
}
