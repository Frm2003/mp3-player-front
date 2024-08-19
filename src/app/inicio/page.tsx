'use client';

import React, { ReactNode, useEffect, useState } from 'react';
import {
    faArrowDownAZ,
    faMagnifyingGlass,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Carousel } from '@/components/generics/carousel';
import Lista from '@/components/lista';
import { Modal } from '@/components/generics/modal';
import { useList } from '@/contexts/listaContext';
import Musica from '@/lib/classeMusica';

const styleTitle: object = {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'space-between',
    padding: '0.5em',
};

const styleBtn: object = {
    border: '2px solid',
    borderRadius: '10px',
    padding: '0.5em 1.5em',
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

const ContentModal = (fecharModal: () => void): ReactNode => {
    const { lista } = useList();

    const fileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files: FileList | null = event.target.files;
        if (files) {
            for (let i = 0; i < files.length; i++) {
                const fileName = files[i].name;
                const info = fileName.split('-').map((part) => part.trim());

                const musica = new Musica(
                    info.length > 2 ? info[2].trim() : info[1].trim(),
                    info.length > 2 ? info[1] : undefined,
                    info[0],
                    URL.createObjectURL(files[i]),
                    'arquivo'
                );

                lista.add(musica);
            }

            fecharModal();
        }
    };

    return (
        <article>
            <h2>Upload de arquivos</h2>
            <div style={styleBtn}>
                <label htmlFor="filesInput">Selecione os Arquivos</label>
            </div>
            <input id="filesInput" type="file" multiple onChange={fileSelect} />
        </article>
    );
};

export default function Home(): ReactNode {
    const [show, setShow] = useState<boolean>(false);
    const abrirModal = (): void => setShow(true);
    const fecharModal = (): void => setShow(false);

    //FUNCÃO: ENCONTRA E ABRIR MODAL
    useEffect(() => {
        const openModalElement = document.querySelector('#openModal');
        if (openModalElement) {
            openModalElement.addEventListener('click', abrirModal);
            return () =>
                openModalElement.removeEventListener('click', abrirModal);
        }
    }, []);

    //FUNÇÃO: DEFINE O TAMANHO DA TELA
    useEffect(() => {
        const body: HTMLBodyElement | null = document.querySelector('body');

        if (body) {
            body.style.height = `${window.innerHeight}px`;

            window.addEventListener('resize', () => {
                body.style.height = `${window.innerHeight}px`;
            });
        }
    }, []);

    return (
        <div>
            <Carousel contents={[ContentCarousel1(), ContentCarousel2()]} />
            <Modal
                show={show}
                content={ContentModal(fecharModal)}
                funcFechar={fecharModal}
            />
        </div>
    );
}
