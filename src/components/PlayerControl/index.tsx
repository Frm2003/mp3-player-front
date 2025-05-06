'use client';

import {
    faPause,
    faPlay,
    IconDefinition,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { usePlayerContext } from '@/context/playerContext';

import style from './styles/style.module.css';

export default function PlayerControl() {
    const { state, setState } = usePlayerContext();

    const { infoMusica, estado, audio } = state;

    const pause = (): void => {
        setState({
            infoMusica: infoMusica,
            estado: 'paused',
            audio: audio,
        });

        audio?.pause();
    };

    const play = (): void => {
        setState({
            infoMusica: infoMusica,
            estado: 'played',
            audio: audio,
        });

        audio?.play();
    };

    const icone: IconDefinition = estado != 'paused' ? faPause : faPlay;

    const toggleAudio: () => void = estado != 'paused' ? pause : play;

    return (
        <section className={style.layout}>
            <div className={style.body}>
                <article>
                    <div className={style.title}>
                        <h3>{infoMusica?.nome || 'Selecione uma musica'}</h3>
                        <span>{infoMusica?.artista || '...'}</span>
                    </div>
                    <div className={style.btn} onClick={toggleAudio}>
                        <FontAwesomeIcon icon={icone} size={'2x'} />
                    </div>
                </article>
            </div>
        </section>
    );
}
