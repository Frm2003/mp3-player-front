'use client';

import React, { Fragment, ReactNode, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import carouselStyle from '@/styles/carousel.module.css';
import { IconDefinition } from '@fortawesome/free-brands-svg-icons';

export function Carousel({ contents }: { contents: ReactNode[] }) {
    useEffect(() => slide(), []);

    const slide = () => {
        let inputs: NodeListOf<Element> = document.querySelectorAll(
            'input[type="radio"]'
        );
        let initialContent = document.querySelector('#s1') as HTMLElement;

        inputs.forEach((input, index): void => {
            (input as HTMLInputElement).addEventListener('change', () => {
                if ((input as HTMLInputElement).checked) {
                    initialContent.style.marginLeft = `-${20 * index}%`;
                }
            });
        });
    };

    return (
        <div className={carouselStyle.slideBody}>
            <div className={carouselStyle.slides}>
                {contents.map((content, index) => (
                    <Fragment key={index}>
                        <input type="radio" name="r" id={`r${index}`} />
                        <div
                            className={carouselStyle.content}
                            id={index === 0 ? 's1' : 's'}
                        >
                            {content}
                        </div>
                    </Fragment>
                ))}
            </div>
        </div>
    );
}

export function ItemCarousel({
    icon,
    pos,
}: {
    icon: IconDefinition;
    pos: number;
}) {
    return (
        <label htmlFor={`r${pos}`}>
            <FontAwesomeIcon icon={icon} size={'2x'} />
        </label>
    );
}
