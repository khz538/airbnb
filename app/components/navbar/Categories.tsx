"use client";

import { FC } from "react";
import CategoryBox from "./CategoryBox";
import Container from "../Container";
import { TbBeach, TbMountain, TbPool } from "react-icons/tb";
import { GiWindmill, GiIsland, GiBoatFishing, GiCastle, GiForestCamp, GiCaveEntrance, GiCactus, GiBarn } from "react-icons/gi";
import { MdOutlineVilla } from "react-icons/md";
import { FaSkiing } from "react-icons/fa";
import { BsSnow } from "react-icons/bs";
import { IoDiamond } from "react-icons/io5";
import { usePathname, useSearchParams } from "next/navigation";

export const categories = [
    {
        label: 'Beach',
        icon: TbBeach,
        description: "This property is close to the beach."
    },
    {
        label: "Windmills",
        icon: GiWindmill,
        description: "This property has windmills nearby."
    },
    {
        label: "Modern",
        icon: MdOutlineVilla,
        description: "This property is modern."
    },
    {
        label: "Countryside",
        icon: TbMountain,
        description: "This property has mountains nearby."
    },
    {
        label: "Pools",
        icon: TbPool,
        description: "This property has a pool."
    },
    {
        label: "Islands",
        icon: GiIsland,
        description: "This property is on an island!"
    },
    {
        label: "Lake",
        icon: GiBoatFishing,
        description: "This property is next to a lake."
    },
    {
        label: "Skiing",
        icon: FaSkiing,
        description: "This property has skiing nearby."
    },
    {
        label: "Castles",
        icon: GiCastle,
        description: "This property is a castle."
    },
    {
        label: "Camping",
        icon: GiForestCamp,
        description: "Camp and enjoy the great outdoors!"
    },
    {
        label: "Arctic",
        icon: BsSnow,
        description: "Brave the cold and enjoy the snow."
    },
    {
        label: "Cave",
        icon: GiCaveEntrance,
        description: "Look into the world from inside a cave."
    },
    {
        label: "Desert",
        icon: GiCactus,
        description: "This property is in the desert."
    },
    {
        label: "Barns",
        icon: GiBarn,
        description: "Unwind in a rustic barn."
    },
    {
        label: "Luxe",
        icon: IoDiamond,
        description: "Experience the finer things in life."
    },

];

const Categories = () => {
    const params = useSearchParams();
    const category = params?.get("category"); // extract the category from the search params url
    const pathname = usePathname(); // extract the pathname from the url

    const isMainPage = pathname === "/"; // check if the user is on the main page
    if (!isMainPage) return null; // if not, we don't render the categories

    return (
        <Container>
            <div
                className="
                    pt-4
                    flex
                    items-center
                    justify-between
                    overflow-x-auto
                "
            >
            {categories.map((item) => (
                <CategoryBox
                    key={item.label}
                    label={item.label}
                    icon={item.icon}
                    selected={category === item.label}
                />
            ))}
            </div>
        </Container>
    );
};

export default Categories;
