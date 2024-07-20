'use client';

import carouselStyle from '@/styles/carousel.module.css';
import { useEffect, Fragment } from 'react';

export default function Carousel({ contents }) {
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
							id={index == 1 ? 's1' : 's'}
						>
							{content}
						</div>
					</Fragment>
				))}
			</div>
		</div>
	);
}
