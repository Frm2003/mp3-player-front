'use client';

import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useModalContext } from '@/layout/Modal/context/ModalContext';

import style from './styles/style.module.css';

interface iProps {
    title?: string;
}

export default function ModalLatoutTitle({ title }: iProps) {
    const { setShow } = useModalContext();

    const closeModal = (): void => setShow(false);

    return (
        <div className={style.title} onClick={closeModal}>
            <h3>{title}</h3>
            <FontAwesomeIcon icon={faTimes} size={'2x'} />
        </div>
    );
}
