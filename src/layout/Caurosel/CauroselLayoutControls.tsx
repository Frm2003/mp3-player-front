'use client';

import { ReactNode, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faChevronLeft,
    faChevronRight,
} from '@fortawesome/free-solid-svg-icons';

import carouselStyle from './styles/carousel.module.css';

interface iProps {
    id: `s${number}`;
    length: number;
    children?: ReactNode;
}

export default function CauroselLayoutControl({
    id,
    length,
    children,
}: iProps) {
    const [index, setIndex] = useState<number>(0);

    // HOOK QUE ALTERA ENTRE OS SLIDES DO CAROUSEL
    useEffect(() => {
        const initialContent = document.querySelector(`#${id}`) as HTMLElement;
        initialContent.style.marginLeft = `-${20 * index}%`;
    }, [index, id]);

    // BOTÃO PARA AVANÇAR
    const handleClickBack = () => {
        if (index > 0) setIndex((prevState) => prevState - 1);
    };

    // BOTÃO PARA VOLTAR
    const handleClickNext = () => {
        if (index < length - 1) setIndex((prevState) => prevState + 1);
    };

    return (
        <div className={carouselStyle.buttons}>
            <div className={carouselStyle.arrows}>
                <div onClick={handleClickBack}>
                    {index > 0 && <FontAwesomeIcon icon={faChevronLeft} />}
                </div>
                {children}
                <div onClick={handleClickNext}>
                    {index < length - 1 && (
                        <FontAwesomeIcon icon={faChevronRight} />
                    )}
                </div>
            </div>
        </div>
    );
}
