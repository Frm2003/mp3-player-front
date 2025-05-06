import { ReactNode } from 'react';

import style from './styles/style.module.css';

interface iProps {
    children: ReactNode;
    action: string | ((formData: FormData) => Promise<void>);
}

export default function FormLayoutRoot({ children, action }: iProps) {
    return (
        <form className={style.layout} action={action}>
            {children}
        </form>
    );
}
