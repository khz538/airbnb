"use client"

import { FC } from "react";
import { SafeUser } from "@/app/types";
import { IconType } from "react-icons";
import useCountries from "@/app/hooks/useCountries";
import Avatar from "../Avatar";
import ListingCategory from "./ListingCategory";
import dynamic from "next/dynamic";

// dynamically import the map
const Map = dynamic(() => import("../Map"), { ssr: false });

interface ListingInfoProps {
    user: SafeUser;
    description: string;
    guestCount: number;
    bathroomCount: number;
    roomCount: number;
    category: {
        icon: IconType;
        label: string;
        description: string;
    } | undefined;
    locationValue: string;
}

const ListingInfo: FC<ListingInfoProps> = ({
    user,
    description,
    guestCount,
    bathroomCount,
    roomCount,
    category,
    locationValue,
}) => {

    const { getByValue } = useCountries();

    const coordinates = getByValue(locationValue)?.latlng;

    return (
        <div className="flex flex-col col-span-4 gap-8">
            <div className="flex flex-col gap-2">
                <div className="flex text-xl font-semibold items-center gap-2">
                    <Avatar src={user?.image} />
                    <div>Hosted by {user?.name}</div>
                </div>
                <div className="flex items-center gap-4 font-light text-neutral-500">
                    <div>{guestCount} {guestCount > 1 ? "guests" : "guest"}</div>
                    <div>{roomCount} {roomCount > 1 ? "rooms" : "room"}</div>
                    <div>{bathroomCount} {bathroomCount > 1 ? "baths" : "bath"}</div>
                </div>
            </div>
            <hr />
            {category && (
                <ListingCategory
                    icon={category.icon}
                    label={category.label}
                    description={category.description}
                />
            )}
            <hr />
            <div className="text-lg font-light text-neutral-500">{description}</div>
            <hr />
            <Map center={coordinates} />
        </div>
    )
}


export default ListingInfo;
