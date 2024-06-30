'use client'

import listStyle from '@/styles/list.module.css';
import { tocar } from '@/services/funcoesDeAudio';
import { useLayoutEffect, useRef } from 'react';

export default function ListaDeReproducao(listaDeMusicas, variaveisDeControle) {
    const listaRef = useRef(null);

    useLayoutEffect(() => {
        function calcHeightLista() {
            const menuBarHeight = document.getElementById('menuBar')?.clientHeight || 0;
            const miniInfoHeight = document.getElementById('miniInfo')?.clientHeight || 0;
            const h2Heigth = document.getElementById('h2')?.clientHeight || 0;
            return `${window.innerHeight - (menuBarHeight + miniInfoHeight + h2Heigth)}px`;
        }

        listaRef.current.style.height = calcHeightLista();

        function handleResize() {
            listaRef.current.style.height = calcHeightLista();
        }

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const tocarMusica = (item, index) => {
        tocar(item, variaveisDeControle);
    };

    return (
        <ul className={listStyle.listBody} ref={listaRef} style={{ minHeight: '300px' }}>
            {listaDeMusicas.map((item, index) => (
                <li key={index} onClick={() => tocarMusica(item, index)}>
                    <div className={listStyle.info}>
                        <h3>{item.nome.replace('.mp3', '')}</h3>
                        <span>{item.album !== '' ? `${item.album}, ` : ''} {item.artista}</span>
                    </div>
                </li>
            ))}
        </ul>
    );
}

/*
    import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
    import { faPlay, faPause } from '@fortawesome/free-solid-svg-icons';
    import { tocar } from '../services/funcoesDeAudio';

    useEffect(() => {
        listaRef.current.style.height = calcHeightLista()

        window.addEventListener('resize', () => {
            listaRef.current.style.height = calcHeightLista()
        })
    }, [])

    const calcHeightLista = () => {
        const miniInfoHeight = document.getElementById('miniInfo').clientHeight
        const menuBarHeight = document.getElementById('menuBar').clientHeight
        const alturaTelaAtual = window.innerHeight

        return `${alturaTelaAtual - (miniInfoHeight + menuBarHeight)}px`
    }

    //FUNÇÕES DE ÁUDIO
    const tocarMusica = async (caminho, index) => { tocar(caminho, index, varDeControle) }
*/