import menuStyle from '@/styles/menuDeAudio.module.css';
import { avancar, voltar } from '@/mvc/controller/musicaController';

import { faPause, faPlay, faBackward, faForward, faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useLayoutEffect, useState, useRef, useEffect } from 'react';

function calcHeight() {
    const menuBarHeight = document.getElementById('menuBar')?.clientHeight || 0;
    return `${menuBarHeight}px`
}

export default function MenuDeAudio({ musica, control }) {
    const miniInfo = useRef(null);

    useLayoutEffect(() => {
        miniInfo.current.style.bottom = calcHeight()
    }, [])

    useEffect(() => {}, [])

    const pausar = () => control.estadoMusica.set('pausado')
    const continuar = () => control.estadoMusica.set('tocando')
    const avancarMusica = () => avancar(musica, control)
    const voltarMusica = () => voltar(musica, control)

    //MODAL
    const [show, setShow] = useState(false)
    const abrirModal = () => setShow(true)
    const fecharModal = () => setShow(false)

    return (
        <>
            <div className={menuStyle.miniInfo} id="miniInfo" ref={miniInfo}>
                <div className={menuStyle.aling}>

                    <div className={menuStyle.info}>
                        <label className={menuStyle.text} onClick={() => abrirModal()}>
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
                    <progress value={0}></progress>

                </div>
            </div>

            <Control
                show={show}
                estado={control.estadoMusica.var}
                funcFechar={fecharModal}
                funcAudios={{
                    pausar: pausar,
                    continuar: continuar,
                    avancar: avancarMusica,
                    voltar: voltarMusica
                }}
            />
        </>
    );
}

function Control({ show, estado, funcFechar, funcAudios, }) {
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

        animation.onfinish = () => funcFechar();
    };

    const html =
        <div className={menuStyle.control} id="control" ref={controlRef}>
            <label className={menuStyle.controlHead} onClick={() => fecharModal()} >
                <FontAwesomeIcon icon={faAngleDown} />
            </label>
            <div className={menuStyle.controlBody}>
                <div className={menuStyle.botoes}>
                    <span>
                        <FontAwesomeIcon icon={faBackward} onClick={() => funcAudios.voltar()} />
                    </span>
                    <span>
                        <FontAwesomeIcon
                            icon={estado == 'tocando' ? faPause : faPlay}
                            onClick={() => estado == 'tocando' ? funcAudios.pausar() : funcAudios.continuar()} />
                    </span>
                    <span>
                        <FontAwesomeIcon icon={faForward} onClick={() => funcAudios.avancar()} />
                    </span>
                </div>
            </div>
        </div>

    return show ? html : null
}

/*


    useEffect(() => {
        if (varDeControle.audioAtual.var) {
            varDeControle.audioAtual.var.addEventListener('timeupdate', () => {
                const inputRange = document.querySelectorAll('#progressRange');
                if (inputRange) {
                    inputRange.forEach((input) => { input.value = varDeControle.audioAtual.var.currentTime });
                }
                const tempoAtualSegundos = varDeControle.audioAtual.var.currentTime;
                const tempoAtualMinutos = Math.floor(tempoAtualSegundos / 60);
                const tempoAtualSegundosRestantes = Math.floor(tempoAtualSegundos % 60);
                const tempoAtualFormatado = tempoAtualMinutos + ':' + tempoAtualSegundosRestantes.toString().padStart(2, '0');
                document.getElementById('tempoAtual').innerText = tempoAtualFormatado;
            });
        }
    }, [varDeControle.audioAtual.var])

    useEffect(() => {
        const audioElement = varDeControle.audioAtual.var;

        const handleEnded = () => {
            avancar(listaMusicas, varDeControle);
        };

        if (audioElement) {
            audioElement.removeEventListener('ended', handleEnded);
            audioElement.addEventListener('ended', handleEnded);
        }

        return () => {
            if (audioElement) {
                audioElement.removeEventListener('ended', handleEnded);
            }
        };
    }, [varDeControle.audioAtual.var, listaMusicas]);

    const toggleControl = (e) => {
        if (e) {
            miniInfo.current.style.bottom = `-${49}px`
            control.current.style.bottom = `${0}px`;
            return
        }
        control.current.style.bottom = `-${control.current.offsetHeight}px`;
        miniInfo.current.style.bottom = `${49}px`
    }
        
    const handleRangeChange = (event) => {
        const newValue = event.target.value;
        if (varDeControle.audioAtual.var) {
            varDeControle.audioAtual.var.currentTime = newValue;
        }
    };

    const avançarMusica = () => { avancar(listaMusicas, varDeControle) }
    const voltarMusica = () => { voltar(listaMusicas, varDeControle) }
    const pausarMusica = () => { pausar(varDeControle.audioAtual.var, varDeControle.estado.set) }
    const continuarMusica = () => { continuar(varDeControle.audioAtual.var, varDeControle.estado.set) }

    <div className={menuStyle.control} id="control" ref={control}>
                <label className={menuStyle.controlHead} htmlFor='toggle' >
                    <FontAwesomeIcon icon={faAngleDown} />
                </label>
                <div className={menuStyle.controlBody}>
                    <div className={menuStyle.botoes}>
                        <span>
                            <FontAwesomeIcon onClick={() => voltarMusica()} icon={faBackward} />
                        </span>
                        <span>
                            <FontAwesomeIcon
                                onClick={() => varDeControle.estado.var == 'playing' ? (pausarMusica()) : (continuarMusica())}
                                icon={varDeControle.estado.var == 'playing' ? (faPause) : (faPlay)}
                            />
                        </span>
                        <span>
                            <FontAwesomeIcon onClick={() => avançarMusica()} icon={faForward} />
                        </span>
                    </div>
                    <div className={menuStyle.barProgress}>
                        <input
                            type="range"
                            id="progressRange"
                            min="0"
                            max={varDeControle.duracao.var}
                            step="0.01"
                            value={varDeControle.audioAtual.var ? varDeControle.audioAtual.var.currentTime : 0}
                            style={{ maxWidth: '100%' }}
                            onChange={handleRangeChange}
                        />
                        <div>
                            <p id="tempoAtual">0:00</p>
                            <p id="duracaoTotal">{varDeControle.duracaoTotal.var}</p>
                        </div>
                    </div>
                </div>
            </div>
*/