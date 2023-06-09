"use client";

import { useCallback } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

const Counter = ({
    title,
    subtitle,
    value,
    onChange,
}: {
    title: string,
    subtitle: string,
    value: number,
    onChange: (value: number) => void
}) => {
    const onAdd = useCallback(() => {
        onChange(value + 1);
    }, [onChange, value]);

    const onReduce = useCallback(() => {
        if (value === 1) return;
        onChange(value - 1);
    }, [value, onChange])

    return (
        <div className="flex items-center justify-between">
            <div className="flex flex-col w-full">
                <div className="text-md">
                    {title}
                </div>
                <div className="font-light text-gray-600 text-md">{subtitle}</div>
                <div className="flex items-center gap-4 pt-4">
                    <div className="
                            w-9 h-9 rounded-full border border-neutral-400 flex items-center justify-center
                            text-neutral-600 cursor-pointer hover:border-neutral-600 transition
                        "
                        onClick={onReduce}
                    >
                        <AiOutlineMinus />
                    </div>
                    <div className="font-light text-xl text-neutral-600">
                        {value}
                    </div>
                    <div className="
                            w-9 h-9 rounded-full border border-neutral-400 flex items-center justify-center
                            text-neutral-600 cursor-pointer hover:border-neutral-600 transition
                        "
                        onClick={onAdd}
                    >
                        <AiOutlinePlus />
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Counter;
