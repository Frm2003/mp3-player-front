'use server';

import { Fragment, ReactNode } from 'react';

import carouselStyle from './styles/carousel.module.css';

interface iProps {
    id: `s${number}`;
    children: ReactNode[];
}

export default async function CarouselLayoutBody({ id, children }: iProps) {
    return (
        <div className={carouselStyle.slideBody}>
            <div className={carouselStyle.slides}>
                {children.map((content: ReactNode, index: number) => (
                    <Fragment key={index}>
                        <div
                            className={carouselStyle.content}
                            id={index === 0 ? id : 's'}
                        >
                            {content}
                        </div>
                    </Fragment>
                ))}
            </div>
        </div>
    );
}
