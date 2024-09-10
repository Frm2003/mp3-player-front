import { RefObject, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faBackward,
    faChevronDown,
    faForward,
    faPause,
    faPlay,
    faRepeat,
} from '@fortawesome/free-solid-svg-icons';
import {
    avancar,
    continuar,
    voltar,
    pausar,
    tocar,
} from '@/lib/funcoesDeAudio';
import { useEstadosMusica } from '@/contexts/estadoMusicaContext';
import controleStyle from '@/styles/controleAudio.module.css';

export function ControleDeAudio() {
    const exibeTempoRef: RefObject<HTMLParagraphElement> =
        useRef<HTMLParagraphElement>(null);

    const { info, setInfo } = useEstadosMusica();

    const fecharControle = (): void => {
        const div: HTMLElement | null =
            document.querySelector('#controleDeAudio');

        if (div) {
            div.animate([{ bottom: '0' }, { bottom: '-500px' }], {
                duration: 150,
                fill: 'forwards',
            });

            div.style.display = 'block';
        }
    };

    const voltarAudio = (): void => {
        if (info.duracao && info.audioAtual) {
            if (info.duracao * 0.1 >= info.audioAtual?.currentTime) {
                voltar(info.musicaAtual, info.audioAtual, setInfo);
            } else {
                tocar(info.musicaAtual, info.audioAtual, setInfo);
            }
        }
    };

    // FUNÇÃO: ALTERAR O TEMPO ATUAL DA MUSICA
    const changeTime = (input: HTMLInputElement) => {
        if (info.duracao) {
            const newTime = (parseFloat(input.value) / 100) * info.duracao;
            input.value = `${newTime}`;
        }
    };

    // FUNÇÃO: MOSTRAR A DURAÇÃO TOTAL DA MUSICA
    const formatTime = (): string | undefined => {
        if (info.duracao != undefined) {
            const minutos: number = Math.floor(info.duracao / 60);
            const segundos: number = Math.floor(info.duracao % 60);
            return `${minutos}:${segundos.toString().padStart(2, '0')}`;
        }
        return undefined;
    };

    // FUNÇÃO: MOSTRAR A DURAÇÃO ATUAL DA MUSICA
    useEffect(() => {
        if (info.audioAtual) {
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

    return (
        <section className={controleStyle.layout}>
            <article id="controleDeAudio">
                <FontAwesomeIcon
                    className={controleStyle.icone}
                    icon={faChevronDown}
                    onClick={() => fecharControle()}
                />
                <div className={controleStyle.info}>
                    <div className={controleStyle.text}>
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
                    <FontAwesomeIcon icon={faRepeat} size={'2x'} />
                </div>
                <div className={controleStyle.botoes}>
                    <span>
                        <FontAwesomeIcon
                            icon={faBackward}
                            onClick={() => voltarAudio()}
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
                        value={
                            info.audioAtual ? info.audioAtual.currentTime : 0
                        }
                        style={{ maxWidth: '100%' }}
                        onChange={(e) => changeTime(e.target)}
                    />
                    <div>
                        <p ref={exibeTempoRef}>0:00</p>
                        <p>{info.duracao ? formatTime() : '0:00'}</p>
                    </div>
                </div>
            </article>
        </section>
    );
}
