'use client'

import homeStyle from '@/styles/home.module.css'
import Modal from '@/components/modal';

import ListaRender from '@/components/listaRender';
import { ListaController } from '@/mvc/controller/listaController';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDownAZ, faPlus, faMagnifyingGlass, faList } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import MenuDeAudio from '@/components/menuDeAudio';

export default function Home() {
    const [listaControl] = useState(new ListaController());

    const [audioAtual, setAudioAtual] = useState(null);
    const [musicaAtual, setMusicaAtual] = useState(null);
    const [estadoMusica, setEstadoMusica] = useState('pausado');

    const controleDeEstados = {
        audioAtual: { var: audioAtual, set: setAudioAtual },
        musicaAtual: { var: musicaAtual, set: setMusicaAtual },
        estadoMusica: { var: estadoMusica, set: setEstadoMusica }
    }

    useEffect(() => {
        audioAtual && (
            audioAtual.addEventListener('pause', () => setEstadoMusica('pausado')),
            audioAtual.addEventListener('play', () => setEstadoMusica('tocando'))
        )
    }, [audioAtual])

    useEffect(() => { audioAtual && ((estadoMusica == 'pausado') ? audioAtual.pause() : audioAtual.play()) }, [estadoMusica])

    // SISTEMA PARA ORDENAR A LISTA
    const [ordenou, setOrdenou] = useState(false)
    const ordenar = () => { setOrdenou(true); listaControl.mergeSort() }
    useEffect(() => setOrdenou(false), [ordenou])

    //MODAL
    const [show, setShow] = useState(false)
    const abrirModal = () => setShow(true)
    const fecharModal = () => setShow(false)

    //SISTEMA DE TROCA DE LISTAS
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
                            <ListaRender list={listaControl.selectAll()} control={controleDeEstados} />
                        </div>
                        <div className={homeStyle.content}>
                            <div className={homeStyle.title}>
                                <h2 id='h2'>Busca</h2>
                            </div>
                        </div>
                    </div>
                </article>

                <article>
                    <MenuDeAudio musica={musicaAtual} control={controleDeEstados} />
                </article>

                <article id="menuBar" className={homeStyle.menuBar}>
                    <div>
                        <label htmlFor='r1'><FontAwesomeIcon icon={faList} size="2x" /></label>
                        <FontAwesomeIcon icon={faPlus} size="4x" onClick={() => abrirModal()} />
                        <label htmlFor='r2'><FontAwesomeIcon icon={faMagnifyingGlass} size="2x" /></label>
                    </div>
                </article>
            </section>
            <Modal show={show} funcFechar={fecharModal} lista={listaControl} />
        </>
    );
}