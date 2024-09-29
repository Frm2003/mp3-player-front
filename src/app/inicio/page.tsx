'use client';

import { ReactNode, useEffect, useState, useRef } from 'react';
import { Carousel } from '@/components/layouts/carousel';
import ListaDeReproducao from '@/components/client/listaDeReproducao';
import Modal, { ModalHandles } from '@/components/layouts/modal';
import FileSelector from '@/components/FileSelector';

export default function Home(): ReactNode {
    const [show, setShow] = useState<boolean>(false);
    const abrirModal = (): void => setShow(true);
    const fecharModal = (): void => setShow(false);

    // RESPONSÁVEL POR UTILIZAR A FUNÇÃO FECHAR DO COMPONENTE FILHO
    const modalRef = useRef<ModalHandles>(null);
    const chamarMetodoDoFilho = () => {
        if (modalRef.current) {
            modalRef.current.genericClose();
        }
    };

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

    const content = <h1>teste</h1>;

    return (
        <div>
            <Carousel contents={[ListaDeReproducao(), content]} />
            <Modal fecharModal={fecharModal} show={show} ref={modalRef}>
                <FileSelector funcFechar={chamarMetodoDoFilho} />
            </Modal>
        </div>
    );
}
