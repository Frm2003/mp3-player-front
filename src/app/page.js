'use client'

import homeStyle from '@/styles/home.module.css'
import Modal from '@/components/modal';

import Lista from '@/components/lista';
import DisplayAudio from '@/components/displayAudio';
import { list } from '@/lib/list';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDownAZ, faPlus, faMagnifyingGlass, faList } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';

export default function Home() {
    const [listaControl] = useState(new list());

    const [audioAtual, setAudioAtual] = useState(null);
    const [musicaAtual, setMusicaAtual] = useState(null);
    const [estadoMusica, setEstadoMusica] = useState('pausado');
    const [duracaoMusica, setDuracaoMusica] = useState(0)

    const controleDeEstados = {
        audioAtual: { var: audioAtual, set: setAudioAtual },
        musicaAtual: { var: musicaAtual, set: setMusicaAtual },
        estadoMusica: { var: estadoMusica, set: setEstadoMusica },
        duracaoMusica: { var: duracaoMusica, set: setDuracaoMusica }
    }

    useEffect(() => { audioAtual && ((estadoMusica == 'pausado') ? audioAtual.pause() : audioAtual.play()) }, [estadoMusica])

    // SISTEMA PARA ORDENAR A LISTA
    const [ordenou, setOrdenou] = useState(false)
    const ordenar = () => { setOrdenou(true); listaControl.mergeSort() }
    useEffect(() => setOrdenou(false), [ordenou])

    //MODAL
    const [estadoModal, setEstadoModal] = useState(false)
    const abrirModal = () => setEstadoModal(true)
    const fecharModal = () => setEstadoModal(false)

    //SISTEMA DE CARROSEL CSS
    useEffect(() => slideShow(), [])
    const slideShow = () => {
        document.querySelectorAll('input[type="radio"]').forEach((input, index) => {
            input.addEventListener('change', () => {
                if (input.checked) document.querySelector('#s1').style.marginLeft = `-${20 * index}%`
            })
        })
    }

    return (
        <>
            <section>
                <article className={homeStyle.slideBody}>
                    <div className={homeStyle.slides}>
                        <input type='radio' name='r' id='r1' />
                        <input type='radio' name='r' id='r2' />
                        <div className={homeStyle.content} id="s1">
                            <div className={homeStyle.title}>
                                <h2 id='h2'>Lista de Reprodução</h2>
                                <FontAwesomeIcon icon={faArrowDownAZ} size="lg" onClick={() => ordenar()} />
                            </div>
                            <Lista list={listaControl.selectAll()} control={controleDeEstados} />
                        </div>
                        <div className={homeStyle.content}>
                            <div className={homeStyle.title}>
                                <h2 id='h2'>Busca</h2>
                            </div>
                        </div>
                    </div>
                </article>

                <article>
                    <DisplayAudio musica={musicaAtual} control={controleDeEstados} />
                </article>

                <article id="menuBar" className={homeStyle.menuBar}>
                    <div>
                        <label htmlFor='r1'><FontAwesomeIcon icon={faList} size="2x" /></label>
                        <FontAwesomeIcon icon={faPlus} size="4x" onClick={() => abrirModal()} />
                        <label htmlFor='r2'><FontAwesomeIcon icon={faMagnifyingGlass} size="2x" /></label>
                    </div>
                </article>
            </section>
            <Modal show={estadoModal} funcFechar={fecharModal} lista={listaControl} />
        </>
    );
}