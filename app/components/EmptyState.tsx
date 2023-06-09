"use client"

import { useRouter } from "next/navigation";
import Heading from "./Heading";
import Button from "./Button";

const EmptyState = ({
    title = "No exact matches",
    subtitle = "Try changing your filters",
    showReset,
}: {
    title?: string;
    subtitle?: string;
    showReset?: boolean;
}) => {
    const router = useRouter();

    return (
        <div className="
            flex flex-col justify-center items-center
            gap-2
            h-[60vh]
        ">
            <Heading title={title} subtitle={subtitle} center />
            <div className="w-48 mt-4">
                {showReset && (
                    <Button outline label="Remove all filters" onClick={() => router.push("/")} />
                )}
            </div>
        </div>
    )
}

export default EmptyState;
