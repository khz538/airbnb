'use client'

import { useEffect } from "react"
import EmptyState from "./components/EmptyState";

const ErrorState = ({ error }: { error: Error }) => {
    useEffect(() => {
        console.error(error)
    }, [error]);

    return (
        <EmptyState title="Drats" subtitle="The site broke!" />
    )
};

export default ErrorState
