'use client'

import Lista from '@/services/lista';
import bodyStyle from '@/styles/home.module.css'

import Modal from '@/components/modal';
import ListaDeReproducao from '@/components/listaResproducao';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faList, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import MenuDeAudio from '@/components/menuDeAudio';


export default function Home() {
    const [lista] = useState(new Lista());
    const [listaMusicas, setListaMusicas] = useState([]);

    const [audioAtual, setAudioAtual] = useState(null);
    const [estado, setEstado] = useState('pausado')
    const [srcMusica, setSrcMusica] = useState(null)

    const variaveisDeControle = {
        audioAtual: { var: audioAtual, set: setAudioAtual },
        estado: { var: estado, set: setEstado },
        src: { var: srcMusica, set: setSrcMusica }
    }
    
    const [musica, setMusica] = useState(null)
    
    useEffect(() => {
        if (srcMusica != null) {
            setMusica(lista.selectByPos(srcMusica))
        }
        slideMove()
    }, [srcMusica])

    const slideMove = () => {
        document.querySelectorAll('input[name="r"]').forEach((input, index) => {
            input.addEventListener('change', () => {
                if (input.checked) { document.querySelector('#s1').style.marginLeft = `-${20 * index}%` }
            })
        })
    }

    //FUNCOES MODAL
    const abrirModal = () => { document.querySelector('#modal').style.marginTop = '0%' }
    const fecharModal = () => { document.querySelector('#modal').style.marginTop = '-300%' }

    return (
        <>
            <section className={bodyStyle.body}>
                <div className={bodyStyle.slides}>
                    <input type='radio' name='r' id='r1' style={{ display: 'none' }} />
                    <input type='radio' name='r' id='r2' style={{ display: 'none' }} />
                    <div className={bodyStyle.content} id="s1">
                        <h2 id='h2'>Lista de Reprodução</h2>
                        {ListaDeReproducao(listaMusicas, variaveisDeControle)}
                    </div>
                    <div className={bodyStyle.content}>
                        <h2>Busca</h2>

                    </div>
                </div>
            </section>
            {MenuDeAudio(musica, variaveisDeControle)}
            <section className={bodyStyle.menu} id="menuBar">
                <div>
                    <label htmlFor='r1'><FontAwesomeIcon icon={faList}></FontAwesomeIcon></label>
                    <FontAwesomeIcon icon={faPlus} onClick={() => abrirModal()}></FontAwesomeIcon>
                    <label htmlFor='r2'><FontAwesomeIcon icon={faMagnifyingGlass}></FontAwesomeIcon></label>
                </div>
            </section>
            {Modal(fecharModal, lista, setListaMusicas)}
        </>
    );
}
/*  
    import listaDeReproducao from '@/components/listaResproducao';
    import ListaDePesquisa from '@/components/listaPesquisa';
    import MenuDeAudio from '@/components/menuDeAudio';
    import { avancar } from '@/services/funcoesDeAudio';

    import { useEffect, useState } from 'react';

    const [listaMusicas, setListaMusicas] = useState([]);
    const [posicao, setPosicao] = useState(-1)
    const [audioAtual, setAudioAtual] = useState(null);
    const [estado, setEstado] = useState('pausado');
    const [duracao, setDuracao] = useState(0);
    const [duracaoTotal, setDuracaoTotal] = useState('0:00');
    const [mudancaDeMusica, setMudancaDeMusica] = useState(false);

    useEffect(() => {
        if (audioAtual) {
            audioAtual.addEventListener('play', () => setEstado('playing'));
            audioAtual.addEventListener('pause', () => setEstado('paused'));
        }

        slideMove()

        return () => {
            if (audioAtual) {
                audioAtual.removeEventListener('play', () => setEstado('playing'));
                audioAtual.removeEventListener('pause', () => setEstado('paused'));
            }
        };
    }, [audioAtual]);

     const variaveisDeControle = {
        mudanca: { var: mudancaDeMusica, set: setMudancaDeMusica },
        audioAtual: { var: audioAtual, set: setAudioAtual },
        posicao: { var: posicao, set: setPosicao },
        estado: { var: estado, set: setEstado },
        duracao: { var: duracao, set: setDuracao },
        duracaoTotal: { var: duracaoTotal, set: setDuracaoTotal }
    }


    {listaDeReproducao(variaveisDeControle, listaMusicas)}
    {ListaDePesquisa({ var: listaMusicas, set: setListaMusicas })}
    {MenuDeAudio(variaveisDeControle, listaMusicas)}

    lista.sort((a, b) => {
            if (a.artista !== b.artista) {
                return a.artista.localeCompare(b.artista);
            } else {
                return a.album.localeCompare(b.album);
            }
        });
*/