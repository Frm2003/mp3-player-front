'use client';

import { useEffect, useRef, type ReactNode } from 'react';

import style from './styles/style.module.css';

interface iProps {
    children: ReactNode;
}

export default function ListLayoutRoot({ children }: iProps) {
    const ulRef = useRef<HTMLUListElement>(null);

    useEffect(() => {
        const calcHeight = (): void => {
            if (!ulRef.current) return;

            const rect: DOMRect = ulRef.current.getBoundingClientRect();
            const height: number =
                window.innerHeight - (rect.top + rect.bottom);

            console.log(window.innerHeight - (rect.bottom + rect.top));

            ulRef.current.style.height = `${height - 69}px`;
        };

        calcHeight();
        window.addEventListener('resize', calcHeight);

        return () => {
            window.removeEventListener('resize', calcHeight);
        };
    }, []);

    return (
        <div className={style.layout}>
            <ul ref={ulRef}>{children}</ul>
        </div>
    );
}
