"use client"

import { FC, ReactNode, useState, useEffect } from 'react';

interface ClientOnlyProps {
    children: ReactNode;
}

// wrap client components with this to avoid potential hydration error caused by Next.js

const ClientOnly: FC<ClientOnlyProps> = ({
    children
}) => {
    const [hasMounted, setHasMounted] = useState(false);

    useEffect(() => {
        setHasMounted(true);
    }, []);

    if (!hasMounted) return null;

    return (
        <>
            {children}
        </>
    )
}

export default ClientOnly;
