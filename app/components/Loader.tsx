'use client'

import { RotateLoader } from "react-spinners"

const Loader = () => {
    return (
        <div className="flex flex-col h-[70vh] justify-center items-center">
            <RotateLoader size={15} color="red" />
        </div>
    )
}

export default Loader;
