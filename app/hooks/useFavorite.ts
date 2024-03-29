import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useMemo, MouseEvent } from "react";
import { toast } from "react-hot-toast";

import { SafeUser } from "../types";

import useLoginModal from "./useLoginModal";

interface IUseFavorite {
    listingId: string;
    currentUser?: SafeUser | null;
}

const useFavorite= ({
    listingId,
    currentUser,
}: IUseFavorite) => {
    const router = useRouter();
    const loginModal = useLoginModal();
    const hasFavorited = useMemo(() => {
        const list = currentUser?.favoriteIds || [];
        return list.includes(listingId);
    }, [currentUser, listingId]);

    const toggleFavorite = useCallback(async (e: MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();

        if (!currentUser) return loginModal.onOpen();

        try {
            let req;
            if (hasFavorited) req = () => axios.delete(`/api/favorites/${listingId}`);
            else req = () => axios.post(`/api/favorites/${listingId}`);
            await req();
            router.refresh();
            toast.success("Success");
        } catch (e) {
            toast.error("Something went wrong :(")
        }
    }, [currentUser, hasFavorited, listingId, loginModal, router]);

    return {
        hasFavorited,
        toggleFavorite
    }
}

export default useFavorite;
