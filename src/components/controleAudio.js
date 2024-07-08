import menuStyle from '@/styles/controleAudio.module.css';
import { voltar, avancar } from '@/lib/musicaController';

import { useEffect, useRef } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faBackward, faForward, faPause, faPlay } from '@fortawesome/free-solid-svg-icons';

export default function ControleDeAudio({ show, onclick, musica, control }) {
    const controlRef = useRef(null)

    const fecharModal = () => {
        let animation = controlRef.current.animate([
            //from
            { bottom: '0' },
            //to
            { bottom: '-500px' }
        ], {
            duration: 250, fill: 'forwards'
        });

        animation.onfinish = () => onclick();
    };

    //SISTEMA RESPONSÁVEL PELA EXIBIÇÃO DO TEMO DA MUSICA
    useEffect(() => {
        const audioAtual = control.audioAtual.var
        if (audioAtual) {
            audioAtual.addEventListener('timeupdate', () => {
                const inputs = document.querySelectorAll('#progressRange')
                inputs.forEach((input) => { input.value = audioAtual.currentTime })

                const tempoEmMinutos = Math.floor(audioAtual.currentTime / 60);
                const tempoEnSegundos = Math.floor(audioAtual.currentTime % 60);

                const tempoAtual = document.getElementById('tempoAtual')
                tempoAtual && (tempoAtual.innerText = `${tempoEmMinutos}:${tempoEnSegundos.toString().padStart(2, '0')}`)
            })
        }
    }, [control.audioAtual.var])


    function changeDuracao(e) {
        const newTime = parseFloat(e.target.value);
        if (control.audioAtual.var) {
            control.audioAtual.var.currentTime = newTime;
        }
    }

    //FUNÇÕES DE AUDIO
    const pausar = () => control.estadoMusica.set('pausado')
    const continuar = () => control.estadoMusica.set('tocando')

    const html =
        <div className={menuStyle.control} id="control" ref={controlRef}>
            <label className={menuStyle.controlHead} onClick={() => fecharModal()} >
                <FontAwesomeIcon icon={faAngleDown} />
            </label>
            <div className={menuStyle.controlBody}>

                <div className={menuStyle.botoes}>
                    <span>
                        <FontAwesomeIcon icon={faBackward} onClick={() => voltar(musica, control)} />
                    </span>
                    <span>
                        <FontAwesomeIcon
                            icon={control.estadoMusica.var == 'tocando' ? faPause : faPlay} size='2x'
                            onClick={() => control.estadoMusica.var == 'tocando' ? pausar() : continuar()}
                        />
                    </span>
                    <span>
                        <FontAwesomeIcon icon={faForward} onClick={() => avancar(musica, control)} />
                    </span>
                </div>

                <div className={menuStyle.barProgress}>
                    <input
                        type="range"
                        id="progressRange"
                        step="0.01"
                        min={0}
                        max={control.audioAtual.var ? control.duracaoMusica.var : 0}
                        value={control.audioAtual.var ? control.audioAtual.var.currentTime : 0}
                        onChange={(e) => changeDuracao(e)}
                    />
                    <div>
                        <p id="tempoAtual">0:00</p>
                        <p id="duracaoTotal">{control.audioAtual.var ? getDuracao(control.duracaoMusica.var) : '0:00'}</p>
                    </div>
                </div>

            </div>
        </div>

    return show ? html : null
}

function getDuracao(duracao) {
    const tempoEmMinutos = Math.floor(duracao / 60);
    const tempoEnSegundos = Math.floor(duracao % 60);
    return `${tempoEmMinutos}:${tempoEnSegundos.toString().padStart(2, '0')}`
}