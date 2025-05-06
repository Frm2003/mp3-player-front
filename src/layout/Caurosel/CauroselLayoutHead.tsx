'use server';

import { ReactNode } from 'react';

import carouselStyle from './styles/carousel.module.css';

interface iProps {
    length: number;
}

export default async function CarouselLayoutHead({ length }: iProps) {
    const inputs: ReactNode[] = [];

    for (let index: number = 0; index < length; index++) {
        inputs.push(
            <input id={`r${index}`} key={index} name={'r'} type={'radio'} />
        );
    }

    return (
        <div className={carouselStyle.slideBody}>
            <div className={carouselStyle.slides}>{inputs}</div>
        </div>
    );
}
