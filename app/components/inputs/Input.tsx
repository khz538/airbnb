"use client"

import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import { FC } from "react";
import { BiDollar } from "react-icons/bi";

interface InputProps {
    id: string;
    label: string;
    type?: string;
    disabled?: boolean;
    formatPrice?: boolean;
    required?: boolean;
    register: UseFormRegister<FieldValues>; // need this and errors for react-hook-forms
    errors: FieldErrors;
}

const Input: FC<InputProps> = ({
    id,
    label,
    type = "text",
    disabled,
    formatPrice,
    required,
    register,
    errors,
}) => {
    return (
        <div className="w-full relative">
            {formatPrice && (
                <BiDollar
                    size={24}
                    className="
                        absolute
                        text-neutral-700
                        top-5
                        left-2
                    "
                />
            )}
            <input
                id={id}
                disabled={disabled}
                {...register(id, { required })}
                placeholder=" "
                type={type}
                className={`
                    peer
                    w-full
                    p-4
                    pt-6
                    font-light
                    bg-white
                    border-2
                    rounded-md
                    outline-none
                    transition
                    disabled:opacity-70
                    disabled:cursor-not-allowed
                    ${formatPrice ? 'pl-9' : 'pl-4'}
                    ${errors[id] ? 'border-rose-500' : 'border-neutral-300'}
                    ${errors[id] ? 'focus:border-rose-500' : 'focus:border-[#1d1d1f]'}
                `}
            />
            <label
                className={`
                    absolute
                    text-md
                    duration-150
                    transform
                    -translate-y-3
                    top-5
                    z-10
                    origin-[0]
                    ${formatPrice ? "left-9" : "left-4"}
                    peer-placeholder-shown:scale-100
                    peer-placeholder-shown:translate-y-0
                    peer-focus:scale-75
                    peer-focus:-translate-y-4
                    ${errors[id] ? 'text-rose-500' : 'text-zinc-400'}
                `}
            >
                {label}
            </label>
        </div>
    )
};

export default Input;
