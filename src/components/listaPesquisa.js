import listStyle from '@/styles/list.module.css'

import ApiYoutube from '@/services/apiYoutube';
import conversor from '@/services/conversor';

import { useEffect, useRef, useState } from "react";


export default function ListaDePesquisa(listaMusica) {
    const listaRef = useRef(null);
    const [listaPesquisa, setListaPesquisa] = useState([])

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

    const searchOnYoutube = async (event, maxResults) => {
        if (event.keyCode === 13) {
            try {
                setListaPesquisa(await ApiYoutube(event.target.value, maxResults))
            } catch (error) {
                console.error('Erro ao buscar dados do YouTube:', error);
            }
        }
    }

    //FUNÇÕES DE ÁUDIO
    const adicionarMusica = async (item) => {
        try {
            const response = await conversor(item.caminho)
            const objeto = {
                nome: item.nome,
                album: '',
                artista: item.artista,
                caminho: response
            }

            listaMusica.set([...listaMusica.var, objeto]);
        } catch (error) {
            console.error('Erro ao reproduzir o áudio:', error);
        }
    }

    return (
        <ul className={listStyle.listBody} ref={listaRef}>
            <div className={listStyle.searchBar}>
                <input type='text' placeholder='Faça uma pesquisa' onKeyDown={(e) => searchOnYoutube(e, 20)} />
            </div>
            {
                listaPesquisa.map((item, index) => (
                    <li key={index} onClick={() => adicionarMusica(item)}>
                        <div className={listStyle.thumb}>
                            <img src={item.thumb} />
                        </div>

                        <div className={listStyle.info}>
                            <h3>{item.nome.replace('.mp3', '')}</h3>
                            <span>{item.artista}</span>
                        </div>
                    </li>
                ))
            }
        </ul>
    )
}