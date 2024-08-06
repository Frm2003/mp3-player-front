import { useEffect, useRef } from 'react';
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
    const exibeTempoRef = useRef<HTMLParagraphElement>(null);
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

    useEffect(() => {
        if (info.audioAtual) {
            const handleTimeUpdate = () => {
                const tempoAtual = info.audioAtual?.currentTime ?? -1;
                if (tempoAtual > -1) {
                    const minutos = Math.floor(tempoAtual / 60);
                    const segundos = Math.floor(tempoAtual % 60);

                    const inputs: NodeListOf<HTMLInputElement> =
                        document.querySelectorAll('#progressRange');
                    inputs.forEach((input: HTMLInputElement) => {
                        input.value = `${tempoAtual}`;
                    });

                    if (exibeTempoRef.current) {
                        exibeTempoRef.current.textContent = `${minutos}:${segundos.toString().padStart(2, '0')}`;
                    }
                }
            };

            info.audioAtual.addEventListener('timeupdate', handleTimeUpdate);

            // Função de limpeza para remover o event listener
            return () => {
                if (info.audioAtual) {
                    info.audioAtual.removeEventListener(
                        'timeupdate',
                        handleTimeUpdate
                    );
                }
            };
        }
    }, [info.audioAtual]);

    const formatTime = (): string | undefined => {
        if (info.duracao != undefined) {
            const minutos: number = Math.floor(info.duracao / 60);
            const segundos: number = Math.floor(info.duracao % 60);
            return `${minutos}:${segundos.toString().padStart(2, '0')}`;
        }
        return undefined;
    };

    const onChange = () => console.log('teste');

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
                    <input
                        type="range"
                        id="progressRange"
                        min="0"
                        max={info.duracao}
                        step="0.01"
                        value={
                            info.audioAtual ? info.audioAtual.currentTime : 0
                        }
                        style={{ maxWidth: '100%' }}
                        onChange={() => onChange()}
                    />
                    <div>
                        <p ref={exibeTempoRef}>0:00</p>
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
