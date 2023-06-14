import getCurrentUser from "../actions/getCurrentUser"
import getFavorites from "../actions/getFavorites"
import ClientOnly from "../components/ClientOnly"
import EmptyState from "../components/EmptyState"
import FavoritesClient from "./FavoritesClient"

export default async function ListingPage() {
    const listings = await getFavorites()
    const currentUser = await getCurrentUser();
    if (!listings.length) {
        return (
            <ClientOnly>
                <EmptyState title="No favorites saved" subtitle="You have yet to favorite any properties!" />
            </ClientOnly>
        )
    }
    return (
        <ClientOnly>
            <FavoritesClient listings={listings} currentUser={currentUser} />
        </ClientOnly>
    )
}
