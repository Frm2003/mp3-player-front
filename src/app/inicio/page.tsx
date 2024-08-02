'use client';

import React, { ReactNode, useEffect, useState } from 'react';
import {
    faArrowDownAZ,
    faMagnifyingGlass,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Carousel } from '@/components/carousel';
import Lista from '@/components/lista';
import { Modal } from '@/components/modal';
import { useList } from '@/contexts/listaContext';

const styleTitle = {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'space-between',
    padding: '0.5em',
};

const ContentCarousel1 = (): ReactNode => {
    const { lista } = useList();

    const [navComponent, setNavComponent] = useState<HTMLElement | null>(null);
    const [h2Component, setH2Component] = useState<HTMLHeadingElement | null>(
        null
    );
    const [displayComponent, setDisplayComponent] = useState<Element | null>(
        null
    );

    useEffect(() => {
        setNavComponent(document.querySelector('nav'));
        setH2Component(document.querySelector('h2'));
        setDisplayComponent(document.querySelector('#displayAudio'));
    }, []);

    const [ordenou, setOrdenou] = useState<boolean>(false);

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
            {navComponent && h2Component && displayComponent && (
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

const ContentCarousel2 = (): ReactNode => {
    return (
        <>
            <div style={styleTitle}>
                <h2>Pesquisa</h2>
                <FontAwesomeIcon icon={faMagnifyingGlass} size="2x" />
            </div>
        </>
    );
};

export default function Home(): ReactNode {
    useEffect(() => {
        const openModalElement = document.querySelector('#openModal');
        if (openModalElement) {
            openModalElement.addEventListener('click', abrirModal);
            return () =>
                openModalElement.removeEventListener('click', abrirModal);
        }
    }, []);

    const [show, setShow] = useState<boolean>(false);
    const abrirModal = (): void => setShow(true);
    const fecharModal = (): void => setShow(false);

    return (
        <>
            <Carousel contents={[ContentCarousel1(), ContentCarousel2()]} />
            <Modal show={show} funcFechar={fecharModal} />
        </>
    );
}
