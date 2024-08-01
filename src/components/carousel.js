'use client';

import { Fragment, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import carouselStyle from '@/styles/carousel.module.css';

export function Carousel({ contents }) {
    useEffect(() => slide(), []);

    const slide = () => {
        let inputs = document.querySelectorAll('input[type="radio"]');
        let initialContent = document.querySelector('#s1');

        inputs.forEach((input, index) => {
            input.addEventListener('change', () => {
                input.checked &&
                    (initialContent.style.marginLeft = `-${20 * index}%`);
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
                            id={index == 0 ? 's1' : 's'}
                        >
                            {content}
                        </div>
                    </Fragment>
                ))}
            </div>
        </div>
    );
}

export function ItemCarousel({ icon, pos }) {
    return (
        <label htmlFor={`r${pos}`}>
            <FontAwesomeIcon icon={icon} size={'2x'} />
        </label>
    );
}
