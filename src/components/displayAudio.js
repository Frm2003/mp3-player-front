import menuStyle from '@/styles/displayAudio.module.css';
import ControleDeAudio from './controleAudio';

import { useState } from 'react';

import { faPause, faPlay } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useLayoutEffect, useRef } from 'react';

function calcHeight() {
    const menuBarHeight = document.getElementById('menuBar')?.clientHeight || 0;
    return `${menuBarHeight}px`
}

export default function DisplayAudio({ musica, control }) {
    const miniInfo = useRef(null);

    useLayoutEffect(() => {
        miniInfo.current.style.bottom = calcHeight()
    }, [])

    const pausar = () => control.estadoMusica.set('pausado')
    const continuar = () => control.estadoMusica.set('tocando')

    const [estadoControleDeAudio, setEstadoControleDeAudio] = useState(false)
    const abrirControleDeAudio = () => setEstadoControleDeAudio(true)
    const fecharControleDeAudio = () => setEstadoControleDeAudio(false)

    return (
        <>
            <div className={menuStyle.miniInfo} id="miniInfo" ref={miniInfo}>
                <div className={menuStyle.aling}>

                    <div className={menuStyle.info}>
                        <label className={menuStyle.text} onClick={() => abrirControleDeAudio()}>
                            <h3>{musica ? musica.nome.replace('.mp3', '') : `Selecione uma musica`}</h3>
                            <p>{musica ? musica.artista : `...`}</p>
                        </label>
                        <div className={menuStyle.icone}>
                            <FontAwesomeIcon
                                icon={control.estadoMusica.var == 'tocando' ? faPause : faPlay} size='2x'
                                onClick={() => control.estadoMusica.var == 'tocando' ? pausar() : continuar()}
                            />
                        </div>
                    </div>
                    <progress
                        id="progressRange"
                        step="0.01"
                        min={0}
                        max={control.audioAtual.var ? control.duracaoMusica.var : 0}
                    />
                </div>
            </div>
            <ControleDeAudio show={estadoControleDeAudio} onclick={fecharControleDeAudio} musica={musica} control={control} />
        </>
    );
}