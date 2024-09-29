'use client';

import { useList } from '@/components/contexts/listaContext';
import { faArrowDownAZ } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CSSProperties, ReactNode, useEffect, useState } from 'react';

import List from '../layouts/list';

const styleTitle: CSSProperties = {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'space-between',
    padding: '0.5em',
};

export default function ListaDeReproducao(): ReactNode {
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
                <List
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
}
