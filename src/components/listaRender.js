import listStyle from '@/styles/list.module.css';
import { tocar } from '@/mvc/controller/musicaController';

import { useLayoutEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis, faFileAudio } from '@fortawesome/free-solid-svg-icons';

const calcHeight = () => {
    const menuBarHeight = document.getElementById('menuBar')?.clientHeight || 0;
    const miniInfoHeight = document.getElementById('miniInfo')?.clientHeight || 0;
    const h2Heigth = document.getElementById('h2')?.clientHeight || 0;
    return `${window.innerHeight - (menuBarHeight + h2Heigth + miniInfoHeight)}px`
}

export default function ListaRender({ list, control }) {
    const listaRef = useRef(null)

    useLayoutEffect(() => {
        listaRef.current.style.height = calcHeight()
        window.addEventListener('resize', () => listaRef.current.style.height = calcHeight())
    }, [])

    return (
        <ul className={listStyle.listBody} ref={listaRef}>
            <div className={listStyle.align}>
                {list.map((musica, index) => (
                    <li key={index}>
                        <div className={listStyle.type}>
                            <FontAwesomeIcon icon={faFileAudio} />
                        </div>
                        <div className={listStyle.text} onClick={() => tocar(musica, control)}>
                            <h3>{musica.nome.replace('.mp3', '')}</h3>
                            <p>{musica.album ? `${musica.album}, ` : ''} {musica.artista}</p>
                        </div>
                        <div className={listStyle.funcs}>
                            <FontAwesomeIcon icon={faEllipsis} />
                        </div>
                    </li>
                ))}
            </div>
        </ul>
    )
}