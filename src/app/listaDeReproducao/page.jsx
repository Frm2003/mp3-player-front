'use client';

import { useEffect, useState } from 'react';
import {
    faArrowDownAZ,
    faMagnifyingGlass,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Carousel } from '@/components/carousel';
import Lista from '@/components/lista';
import { Modal } from '@/components/modal';
import { useList } from '@/context/listaContext';

const styleTitle = {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'space-between',
    padding: '0.5em',
};

const ContentCarousel1 = () => {
    const { lista } = useList();

    const [navComponent, setNavComponent] = useState(null);
    const [h2Component, setH2Component] = useState(null);
    const [displayComponent, setDisplayComponent] = useState(null);

    useEffect(() => {
        setNavComponent(document.querySelector('nav'));
        setH2Component(document.querySelector('h2'));
        setDisplayComponent(document.querySelector('#displayAudio'));
    }, []);

    const [ordenou, setOrdenou] = useState(false);
    const ordenar = () => {
        lista.mergeSort();
        setOrdenou(false);
    };

    useEffect(() => {
        setOrdenou(true);
    }, [ordenou]);

    return (
        <>
            <div style={styleTitle}>
                <h2>Lista de Reprodução</h2>
                <FontAwesomeIcon
                    icon={faArrowDownAZ}
                    size="2x"
                    onClick={ordenar}
                />
            </div>
            {navComponent && (
                <Lista
                    list={lista.selectAll()}
                    height={[
                        navComponent.clientHeight,
                        h2Component.clientHeight,
                        displayComponent.clientHeight,
                    ]}
                />
            )}
        </>
    );
};

const ContentCarousel2 = () => {
    return (
        <>
            <div style={styleTitle}>
                <h2>Pesquisa</h2>
                <FontAwesomeIcon icon={faMagnifyingGlass} size="2x" />
            </div>
        </>
    );
};

export default function Home() {
    useEffect(() => {
        const openModalElement = document.querySelector('#openModal');
        if (openModalElement) {
            openModalElement.addEventListener('click', abrirModal);
            return () =>
                openModalElement.removeEventListener('click', abrirModal);
        }
    }, []);

    const [show, setShow] = useState(false);
    const abrirModal = () => setShow(true);
    const fecharModal = () => setShow(false);

    return (
        <>
            <Carousel contents={[ContentCarousel1(), ContentCarousel2()]} />
            <Modal show={show} funcFechar={fecharModal} />
        </>
    );
}
