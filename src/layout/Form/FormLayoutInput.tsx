'use client';

import { useRef, useState } from 'react';

import style from './styles/style.module.css';

type forminput = {
    name: string;
    label?: string;
    type?: string;
    placeholder?: string;
};

interface iProps {
    input: forminput;
}

export default function FormLayoutInput({ input }: iProps) {
    const inputRef = useRef<HTMLInputElement>(null);
    const [message, setMessage] = useState<string>('');

    const checkValidity = () => {
        if (inputRef.current) {
            const val: boolean = inputRef.current.value.trim() !== '';

            inputRef.current.style.borderColor = val
                ? 'rgba(255, 255, 255, 0.25)'
                : 'rgba(163, 43, 43, 1)';

            setMessage(val ? '' : `O campo ${input.name} está vazio`);
        }
    };

    return (
        <>
            {input.label && <p className={style.label}>{input.label}</p>}

            <input
                className={style.normalInput}
                name={input.name}
                placeholder={input.placeholder}
                onBlur={checkValidity}
                onInput={checkValidity}
                ref={inputRef}
                type={input.type}
            />

            <div className={style.warning}>
                <p>{message}</p>
            </div>
        </>
    );
}
