import { Fragment, ReactNode } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import carouselStyle from '@/styles/carousel.module.css';
import { IconDefinition } from '@fortawesome/free-brands-svg-icons';

export function Carousel({ contents }: { contents: ReactNode[] }) {
    const handleChange = (index: number) => {
        const initialContent = document.querySelector('#s1') as HTMLElement;
        if (initialContent) {
            initialContent.style.marginLeft = `-${20 * index}%`;
        }
    };

    return (
        <div className={carouselStyle.slideBody}>
            <div className={carouselStyle.slides}>
                {contents.map((content, index) => (
                    <Fragment key={index}>
                        <input
                            type="radio"
                            name="r"
                            id={`r${index}`}
                            onChange={() => handleChange(index)}
                        />
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
