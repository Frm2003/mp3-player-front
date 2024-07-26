'use client';

import {useLayoutEffect, useRef} from 'react';
import {faPause, faPlay} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

import {useEstadosMusica} from '@/context/estadoMusicaContext';
import displayStyle from '@/styles/display.module.css';

export default function DisplayAudio() {
    const displayRef = useRef();
    const {info, setInfo} = useEstadosMusica();

    useLayoutEffect(() => {
        displayRef.current.style.bottom =
            document.querySelector('nav').clientHeight;
    }, []);

    const pausar = () => {
        setInfo({
            estado: 'pausado',
            audioAtual: info.audioAtual,
            musicaAtual: info.musicaAtual,
        });
    };

    const continuar = () => {
        setInfo({
            estado: 'tocando',
            audioAtual: info.audioAtual,
            musicaAtual: info.musicaAtual,
        });
    };

    return (
        <section
            id="displayAudio"
            className={displayStyle.body}
            ref={displayRef}
        >
            <article>
                <div className={displayStyle.aling}>
                    <div className={displayStyle.text}>
                        <h3>
                            {info.musicaAtual
                                ? info.musicaAtual.nome.replace('.mp3', '')
                                : 'Selecione uma musica'}
                        </h3>
                        <p>
                            {info.musicaAtual
                                ? info.musicaAtual.artista
                                : '...'}
                        </p>
                    </div>
                    <div className={displayStyle.icon}>
                        <FontAwesomeIcon
                            icon={info.estado == 'pausado' ? faPlay : faPause}
                            onClick={() =>
                                info.estado == 'pausado'
                                    ? continuar()
                                    : pausar()
                            }
                            size="2x"
                        />
                    </div>
                </div>
                <progress />
            </article>
        </section>
    );
}
