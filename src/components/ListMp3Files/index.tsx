'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faEllipsis,
    faMusic,
    faPlay,
    faPlus,
} from '@fortawesome/free-solid-svg-icons';
// CONTEXTOS
import { useListFileContext } from '@/context/ListFileContext';
import { useModalContext } from '@/layout/Modal/context/ModalContext';
import { usePlayerContext } from '@/context/playerContext';
import { CSSProperties } from 'react';
// COMPONENTES AUTORAIS
import List from '@/layout/List';
import Musica from '@/utils/Musica';

import style from './styles/style.module.css';

export default function ListMp3Files() {
    // CONTEXTOS GLOBAIS
    const { setShow } = useModalContext();

    const { list } = useListFileContext();

    const { state, setState } = usePlayerContext();

    // VARIAVEIS
    const { audio, infoMusica } = state;

    // MÉTODOS
    const openModal = (): void => setShow((prevState: boolean) => !prevState);

    const play = (musica: Musica): void => {
        if (audio) audio.pause();

        const newAudio = new Audio(musica.arquivo);

        newAudio.play();

        setState({
            infoMusica: musica,
            estado: 'played',
            audio: newAudio,
        });
    };

    const renderList = (item: Musica) => {
        const bool: boolean = infoMusica?.arquivo != item.arquivo;

        const icon = bool ? faMusic : faPlay;

        const styleH3: CSSProperties = {
            color: bool ? 'white' : 'green',
        };

        const styleSpan: CSSProperties = {
            color: bool ? 'rgba(255, 255, 255, 0.5)' : 'darkgreen',
            padding: '.5em 0',
        };

        return (
            <div className={style.itemList} style={{ padding: '1em' }}>
                <div className={style.info} onClick={() => play(item)}>
                    <div className={style.icon}>
                        <FontAwesomeIcon icon={icon} size={'1x'} />
                    </div>
                    <div className={style.text}>
                        <h3 style={styleH3}>{item.nome}</h3>
                        <span style={styleSpan}>{item.artista}</span>
                    </div>
                </div>
                <FontAwesomeIcon icon={faEllipsis} />
            </div>
        );
    };

    // HTML
    return (
        <section className={style.layout}>
            <article>
                <h2>Lista de reprodução</h2>
                <FontAwesomeIcon
                    icon={faPlus}
                    size={'2x'}
                    onClick={openModal}
                />
            </article>
            <article>
                <List.Root>
                    <List.Body list={list} functionRender={renderList} />
                </List.Root>
            </article>
        </section>
    );
}
