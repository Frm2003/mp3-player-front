'use client';

import { useLayoutEffect, useEffect, useRef, useState, RefObject } from 'react';
import { faPause, faPlay } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useEstadosMusica } from '@/contexts/estadoMusicaContext';
import displayStyle from '@/styles/display.module.css';
import { ModalBottom } from './modal';

export default function DisplayAudio() {
    const displayRef: RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null);
    const { info, setInfo } = useEstadosMusica();

    const [show, setShow] = useState(false);
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
            let nav: HTMLElement | null = document.querySelector('nav');
            nav != null &&
                (displayRef.current.style.bottom = `${nav.clientHeight}px`);
        }
    }, []);

    const pausar = (): void => {
        setInfo({
            estado: 'pausado',
            audioAtual: info.audioAtual,
            musicaAtual: info.musicaAtual,
            duracao: info.duracao,
        });
    };

    const continuar = (): void => {
        setInfo({
            estado: 'tocando',
            audioAtual: info.audioAtual,
            musicaAtual: info.musicaAtual,
            duracao: info.duracao,
        });
    };

    return (
        <>
            <section
                className={displayStyle.body}
                id="displayAudio"
                onClick={() => abrirModal()}
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
                                icon={
                                    info.estado == 'pausado' ? faPlay : faPause
                                }
                                onClick={() =>
                                    info.estado == 'pausado'
                                        ? continuar()
                                        : pausar()
                                }
                                size="2x"
                            />
                        </div>
                    </div>
                    <progress value={0} max={100} />
                </article>
            </section>
            <ModalBottom show={show} funcFechar={fecharModal} />
        </>
    );
}
