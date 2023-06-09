"use client"

import { Toaster } from 'react-hot-toast'

// toaster is a foreign library that is not made for Next 13's app folder, so we create a provider to run this on the client side

const ToasterProvider = () => {
    return <Toaster />
}

export default ToasterProvider;
