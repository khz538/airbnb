// asynchronous server component

import PropertiesClient from "./PropertiesClient"

import EmptyState from "../components/EmptyState"
import ClientOnly from "../components/ClientOnly"

import getCurrentUser from "../actions/getCurrentUser"
import getListings from "../actions/getListings"

const PropertiesPage = async () => {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return (
            <ClientOnly>
                <EmptyState title="Unauthorized" subtitle="Please sign in" />
            </ClientOnly>
        )
    };

    const listings = await getListings({ userId: currentUser.id })
    if (!listings.length) {
        return (
            <ClientOnly>
                <EmptyState title="No properties found" subtitle="You are not hosting any properties" />
            </ClientOnly>
        );
    };

    return (
        <ClientOnly>
            <PropertiesClient
                listings={listings}
                currentUser={currentUser}
            />
        </ClientOnly>
    )
}

export default PropertiesPage;
