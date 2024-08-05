'use client';

import { useLayoutEffect, useEffect, useRef, useState, RefObject } from 'react';
import { faPause, faPlay } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEstadosMusica } from '@/contexts/estadoMusicaContext';
import { continuar, pausar } from '@/lib/funcoesDeAudio';
import displayStyle from '@/styles/display.module.css';

import { ControleDeAudio } from './controleDeAudio';

export default function DisplayAudio() {
    const displayRef: RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null);
    const { info, setInfo } = useEstadosMusica();

    const [show, setShow] = useState<boolean>(false);
    const abrirModal = () => setShow(true);
    const fecharModal = () => setShow(false);

    useEffect(() => {
        if (info.audioAtual) {
            if (info.estado === 'pausado') {
                info.audioAtual.pause();
            } else {
                info.audioAtual.play();
            }
        }
    }, [info.estado, info.audioAtual]);

    useLayoutEffect(() => {
        if (displayRef.current) {
            const nav: HTMLElement | null = document.querySelector('nav');
            if (nav) displayRef.current.style.bottom = `${nav.clientHeight}px`;
        }
    }, []);

    return (
        <>
            <section
                className={displayStyle.body}
                id="displayAudio"
                ref={displayRef}
            >
                <article>
                    <div className={displayStyle.aling}>
                        <div
                            className={displayStyle.text}
                            onClick={() => abrirModal()}
                        >
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
                                icon={
                                    info.estado == 'pausado' ? faPlay : faPause
                                }
                                onClick={() =>
                                    info.estado == 'pausado'
                                        ? continuar(info, setInfo)
                                        : pausar(info, setInfo)
                                }
                                size="2x"
                            />
                        </div>
                    </div>
                    <progress value={0} max={100} />
                </article>
            </section>
            <ControleDeAudio show={show} funcFechar={fecharModal} />
        </>
    );
}
