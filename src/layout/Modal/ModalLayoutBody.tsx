import { ReactNode } from 'react';

import ModalStyle from './styles/style.module.css';

interface iProps {
    children: ReactNode;
}

export default function ModalLayoutBody({ children }: iProps) {
    return <div className={ModalStyle.body}>{children}</div>;
}
