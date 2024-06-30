import menuStyle from '@/styles/menuDeAudio.module.css';
import { avancar, continuar, pausar, tocar, voltar } from '../services/funcoesDeAudio';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faPause, faAngleDown, faBackward, faForward } from '@fortawesome/free-solid-svg-icons';
import { useLayoutEffect, useRef } from 'react';

export default function MenuDeAudio(musica, controle) {
    const control = useRef(null);
    const miniInfo = useRef(null);

    const pausarMusica = () => pausar(controle.audioAtual.var, controle.estado.set);
    const continuarMusica = () => continuar(controle.audioAtual.var, controle.estado.set);
    const avancarMusica = () => avancar(musica, controle);
    const voltarMusica = () => voltar(musica, controle);

    const toggleControl = (e) => {
        if (e.target.checked) {
            control.current.style.bottom = '0';
        } else {
            control.current.style.bottom = `-${control.current.offsetHeight}px`;
        }
    };

    return (
        <>
            <section className={menuStyle.miniInfo} id="miniInfo" ref={miniInfo}>
                <article>
                    <div className={menuStyle.aling}>
                        <label htmlFor="toggle" >
                            <h3>{musica ? musica.nome : 'Selecione uma música'}</h3>
                            <p>{musica ? musica.artista : '...'}</p>
                        </label>
                        <input type='checkbox' id='toggle' onChange={toggleControl} style={{ display: 'none' }} />
                        <span>
                            <FontAwesomeIcon
                                icon={controle.estado.var === 'tocando' ? faPause : faPlay}
                                onClick={() => controle.estado.var === 'tocando' ? pausarMusica() : continuarMusica()}
                            />
                        </span>
                    </div>
                    <progress
                        id="progressRange"
                        max={0}
                        step="0.01"
                        defaultValue={0}
                    ></progress>
                </article>
            </section>

            <div className={menuStyle.control} id="control" ref={control}>
                <label className={menuStyle.controlHead} htmlFor='toggle' >
                    <FontAwesomeIcon icon={faAngleDown} />
                </label>
                <div className={menuStyle.controlBody}>
                    <div className={menuStyle.botoes}>
                        <span>
                            <FontAwesomeIcon icon={faBackward} onClick={voltarMusica} />
                        </span>
                        <span>
                            <FontAwesomeIcon
                                icon={controle.estado.var === 'tocando' ? faPause : faPlay}
                                onClick={() => controle.estado.var === 'tocando' ? pausarMusica() : continuarMusica()}
                            />
                        </span>
                        <span>
                            <FontAwesomeIcon icon={faForward} onClick={avancarMusica} />
                        </span>
                    </div>
                </div>
            </div>
        </>
    );
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