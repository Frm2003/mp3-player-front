'use client';

import { useLayoutEffect, useRef, RefObject } from 'react';
import { faEllipsisH, faFileAudio } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEstadosMusica } from '@/components/contexts/estadoMusicaContext';
import { tocar } from '@/lib/funcoesDeAudio';
import listaStyle from '@/styles/lista.module.css';
import Musica from '@/lib/classeMusica';

const calcHeight = (height: number[], soma: number): string => {
    height.forEach((e) => {
        soma += e;
    });
    return `${window.innerHeight - (soma + 20)}px`;
};

export default function List({
    list,
    height,
}: {
    list: Musica[];
    height: number[];
}) {
    const listRef: RefObject<HTMLUListElement> = useRef<HTMLUListElement>(null);
    const { info, setInfo } = useEstadosMusica();

    useLayoutEffect(() => {
        const updateHeight = () => {
            if (listRef.current) {
                listRef.current.style.height = calcHeight(height, 0);
            }
        };

        updateHeight();

        window.addEventListener('resize', updateHeight);

        return () => {
            window.removeEventListener('resize', updateHeight);
        };
    }, [height]);

    return (
        <ul className={listaStyle.body} ref={listRef}>
            {list.map((musica, index) => (
                <li key={index}>
                    <div>
                        <FontAwesomeIcon icon={faFileAudio} />
                    </div>
                    <div
                        onClick={() => tocar(musica, info.audioAtual, setInfo)}
                    >
                        <h3>{musica.nome.replace('.mp3', '')}</h3>
                        <p>{musica.artista}</p>
                    </div>
                    <div>
                        <FontAwesomeIcon icon={faEllipsisH} />
                    </div>
                </li>
            ))}
        </ul>
    );
}
