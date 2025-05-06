'use client';

import { useEffect, useRef } from 'react';
import { useFormStatus } from 'react-dom';

import style from './styles/style.module.css';

interface iProps {
    text: string;
    names: string[];
}

export default function FormLayoutButton({ text, names }: iProps) {
    const btRef = useRef<HTMLButtonElement>(null);
    const inputsRef = useRef<Map<string, HTMLInputElement>>(new Map());

    const { pending } = useFormStatus();

    // Função para verificar se todos os inputs são válidos
    const checkValidity = () => {
        const isValid = names.every((name) => {
            const input = inputsRef.current.get(name);
            return input ? input.value.trim() !== '' : false;
        });
        return isValid;
    };

    // Hook para monitorar os inputs e controlar a habilitação do botão
    useEffect(() => {
        const isValid = checkValidity();
        if (btRef.current) btRef.current.disabled = !isValid;
    });

    // Hook para registrar os inputs nos refs
    useEffect(() => {
        const inputElements = names.map((name) => {
            return document.querySelector(
                `input[name='${name}']`
            ) as HTMLInputElement;
        });

        inputElements.forEach((input) => {
            if (input) {
                inputsRef.current.set(input.name, input);
                input.addEventListener('input', () => {
                    const isValid = checkValidity();
                    if (btRef.current) btRef.current.disabled = !isValid;
                });
            }
        });

        return () => {
            inputElements.forEach((input) => {
                if (input) input.removeEventListener('input', () => {});
            });
        };
    });

    return (
        <button className={style.btnForm} ref={btRef} type="submit" disabled>
            {pending ? '...' : text}
        </button>
    );
}
