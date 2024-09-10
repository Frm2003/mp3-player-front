'use client';

import { ReactNode, useEffect, useState, useRef, CSSProperties } from 'react';
import { Carousel } from '@/components/generics/carousel';
import Modal, { ModalHandles } from '@/components/generics/modal';
import { useList } from '@/contexts/listaContext';
import Musica from '@/lib/classeMusica';
import ListaDeReproducao from '@/components/listaDeReproducao';

const styleBtn: CSSProperties = {
    border: '2px solid',
    borderRadius: '10px',
    padding: '0.5em 1.5em',
};

const ContentModal = (funcFechar: () => void): ReactNode => {
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
            funcFechar();
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

    return (
        <div>
            <Carousel contents={[ListaDeReproducao()]} />
            <Modal fecharModal={fecharModal} show={show} ref={modalRef}>
                {ContentModal(chamarMetodoDoFilho)}
            </Modal>
        </div>
    );
}
