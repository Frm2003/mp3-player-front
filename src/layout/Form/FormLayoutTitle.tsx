'use server';

import Image, { StaticImageData } from 'next/image';

import style from './styles/style.module.css';

interface iProps {
    src?: StaticImageData;
    title: string;
}

export default async function FormLayoutTitle({ src, title }: iProps) {
    return (
        <div className={style.title}>
            <div className={style.containerImg}>
                {src && <Image src={src} alt={'desc'} width={35} height={35} />}
            </div>
            <h2>{title}</h2>
        </div>
    );
}
