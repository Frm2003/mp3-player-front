'use client';

import { ReactNode, useEffect, useRef } from 'react';
import { useModalContext } from '@/layout/Modal/context/ModalContext';

import style from './styles/style.module.css';

interface iProps {
    children: ReactNode;
}

export default function ModalLayoutRoot({ children }: iProps) {
    const { show } = useModalContext();

    const modalRef = useRef<HTMLElement>(null);

    useEffect(() => {
        if (modalRef.current)
            modalRef.current.style.marginTop = show ? '0' : `-${200}%`;
    }, [show]);

    return (
        <section
            style={{ marginTop: '-200%' }}
            className={style.layout}
            ref={modalRef}
        >
            <article>{children}</article>
        </section>
    );
}
