import { useRef } from 'react';
import {
    faBackward,
    faChevronDown,
    faForward,
    faPlay,
    faPause,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import modalStyle from '@/styles/modal.module.css';
import { useEstadosMusica } from '@/contexts/estadoMusicaContext';
import { avancar, continuar, pausar, voltar } from '@/lib/funcoesDeAudio';

interface iProps {
    show: boolean;
    funcFechar: () => void;
}

export function ControleDeAudio({ show, funcFechar }: iProps) {
    const modalRef = useRef<HTMLDivElement>(null);
    const { info, setInfo } = useEstadosMusica();

    const fecharModal = (): void => {
        if (modalRef.current) {
            const animation = modalRef.current.animate(
                [{ bottom: '0%' }, { bottom: '-500px' }],
                {
                    duration: 150,
                    fill: 'forwards',
                }
            );

            animation.onfinish = () => funcFechar();
        }
    };

    const formatTime = (): string | undefined => {
        if (info.duracao != undefined) {
            const minutos: number = Math.floor(info.duracao / 60);
            const segundos: number = Math.floor(info.duracao % 60);
            return `${minutos}:${segundos}`;
        }
        return undefined;
    };

    const html = (
        <section className={modalStyle.layout2}>
            <article ref={modalRef}>
                <FontAwesomeIcon
                    className={modalStyle.icone}
                    icon={faChevronDown}
                    onClick={() => fecharModal()}
                />
                <div className={modalStyle.botoes}>
                    <span>
                        <FontAwesomeIcon
                            icon={faBackward}
                            onClick={() =>
                                avancar(
                                    info.musicaAtual,
                                    info.audioAtual,
                                    setInfo
                                )
                            }
                        />
                    </span>
                    <span>
                        <FontAwesomeIcon
                            icon={info.estado == 'pausado' ? faPlay : faPause}
                            onClick={() =>
                                info.estado == 'pausado'
                                    ? continuar(info, setInfo)
                                    : pausar(info, setInfo)
                            }
                        />
                    </span>
                    <span>
                        <FontAwesomeIcon
                            icon={faForward}
                            onClick={() =>
                                voltar(
                                    info.musicaAtual,
                                    info.audioAtual,
                                    setInfo
                                )
                            }
                        />
                    </span>
                </div>
                <div className={modalStyle.tempo}>
                    <input type={'range'} />
                    <div>
                        <p>0:00</p>
                        <p>
                            {info.duracao != undefined ? formatTime() : '0:00'}
                        </p>
                    </div>
                </div>
            </article>
        </section>
    );

    return show ? html : null;
}
