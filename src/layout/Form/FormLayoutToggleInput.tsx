'use client';

import { useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/free-regular-svg-icons';

import style from './styles/style.module.css';

type formToogleInput = {
    icons?: IconDefinition[];
    labels?: string[];
    name: string;
    types?: string[];
    patterns?: ((value: string) => string)[];
    limits?: number[];
};

interface iProps {
    input: formToogleInput;
}

export default function FormLayoutToggleInput({ input }: iProps) {
    const inputRef = useRef<HTMLInputElement>(null);

    const [toggleVal, setToggleVal] = useState<boolean>(false);
    const [message, setMessage] = useState<string>('');

    const { name, icons, labels, types, patterns, limits } = input;

    // DEFINE A LABEL
    const label: string = labels ? labels[Number(toggleVal)] : '';

    // DEFINE O ICONE
    const icon: IconDefinition | undefined = icons
        ? icons[Number(toggleVal)]
        : undefined;

    // DEFINE O LIMITE DE CARACTERES
    const limit: number | undefined = limits
        ? limits[Number(toggleVal)]
        : undefined;

    // DEFINE O TYPE DO INPUT
    const typeInput: string | 'text' = types
        ? types[Number(toggleVal)]
        : 'text';

    // DEFINE O PATTERN DO INPUT
    const pattern: ((value: string) => string) | undefined = patterns
        ? patterns[Number(toggleVal)]
        : undefined;

    const toggleValInput = () => {
        setToggleVal((prevState) => !prevState);
        if (inputRef.current && pattern) inputRef.current.value = '';
    };

    const checkValidity = () => {
        if (inputRef.current) {
            const val: boolean = inputRef.current.value.trim() != '';

            if (pattern)
                inputRef.current.value = pattern(inputRef.current.value);

            const parentNode = inputRef.current.parentNode as HTMLElement;

            parentNode.style.borderColor = val
                ? 'rgba(255, 255, 255, 0.25)'
                : 'rgba(163, 43, 43, 1)';

            setMessage(val ? '' : `O campo ${label} está vazio`);
        }
    };

    return (
        <>
            <p className={style.label}>{label}</p>

            <div className={style.toggleInput}>
                <input
                    maxLength={limit}
                    name={name}
                    onBlur={checkValidity}
                    onInput={checkValidity}
                    ref={inputRef}
                    type={typeInput}
                />
                <div onClick={toggleValInput}>
                    {icon && <FontAwesomeIcon icon={icon} size={'1x'} />}
                </div>
            </div>

            <div className={style.warning}>
                <p>{message}</p>
            </div>
        </>
    );
}
