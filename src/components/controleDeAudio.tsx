import { RefObject, useEffect, useRef } from 'react';
import {
    faBackward,
    faChevronDown,
    faForward,
    faPlay,
    faPause,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEstadosMusica } from '@/contexts/estadoMusicaContext';
import { avancar, continuar, pausar, voltar } from '@/lib/funcoesDeAudio';
import controleStyle from '@/styles/controleAudio.module.css';

export function ControleDeAudio({
    show,
    funcFechar,
}: {
    show: boolean;
    funcFechar: () => void;
}) {
    const modalRef: RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null);
    const exibeTempoRef: RefObject<HTMLParagraphElement> =
        useRef<HTMLParagraphElement>(null);

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
    // DURAÇÃO ATUAL
    useEffect(() => {
        if (info.audioAtual != undefined) {
            info.audioAtual.addEventListener('timeupdate', () => {
                const tempoAtual: number | undefined =
                    info.audioAtual?.currentTime ?? undefined;
                if (tempoAtual) {
                    const minutos: number = Math.floor(tempoAtual / 60);
                    const segundos: number = Math.floor(tempoAtual % 60);

                    const inputs: NodeListOf<HTMLInputElement> =
                        document.querySelectorAll('#progressRange');
                    inputs.forEach((input: HTMLInputElement) => {
                        input.value = `${tempoAtual}`;
                    });

                    if (exibeTempoRef.current) {
                        exibeTempoRef.current.textContent = `${minutos}:${segundos.toString().padStart(2, '0')}`;
                    }
                }
            });
        }
    }, [info.audioAtual]);

    // DURAÇÃO TOTAL
    const formatTime = (): string | undefined => {
        if (info.duracao != undefined) {
            const minutos: number = Math.floor(info.duracao / 60);
            const segundos: number = Math.floor(info.duracao % 60);
            return `${minutos}:${segundos.toString().padStart(2, '0')}`;
        }
        return undefined;
    };

    const onChange = (input: HTMLInputElement) => {
        if (info.duracao) {
            const newTime = (parseFloat(input.value) / 100) * info.duracao;
            input.value = `${newTime}`;
        }
    };

    const html = (
        <section className={controleStyle.layout}>
            <article ref={modalRef}>
                <FontAwesomeIcon
                    className={controleStyle.icone}
                    icon={faChevronDown}
                    onClick={() => fecharModal()}
                />
                <div className={controleStyle.botoes}>
                    <span>
                        <FontAwesomeIcon
                            icon={faBackward}
                            onClick={() =>
                                voltar(
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
                                avancar(
                                    info.musicaAtual,
                                    info.audioAtual,
                                    setInfo
                                )
                            }
                        />
                    </span>
                </div>
                <div className={controleStyle.tempo}>
                    <input
                        type="range"
                        id="progressRange"
                        min="0"
                        max={info.duracao}
                        step="0.01"
                        value={0}
                        style={{ maxWidth: '100%' }}
                        onChange={(e) => onChange(e.target)}
                    />
                    <div>
                        <p ref={exibeTempoRef}>0:00</p>
                        <p>{info.duracao ? formatTime() : '0:00'}</p>
                    </div>
                </div>
            </article>
        </section>
    );

    return show ? html : null;
}
